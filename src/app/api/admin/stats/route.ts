import { NextResponse } from "next/server";
import { db } from "@/db";
import { products, orders } from "@/db/schema";
import { count, sum, eq, and, lt, desc } from "drizzle-orm";
import { checkAuth, unauthorized } from "@/lib/admin-auth";
import { checkRateLimit } from "@/lib/rate-limit";

export async function GET(req: Request) {
  if (!await checkAuth(req)) return unauthorized();
  const rl = await checkRateLimit(req, 30);
  if (rl) return rl;
  try {
    const [productCount] = await db.select({ value: count() }).from(products);

    const [totalOrders] = await db.select({ value: count() }).from(orders);

    const [revenueRow] = await db
      .select({ value: sum(orders.total) })
      .from(orders)
      .where(and(
        eq(orders.status, "pending"),
      ));
    const [revenueNonPending] = await db
      .select({ value: sum(orders.total) })
      .from(orders)
      .where(and(
        eq(orders.status, "confirmed"),
      ));
    const [revenueShipped] = await db
      .select({ value: sum(orders.total) })
      .from(orders)
      .where(and(
        eq(orders.status, "shipped"),
      ));
    const [revenueDelivered] = await db
      .select({ value: sum(orders.total) })
      .from(orders)
      .where(and(
        eq(orders.status, "delivered"),
      ));
    const [revenueProcessing] = await db
      .select({ value: sum(orders.total) })
      .from(orders)
      .where(and(
        eq(orders.status, "processing"),
      ));

    const revenue =
      (Number(revenueRow?.value) || 0) +
      (Number(revenueNonPending?.value) || 0) +
      (Number(revenueShipped?.value) || 0) +
      (Number(revenueDelivered?.value) || 0) +
      (Number(revenueProcessing?.value) || 0);

    const [pendingCount] = await db
      .select({ value: count() })
      .from(orders)
      .where(and(
        eq(orders.status, "pending"),
      ));
    const [processingCount] = await db
      .select({ value: count() })
      .from(orders)
      .where(and(
        eq(orders.status, "processing"),
      ));

    const pendingOrders = (Number(pendingCount?.value) || 0) + (Number(processingCount?.value) || 0);

    const lowStockItems = await db.select({ id: products.id, name: products.name, stock: products.stock })
      .from(products)
      .where(lt(products.stock, 11));

    const recentOrders = await db
      .select({
        id: orders.id,
        customer: orders.customer,
        total: orders.total,
        status: orders.status,
        createdAt: orders.createdAt,
      })
      .from(orders)
      .orderBy(desc(orders.createdAt))
      .limit(5);

    return NextResponse.json({
      products: productCount?.value ?? 0,
      orders: totalOrders?.value ?? 0,
      revenue,
      pendingOrders,
      lowStock: lowStockItems,
      recentOrders,
    });
  } catch (err) {
    console.error("Stats error:", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
