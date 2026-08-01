import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { ilike, desc } from "drizzle-orm";
import { parseImages } from "@/lib/utils";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  if (!q) return NextResponse.json([]);

  try {
    const rows = await db.select().from(products)
      .where(ilike(products.name, `%${q}%`))
      .orderBy(desc(products.createdAt))
      .limit(10);
    const result = rows.map((r) => ({
      id: r.id,
      name: r.name,
      slug: r.slug,
      price: r.price,
      images: parseImages(r.images)[0] || "",
    }));
    return NextResponse.json(result);
  } catch (err) {
    console.error("Product search error:", err);
    return NextResponse.json([]);
  }
}
