import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems, products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { parseImages } from "@/lib/utils";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
    }

    const [order] = await db.select({
      id: orders.id,
      status: orders.status,
      total: orders.total,
      createdAt: orders.createdAt,
    }).from(orders).where(eq(orders.id, id)).limit(1);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const items = await db
      .select({
        quantity: orderItems.quantity,
        price: orderItems.price,
        productName: products.name,
        productImage: products.images,
      })
      .from(orderItems)
      .leftJoin(products, eq(orderItems.productId, products.id))
      .where(eq(orderItems.orderId, id));

    const itemsParsed = items.map((it) => ({
      ...it,
      productImage: parseImages(it.productImage)[0] || null,
    }));

    return NextResponse.json({ ...order, items: itemsParsed });
  } catch (err) {
    console.error("Order fetch error:", err);
    return NextResponse.json({ error: "Gagal memuat pesanan" }, { status: 500 });
  }
}
