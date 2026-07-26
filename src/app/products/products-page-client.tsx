"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductGrid from "./product-grid";

interface Product {
  id: string; name: string; slug: string; price: number; images: string;
  stock: number; featured: boolean;
  category: { id: string; name: string } | null;
  createdAt: string;
}

interface Category {
  id: string; name: string; slug: string;
}

export default function ProductsPageClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch("/api/products").then<Product[]>((r) => r.json()),
      fetch("/api/categories").then<Category[]>((r) => r.json()),
    ]).then(([prods, cats]) => {
      if (cancelled) return;
      setProducts(prods);
      setCategories(cats);
      setLoading(false);
    }).catch(() => {
      if (!cancelled) { setError("Gagal memuat produk"); setLoading(false); }
    });
    return () => { cancelled = true; };
  }, []);

  if (loading) return (
    <div className="mx-auto max-w-6xl px-4 py-20 text-center">
      <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-green-700 border-t-transparent" />
      <p className="mt-3 text-sm text-gray-500">Memuat produk...</p>
    </div>
  );

  if (error) return (
    <div className="mx-auto max-w-6xl px-4 py-20 text-center">
      <p className="text-sm text-red-500">{error}</p>
      <button onClick={() => window.location.reload()} className="mt-4 btn-primary">Coba Lagi</button>
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-6 font-sans text-sm text-[#ABC1A7]">
        <Link href="/" className="transition hover:text-[#2C4C3B]">Beranda</Link>
        <span className="mx-2">/</span>
        <span className="text-[#1A3626]">Produk</span>
      </nav>
      <h1 className="font-serif text-3xl font-bold tracking-tight text-[#1A3626]">Semua Produk</h1>
      <p className="mt-2 font-sans text-sm text-[#5D8356]">Jelajahi koleksi produk herbal kami.</p>

      <div className="mt-6 rounded-sm border border-[#25D366]/30 bg-[#25D366]/5 p-4">
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10">
            <svg className="h-5 w-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 1.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </div>
          <div>
            <p className="font-sans text-sm font-bold text-[#1A3626]">Tidak yakin memilih produk?</p>
            <p className="font-sans text-xs text-[#5D8356]">Chat kami langsung — kami bantu pilihkan yang paling cocok untuk Anda.</p>
          </div>
          <a href="https://wa.me/6285161835757?text=Halo!%20Saya%20mau%20tanya%20produk%20yang%20cocok%20untuk%20saya." target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-sm bg-[#25D366] px-4 py-2 font-sans text-xs font-bold text-white transition hover:bg-[#1da851]">
            Chat Sekarang
          </a>
        </div>
      </div>

      <ProductGrid products={products} categories={categories} />
    </div>
  );
}
