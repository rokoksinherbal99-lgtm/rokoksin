"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { Search } from "lucide-react";

interface Product {
  id: string; name: string; slug: string; price: number; images: string;
  productType?: string; stock: number;
  category: { id: string; name: string } | null;
}

interface Category {
  id: string; name: string; slug: string;
}

const ITEMS_PER_PAGE = 12;

export default function ProductGrid({ products, categories }: { products: Product[]; categories: Category[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialCat = searchParams.get("cat") || "";
  const catToId = Object.fromEntries(categories.map((c) => [c.slug, c.id]));
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState(initialCat ? catToId[initialCat] || "" : "");
  const [page, setPage] = useState(1);

  const filtered = products.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (catFilter && p.category?.id !== catFilter) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleFilterChange = (type: "search" | "cat", value: string) => {
    if (type === "search") setSearch(value);
    else {
      setCatFilter(value);
      const entry = categories.find((c) => c.id === value);
      if (entry) router.replace(`/products?cat=${entry.slug}`, { scroll: false });
      else router.replace("/products", { scroll: false });
    }
    setPage(1);
  };

  return (
    <>
      <div className="mt-8 space-y-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => handleFilterChange("search", e.target.value)} placeholder="Cari produk..." className="w-full rounded-2xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 shadow-sm transition focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[{ id: "", name: "Semua", slug: "" } as Category, ...categories].map((c) => (
            <button key={c.id} onClick={() => handleFilterChange("cat", c.id)} className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
              catFilter === c.id
                ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md shadow-emerald-200"
                : "border border-gray-200 bg-white text-gray-600 shadow-sm hover:border-emerald-200 hover:text-emerald-600 hover:shadow-md"
            }`}>
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-16 text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-gray-100 flex items-center justify-center">
            <Search className="h-8 w-8 text-gray-300" />
          </div>
          <p className="text-gray-500 font-medium">Tidak ada produk yang cocok</p>
          <p className="text-sm text-gray-400 mt-1">Coba kata kunci atau filter lain</p>
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
            {paged.map((p) => (
              <ProductCard key={p.id} id={p.id} name={p.name} slug={p.slug} price={p.price} image={p.images} stock={p.stock} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition hover:border-gray-300 hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed">
                Sebelumnya
              </button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setPage(p)} className={`h-10 min-w-[40px] rounded-xl text-sm font-semibold transition-all ${
                    p === page
                      ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md shadow-emerald-200"
                      : "border border-gray-200 bg-white text-gray-600 shadow-sm hover:border-gray-300 hover:shadow-md"
                  }`}>
                    {p}
                  </button>
                ))}
              </div>
              <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition hover:border-gray-300 hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed">
                Selanjutnya
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
