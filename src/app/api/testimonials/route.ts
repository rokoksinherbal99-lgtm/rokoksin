import { NextResponse } from "next/server";
import { db } from "@/db";
import { testimonials, products } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { parseImages } from "@/lib/utils";

export async function GET() {
  try {
    const rows = await db.select().from(testimonials).leftJoin(products, eq(testimonials.productId, products.id)).where(eq(testimonials.visible, true)).orderBy(desc(testimonials.createdAt));
    const data = rows.map((r) => ({
      name: r.testimonials.name,
      text: r.testimonials.text,
      product: r.products?.name || null,
      productImg: parseImages(r.products?.images)[0] || null,
      city: r.testimonials.city,
    }));
    return NextResponse.json(data);
  } catch (err) {
    console.error("Testimonials GET error:", err);
    return NextResponse.json([]);
  }
}
