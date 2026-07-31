"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/Toast";
import { formatPrice } from "@/lib/utils";

interface Product {
  id: string; name: string; slug: string; price: number; stock: number;
  featured: boolean; batchNumber?: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price" | "stock">("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const fetchProducts = () => {
    setLoading(true);
    fetch("/api/admin/products")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
        else throw new Error();
      })
      .catch(() => toast("Gagal memuat produk", "error"))
      .finally(() => setLoading(false));
  };

  const [bulkLoading, setBulkLoading] = useState(false);

  useEffect(() => { fetchProducts(); }, []);

  const remove = async (id: string) => {
    if (!confirm("Hapus produk ini?")) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast("Produk berhasil dihapus");
      fetchProducts();
    } catch {
      toast("Gagal menghapus produk", "error");
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !featured }),
      });
      if (!res.ok) throw new Error();
      fetchProducts();
    } catch {
      toast("Gagal mengubah status unggulan", "error");
    }
  };

  const bulkDelete = async () => {
    if (selected.size === 0 || bulkLoading) return;
    if (!confirm(`Hapus ${selected.size} produk terpilih?`)) return;
    setBulkLoading(true);
    const ids = Array.from(selected);
    const results = await Promise.allSettled(
      ids.map((id) =>
        fetch(`/api/admin/products/${id}`, { method: "DELETE" }).then((r) => { if (!r.ok) throw new Error(); return r; })
      )
    );
    const failed = results.filter((r) => r.status === "rejected").length;
    if (failed > 0) toast(`${ids.length - failed} berhasil, ${failed} gagal`, failed === ids.length ? "error" : "success");
    else toast(`${ids.length} produk berhasil dihapus`);
    setSelected(new Set());
    fetchProducts();
    setBulkLoading(false);
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map((p) => p.id)));
  };

  const toggleOne = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const filtered = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const mul = sortDir === "asc" ? 1 : -1;
      if (sortBy === "name") return a.name.localeCompare(b.name) * mul;
      return ((a[sortBy] || 0) - (b[sortBy] || 0)) * mul;
    });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Produk</h1>
          <p className="mt-1 text-sm text-muted-foreground">Kelola stok & inventori</p>
        </div>
        <div className="flex items-center gap-3">
          {selected.size > 0 && (
            <button onClick={bulkDelete} disabled={bulkLoading} className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50">
              <Trash2 className="h-4 w-4" /> {bulkLoading ? "Menghapus..." : `Hapus (${selected.size})`}
            </button>
          )}
          <Link href="/admin/products/new" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-primary/90 active:scale-[0.97]">
            <Plus className="h-4 w-4" /> Tambah Produk
          </Link>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari produk..." className="w-full rounded-lg border py-2 pl-9 pr-3 text-sm" />
        </div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="rounded-lg border px-3 py-2 text-sm">
          <option value="name">Nama</option>
          <option value="price">Harga</option>
          <option value="stock">Stok</option>
        </select>
        <button onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")} className="rounded-lg border px-3 py-2 text-sm">
          {sortDir === "asc" ? "↑" : "↓"}
        </button>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="px-4 py-3">
                <input type="checkbox" onChange={toggleAll} checked={selected.size === filtered.length && filtered.length > 0} className="rounded border-border text-foreground" />
              </th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Nama</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Harga</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Stok</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Unggulan</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              return (
                <tr key={p.id} className={`border-b last:border-0 transition ${selected.has(p.id) ? "bg-muted/50" : ""}`}>
                  <td className="px-4 py-3">
                    <input type="checkbox" checked={selected.has(p.id)} onChange={() => toggleOne(p.id)} className="rounded border-border text-foreground" />
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    <Link href={`/products/${p.slug}`} className="hover:text-foreground">{p.name}</Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3">
                    <span className={`font-medium ${p.stock < 11 ? "text-red-600" : "text-foreground"}`}>
                      {p.stock}
                      {p.stock < 11 && p.stock > 0 && <AlertTriangle className="ml-1 inline h-3 w-3 text-foreground" />}
                      {p.stock === 0 && <span className="ml-1 text-xs text-red-500">(habis)</span>}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleFeatured(p.id, p.featured)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                        p.featured ? "bg-muted text-foreground" : "bg-muted text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {p.featured ? "Ya" : "Tidak"}
                    </button>
                  </td>
                  <td className="flex gap-2 px-4 py-3">
                    <Link href={`/admin/products/edit/${p.id}`} className="rounded-lg border border-border p-1.5 text-blue-600 transition hover:bg-blue-50" title="Edit">
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button onClick={() => remove(p.id)} className="rounded-lg border border-border p-1.5 text-red-600 transition hover:bg-red-50" title="Hapus">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {loading && <p className="p-8 text-center text-muted-foreground">Memuat...</p>}
        {!loading && filtered.length === 0 && <p className="p-8 text-center text-muted-foreground">{search ? "Tidak ada produk yang cocok." : "Belum ada produk."}</p>}
      </div>
    </div>
  );
}
