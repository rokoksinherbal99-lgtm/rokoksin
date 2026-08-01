"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Product {
  id: string; name: string; slug: string; price: number; images: string;
}

export default function HeaderSearch({ onSelect }: { onSelect?: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) { setResults([]); setOpen(false); return; }
    setLoading(true);
    const ctrl = new AbortController();
    const timer = setTimeout(() => {
      fetch(`/api/products/search?q=${encodeURIComponent(q)}`, { signal: ctrl.signal })
        .then((r) => r.json())
        .then((data) => {
          const list = Array.isArray(data) ? data : [];
          setResults(list);
          setOpen(true);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }, 250);
    return () => { clearTimeout(timer); ctrl.abort(); };
  }, [query]);

  const clear = () => { setQuery(""); setResults([]); setOpen(false); };

  return (
    <div ref={wrapRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={2} />
        <input
          type="search"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => { if (results.length > 0) setOpen(true); }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (results.length > 0) {
                window.location.href = `/products/${results[0].slug}`;
                clear();
              } else if (query.trim().length > 0) {
                window.location.href = `/products?q=${encodeURIComponent(query.trim())}`;
                clear();
              }
            }
          }}
          placeholder="Cari produk..."
          className="w-full rounded-full border border-input bg-card py-2 pl-10 pr-9 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {query && (
          <button type="button" onClick={clear} aria-label="Bersihkan pencarian" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && query.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-card shadow-xl animate-fade-in">
          <div className="max-h-80 overflow-y-auto p-1.5">
            {loading ? (
              <p className="px-3 py-3 text-sm text-muted-foreground">Mencari...</p>
            ) : results.length === 0 ? (
              <p className="px-3 py-3 text-sm text-muted-foreground">Tidak ada produk yang cocok.</p>
            ) : (
              results.slice(0, 8).map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  onClick={() => { clear(); onSelect?.(); }}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-accent"
                >
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-muted">
                    <img src={p.images || "/images/product-1.svg"} alt={p.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{formatPrice(p.price)}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
          <Link
            href={`/products?q=${encodeURIComponent(query.trim())}`}
            onClick={() => { clear(); onSelect?.(); }}
            className="block border-t border-border bg-muted/50 px-3 py-2.5 text-center text-xs font-semibold text-foreground transition hover:bg-accent"
          >
            Lihat semua hasil untuk &quot;{query.trim()}&quot;
          </Link>
        </div>
      )}
    </div>
  );
}
