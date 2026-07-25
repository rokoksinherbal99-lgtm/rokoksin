"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/components/Toast";
import { Search, ChevronDown, ChevronUp, Plus, X, MessageCircle, Check, Printer } from "lucide-react";

interface Product {
  id: string; name: string; price: number; stock: number;
}

interface OrderItem {
  id: string; name: string; quantity: number; price: number;
}

interface Order {
  id: string; customer: string; email: string; total: number; status: string;
  createdAt: string; items: OrderItem[];
}

const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

const statusColor: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [showManual, setShowManual] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{ productId: string; name: string; price: number; quantity: number }[]>([]);
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const fetchOrders = () => {
    setLoading(true);
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setOrders(data);
        else throw new Error();
      })
      .catch(() => toast("Gagal memuat pesanan", "error"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
    fetch("/api/admin/products")
      .then((r) => r.json())
      .then(setProducts)
      .catch(() => toast("Gagal memuat produk", "error"));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    if (status === "cancelled" && !confirm("Batalkan pesanan ini?")) return;
    const oldStatus = orders.find((o) => o.id === id)?.status;
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Gagal");
      }
      toast(`Status berhasil diubah: ${oldStatus} → ${status}`);
      fetchOrders();
    } catch (err: any) {
      toast(err.message || "Gagal mengubah status", "error");
    }
  };

  const bulkUpdateStatus = async (newStatus: string) => {
    if (selected.size === 0 || bulkLoading) return;
    if (newStatus === "cancelled" && !confirm(`Batalkan ${selected.size} pesanan terpilih?`)) return;
    setBulkLoading(true);
    const ids = Array.from(selected);
    const results = await Promise.allSettled(
      ids.map((id) =>
        fetch(`/api/admin/orders/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }).then((r) => { if (!r.ok) throw new Error(); return r; })
      )
    );
    const failed = results.filter((r) => r.status === "rejected").length;
    if (failed > 0) toast(`${ids.length - failed} berhasil, ${failed} gagal`, failed === ids.length ? "error" : "success");
    else toast(`${ids.length} pesanan berhasil diubah`);
    setSelected(new Set());
    fetchOrders();
    setBulkLoading(false);
  };

  const bulkDelete = async () => {
    if (selected.size === 0 || bulkLoading) return;
    if (!confirm(`Hapus ${selected.size} pesanan terpilih? Tindakan ini tidak bisa dibatalkan.`)) return;
    setBulkLoading(true);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Array.from(selected) }),
      });
      if (!res.ok) throw new Error();
      toast(`${selected.size} pesanan berhasil dihapus`);
      setSelected(new Set());
      fetchOrders();
    } catch {
      toast("Gagal menghapus pesanan", "error");
    } finally {
      setBulkLoading(false);
    }
  };

  const bulkPrint = () => {
    if (selected.size === 0) return;
    const selectedOrders = orders.filter((o) => selected.has(o.id));
    const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    const text = selectedOrders.map((o) => {
      const items = o.items.map((i) => `${escapeHtml(i.name)} x${i.quantity} = ${formatPrice(i.price * i.quantity)}`).join("\n");
      return `INVOICE #${o.id.slice(-6)}\nPelanggan: ${escapeHtml(o.customer)}\nStatus: ${escapeHtml(o.status)}\n\n${items}\nTotal: ${formatPrice(o.total)}\n---`;
    }).join("\n\n");
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(`<pre style="font-family:monospace;font-size:12px">${text}</pre>`);
      win.document.close();
      win.print();
    }
  };

  const addToCart = (productId: string) => {
    const p = products.find((x) => x.id === productId);
    if (!p) return;
    setCart((prev) => {
      const existing = prev.find((x) => x.productId === productId);
      if (existing) return prev.map((x) => x.productId === productId ? { ...x, quantity: x.quantity + 1 } : x);
      return [...prev, { productId: p.id, name: p.name, price: p.price, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => setCart((prev) => prev.filter((x) => x.productId !== productId));

  const saveManualOrder = async () => {
    if (!custName || cart.length === 0) { toast("Isi nama dan minimal 1 produk", "error"); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: custName,
          phone: custPhone,
          items: cart.map((c) => ({ id: c.productId, quantity: c.quantity })),
        }),
      });
      if (!res.ok) throw new Error();
      toast("Pesanan berhasil ditambahkan");
      setShowManual(false);
      setCart([]);
      setCustName("");
      setCustPhone("");
      fetchOrders();
    } catch {
      toast("Gagal menyimpan pesanan", "error");
    } finally {
      setSaving(false);
    }
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map((o) => o.id)));
  };

  const toggleOne = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const filtered = orders
    .filter((o) => !statusFilter || o.status === statusFilter)
    .filter((o) => !search || o.customer.toLowerCase().includes(search.toLowerCase()) || o.email.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search));

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pesanan</h1>
          <p className="mt-1 text-sm text-gray-400">Kelola pesanan pelanggan</p>
        </div>
        <div className="flex items-center gap-3">
          {selected.size > 0 && (
            <>
              <button onClick={() => bulkUpdateStatus("shipped")} disabled={bulkLoading} className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-100 disabled:opacity-50">
                <Check className="h-4 w-4" /> {bulkLoading ? "Memproses..." : `Kirim (${selected.size})`}
              </button>
              <button onClick={bulkPrint} disabled={bulkLoading} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50">
                <Printer className="h-4 w-4" /> Cetak ({selected.size})
              </button>
              <button onClick={bulkDelete} disabled={bulkLoading} className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50">
                <X className="h-4 w-4" /> {bulkLoading ? "Memproses..." : `Hapus (${selected.size})`}
              </button>
            </>
          )}
          <button onClick={() => setShowManual(!showManual)} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-500 active:scale-[0.97]">
            <Plus className="h-4 w-4" /> Tambah Pesanan Manual
          </button>
        </div>
      </div>

      {showManual && (
        <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
          <h2 className="font-bold text-gray-800 flex items-center gap-2"><MessageCircle className="h-5 w-5 text-emerald-600" /> Tambah Pesanan dari WhatsApp</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <input value={custName} onChange={(e) => setCustName(e.target.value)} placeholder="Nama pelanggan" className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-emerald-300" />
            <input value={custPhone} onChange={(e) => setCustPhone(e.target.value)} placeholder="No. WhatsApp (opsional)" className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-emerald-300" />
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium text-gray-600">Tambah Produk</label>
            <select
              onChange={(e) => { if (e.target.value) { addToCart(e.target.value); e.target.value = ""; } }}
              className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-emerald-300"
            >
              <option value="">-- Pilih produk --</option>
              {products.map((p) => <option key={p.id} value={p.id}>{p.name} — {formatPrice(p.price)} (stok: {p.stock})</option>)}
            </select>
          </div>
          {cart.length > 0 && (
            <div className="mt-4 space-y-2">
              {cart.map((c) => (
                <div key={c.productId} className="flex items-center justify-between rounded-xl bg-white px-4 py-2.5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-800">{c.name}</span>
                    <span className="text-sm text-gray-400">x{c.quantity}</span>
                    <span className="text-sm font-semibold text-emerald-700">{formatPrice(c.price * c.quantity)}</span>
                  </div>
                  <button onClick={() => removeFromCart(c.productId)} className="text-gray-400 transition hover:text-red-500">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <div className="flex items-center justify-between rounded-xl bg-emerald-100 px-4 py-3">
                <span className="font-bold text-gray-800">Total</span>
                <span className="font-bold text-emerald-700">{formatPrice(cart.reduce((s, c) => s + c.price * c.quantity, 0))}</span>
              </div>
            </div>
          )}
          <div className="mt-4 flex gap-3">
            <button onClick={saveManualOrder} disabled={saving || !custName || cart.length === 0} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 disabled:opacity-50">
              {saving ? "Menyimpan..." : "Simpan Pesanan"}
            </button>
            <button onClick={() => { setShowManual(false); setCart([]); setCustName(""); setCustPhone(""); }} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50">
              Batal
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari customer, email, atau ID..." className="w-full rounded-lg border py-2 pl-9 pr-3 text-sm" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
          <option value="">Semua Status</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="mt-6 space-y-4">
        {loading && <p className="py-12 text-center text-gray-400">Memuat...</p>}
        {!loading && filtered.map((order) => (
          <div key={order.id} className={`rounded-xl border bg-white shadow-sm transition ${selected.has(order.id) ? "ring-2 ring-emerald-300" : ""}`}>
            <div className="flex items-center px-6 py-4">
              <input type="checkbox" checked={selected.has(order.id)} onChange={() => toggleOne(order.id)} className="mr-4 rounded border-gray-300 text-emerald-600" />
              <button
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                className="flex flex-1 items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <p className="font-semibold text-gray-800">{order.customer}</p>
                  <span className={`rounded-lg px-2.5 py-0.5 text-xs font-semibold ${statusColor[order.status] || "bg-gray-100 text-gray-600"}`}>
                    {order.status}
                  </span>
                  <span className="text-xs text-gray-400">#{order.id.slice(-6)}</span>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <p className="font-bold text-emerald-700">{formatPrice(order.total)}</p>
                    <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString("id-ID")}</p>
                  </div>
                  {expanded === order.id ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                </div>
              </button>
            </div>
            {expanded === order.id && (
              <div className="border-t px-6 py-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p className="text-gray-800">{order.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">ID Pesanan</p>
                    <p className="text-gray-800 font-mono text-xs">{order.id}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {order.items?.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name} x{item.quantity}</span>
                      <span className="font-medium">{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <label className="text-sm text-gray-500">Ubah Status:</label>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className="rounded-xl border px-4 py-2 text-sm"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <button onClick={() => window.print()} className="ml-auto rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-500 transition hover:bg-gray-50">
                    <Printer className="mr-1 inline h-3 w-3" /> Cetak
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {!loading && filtered.length === 0 && <p className="py-12 text-center text-gray-400">{search || statusFilter ? "Tidak ada pesanan yang cocok." : "Belum ada pesanan."}</p>}
      </div>
    </div>
  );
}
