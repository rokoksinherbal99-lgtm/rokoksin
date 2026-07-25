"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Check, Star } from "lucide-react";
import { useToast } from "@/components/Toast";

interface Testimonial {
  id: string;
  name: string;
  text: string;
  productId: string | null;
  productName: string | null;
  productImage: string | null;
  city: string;
  rating: number;
  visible: boolean;
}

interface Product {
  id: string;
  name: string;
}

const emptyForm = { name: "", text: "", productId: "", city: "", rating: 5, visible: true };

export default function AdminTestimonials() {
  const [list, setList] = useState<Testimonial[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const { toast } = useToast();

  const fetchData = () => {
    setFetching(true);
    fetch("/api/admin/testimonials")
      .then((r) => r.json())
      .then(setList)
      .catch(() => toast("Gagal memuat testimoni", "error"))
      .finally(() => setFetching(false));
    fetch("/api/admin/products")
      .then((r) => r.json())
      .then(setProducts)
      .catch(() => toast("Gagal memuat produk", "error"));
  };

  useEffect(() => { fetchData(); }, []);

  const reset = () => { setForm(emptyForm); setEdit(null); setShowForm(false); };

  const openEdit = (t: Testimonial) => {
    setForm({ name: t.name, text: t.text, productId: t.productId || "", city: t.city, rating: t.rating, visible: t.visible });
    setEdit(t);
    setShowForm(true);
  };

  const save = async () => {
    setLoading(true);
    try {
      const body = { ...form, productId: form.productId || null };
      if (edit) {
        const res = await fetch("/api/admin/testimonials", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: edit.id, ...body }) });
        if (!res.ok) throw new Error();
        toast("Testimoni diperbarui", "success");
      } else {
        const res = await fetch("/api/admin/testimonials", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
        if (!res.ok) throw new Error();
        toast("Testimoni ditambahkan", "success");
      }
      reset();
      fetchData();
    } catch {
      toast("Gagal menyimpan", "error");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Hapus testimoni ini?")) return;
    try {
      const res = await fetch("/api/admin/testimonials", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      if (!res.ok) throw new Error();
      toast("Testimoni dihapus", "success");
      fetchData();
    } catch {
      toast("Gagal menghapus", "error");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Testimoni</h1>
          <p className="mt-1 text-sm text-gray-400">Kelola testimoni pelanggan</p>
        </div>
        <button onClick={() => { reset(); setShowForm(true); }} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500">
          <Plus className="h-4 w-4" /> Tambah Testimoni
        </button>
      </div>

      {showForm && (
        <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama pelanggan" className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-emerald-300" />
            <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Kota" className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-emerald-300" />
            <div className="md:col-span-2">
              <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} placeholder="Teks testimoni" rows={3} className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-emerald-300" />
            </div>
            <select value={form.productId} onChange={(e) => setForm({ ...form, productId: e.target.value })} className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-emerald-300">
              <option value="">-- Pilih produk (opsional) --</option>
              {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                Tampilkan
              </label>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">Rating:</span>
                {[1,2,3,4,5].map((s) => (
                  <button key={s} onClick={() => setForm({ ...form, rating: s })}>
                    <Star className={`h-4 w-4 ${s <= form.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={save} disabled={loading || !form.name || !form.text} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 disabled:opacity-50">
              <Check className="h-4 w-4" /> {edit ? "Simpan" : "Tambah"}
            </button>
            <button onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50">
              <X className="h-4 w-4" /> Batal
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 space-y-3">
        {fetching && <p className="text-center text-sm text-gray-400 py-10">Memuat...</p>}
        {!fetching && list.map((t) => (
          <div key={t.id} className="flex items-start gap-4 rounded-xl border bg-white p-5 shadow-sm">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gray-100">
              {t.productImage ? (
                <img src={t.productImage} alt={t.productName || t.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-600 text-lg font-bold text-white">{t.name[0]}</div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-800">{t.name}</p>
                {!t.visible && <span className="rounded-lg bg-gray-100 px-2 py-0.5 text-xs text-gray-500">Disembunyikan</span>}
              </div>
              <p className="mt-0.5 text-xs text-gray-400">{t.productName || "—"} &middot; {t.city}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-600 line-clamp-2">{t.text}</p>
              <div className="mt-1.5 flex items-center gap-1">
                {Array.from({ length: t.rating }, (_, i) => <Star key={i} className="h-3 w-3 text-amber-400 fill-amber-400" />)}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(t)} className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-600">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => remove(t.id)} className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {!fetching && list.length === 0 && <p className="text-center text-sm text-gray-400 py-10">Belum ada testimoni</p>}
      </div>
    </div>
  );
}
