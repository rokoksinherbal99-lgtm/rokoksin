import Link from "next/link";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import ProductCard from "@/components/ProductCard";
import BannerSlider from "@/components/BannerSlider";
import { CheckCircle, ChevronRight, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sin Herbal — Toko Herbal Alami Terpercaya",
  description: "Toko herbal terpercaya menyediakan berbagai produk herbal alami berkualitas. Belanja herbal online aman & mudah di Sin Herbal.",
};

export const dynamic = "force-dynamic";

async function queryWithTimeout<T>(fn: () => Promise<T>, ms = 15000): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Database query timed out")), ms)
  );
  return Promise.race([fn(), timeout]);
}

export default async function HomePage() {
  const featuredProducts = await queryWithTimeout(() =>
    db.select().from(products).where(eq(products.featured, true)).limit(8)
  );

  return (
    <>
      {/* 1. Hero */}
      <BannerSlider />

      {/* 2. Featured Products */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Produk Pilihan</h1>
              <p className="mt-2 font-sans text-sm text-muted-foreground">Koleksi terbaik pilihan pelanggan kami.</p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1 font-sans text-sm font-semibold text-foreground transition hover:opacity-70"
            >
              Semua Produk <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} id={p.id} name={p.name} slug={p.slug} price={p.price} image={p.images} stock={p.stock} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Trust Strip */}
      <section className="border-y border-border bg-muted/50 py-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              { text: "Terdaftar Bea Cukai", sub: "Produk resmi & legal" },
              { text: "100% Original", sub: "Garansi uang kembali" },
              { text: "Kirim Seluruh Indonesia", sub: "Ekspedisi terpercaya" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-2.5">
                <CheckCircle className="h-5 w-5 shrink-0 text-foreground" strokeWidth={1.5} />
                <div>
                  <p className="font-sans text-xs font-bold text-foreground">{b.text}</p>
                  <p className="font-sans text-[10px] text-muted-foreground">{b.sub}</p>
                </div>
              </div>
            ))}
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PHONE || "6285161835757"}?text=${encodeURIComponent("Halo! Saya ingin pesan produk Sin Herbal. Bisa bantu?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-4 py-2.5 font-sans text-sm font-semibold text-white shadow transition-all hover:bg-[#1da851] active:scale-[0.97]"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
              Pesan via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
