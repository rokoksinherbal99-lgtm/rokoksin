"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/Toast";
import ImageUploader from "@/components/ImageUploader";

interface Category {
  id: string; name: string;
}

export default function NewProductPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({
    name: "", slug: "", description: "", price: "", stock: "0",
    images: "", categoryId: "",
    manufacturer: "PR UD Putra Bintang Timur, Malang",
    featured: false, batchNumber: "",
  });
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string | boolean) => setForm((prev) => ({ ...prev, [field]: value }));

  useEffect(() => {
    fetch("/api/products").then((r) => r.json()).then((list: any[]) => {
      const cats = new Map<string, Category>();
      list.forEach((p: any) => { if (p.category) cats.set(p.category.id, p.category); });
      const arr = Array.from(cats.values());
      setCategories(arr);
      if (arr.length > 0 && !form.categoryId) setForm((prev) => ({ ...prev, categoryId: arr[0].id }));
    }).catch(() => toast("Gagal memuat kategori", "error"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.slug.match(/^[a-z0-9-]+$/)) {
      toast("Slug hanya boleh huruf kecil, angka, dan tanda hubung", "error");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        }),
      });
      if (!res.ok) throw new Error();
      toast("Produk berhasil ditambahkan");
      router.push("/admin/products");
    } catch {
      toast("Gagal menambahkan produk", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-foreground">Tambah Produk</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-xl border border-border bg-card p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground">Nama Produk</label>
            <input required value={form.name} onChange={(e) => update("name", e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm outline-none transition focus:border-border focus:ring-2 focus:ring-ring/20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">Slug</label>
            <input required value={form.slug} onChange={(e) => update("slug", e.target.value)} pattern="[a-z0-9-]+" className="mt-1 w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm outline-none transition focus:border-border focus:ring-2 focus:ring-ring/20" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground">Harga (Rp)</label>
            <input required type="number" min="0" value={form.price} onChange={(e) => update("price", e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm outline-none transition focus:border-border focus:ring-2 focus:ring-ring/20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">Stok</label>
            <input required type="number" min="0" value={form.stock} onChange={(e) => update("stock", e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm outline-none transition focus:border-border focus:ring-2 focus:ring-ring/20" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">Deskripsi</label>
          <textarea required value={form.description} onChange={(e) => update("description", e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm outline-none transition focus:border-border focus:ring-2 focus:ring-ring/20" rows={3} />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">Kategori</label>
          <select value={form.categoryId} onChange={(e) => update("categoryId", e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm outline-none transition focus:border-border focus:ring-2 focus:ring-ring/20">
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            {categories.length === 0 && <option value="">-- Pilih Kategori --</option>}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">No. Batch</label>
          <input value={form.batchNumber} onChange={(e) => update("batchNumber", e.target.value)} placeholder="Contoh: BCH-2026-001" className="mt-1 w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm outline-none transition focus:border-border focus:ring-2 focus:ring-ring/20" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">Produsen</label>
          <input value={form.manufacturer} onChange={(e) => update("manufacturer", e.target.value)} className="mt-1 w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm outline-none transition focus:border-border focus:ring-2 focus:ring-ring/20" />
        </div>
        <ImageUploader value={form.images} onChange={(val) => update("images", val)} />
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} id="featured" className="rounded border-border text-foreground" />
          <label htmlFor="featured" className="text-sm font-medium text-foreground">Produk Unggulan</label>
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 active:scale-[0.97] disabled:opacity-50">
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
          <button type="button" onClick={() => router.back()} className="rounded-lg border border-border bg-card px-6 py-2.5 text-sm font-semibold text-muted-foreground transition hover:bg-muted/50">
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
