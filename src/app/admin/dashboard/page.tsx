"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, ShoppingBag, TrendingUp, AlertTriangle, ClipboardList, ArrowRight, Leaf } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/components/Toast";

interface Stats {
  products: number;
  orders: number;
  revenue: number;
  pendingOrders: number;
  lowStock: { id: string; name: string; stock: number }[];
  recentOrders: { id: string; customer: string; total: number; status: string; createdAt: string }[];
}

const statusPill: Record<string, string> = {
  pending: "bg-muted text-foreground",
  confirmed: "bg-blue-50 text-blue-700",
  shipped: "bg-purple-50 text-purple-700",
  delivered: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-red-50 text-red-700",
};

const statusLabel: Record<string, string> = {
  pending: "Menunggu",
  confirmed: "Dikonfirmasi",
  shipped: "Dikirim",
  delivered: "Selesai",
  cancelled: "Dibatalkan",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setStats(data);
      })
      .catch(() => toast("Gagal memuat statistik", "error"))
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    {
      label: "Total Produk",
      value: loading ? "..." : stats?.products,
      icon: Package,
      href: "/admin/products",
      hint: "Produk aktif di toko",
    },
    {
      label: "Total Pesanan",
      value: loading ? "..." : stats?.orders,
      icon: ShoppingBag,
      href: "/admin/orders",
      hint: "Semua pesanan masuk",
    },
    {
      label: "Pendapatan",
      value: loading ? "..." : formatPrice(stats?.revenue || 0),
      icon: TrendingUp,
      href: "/admin/orders",
      hint: "Total nilai pesanan",
    },
    {
      label: "Perlu Diproses",
      value: loading ? "..." : stats?.pendingOrders,
      icon: ClipboardList,
      href: "/admin/orders",
      hint: "Menunggu konfirmasi",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome card */}
      <div className="relative overflow-hidden rounded-xl bg-foreground p-6 text-primary-foreground sm:p-8">
        <div className="pointer-events-none absolute -right-8 -top-10 h-44 w-44 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-16 right-24 h-56 w-56 rounded-full bg-white/5" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <h2 className="text-xl font-bold sm:text-2xl">
              Selamat datang kembali, Admin! <span className="inline-block">👋</span>
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Pantau pesanan, stok produk, dan testimoni pelanggan dalam satu tempat. Ada{" "}
              {stats?.pendingOrders ?? "—"} pesanan yang menunggu diproses.
            </p>
            <Link
              href="/admin/orders"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-white/90"
            >
              Lihat Pesanan <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="hidden shrink-0 items-center justify-center rounded-xl bg-white/10 p-6 ring-1 ring-white/10 sm:flex">
            <Leaf className="h-14 w-14 text-white/80" />
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="group rounded-xl border border-border bg-card p-5 transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-foreground transition group-hover:bg-foreground group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{card.label}</p>
              <p className="mt-1 text-2xl font-bold text-foreground">{card.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{card.hint}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Recent orders */}
        <div className="rounded-xl border border-border bg-card xl:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div>
              <h3 className="font-bold text-foreground">Pesanan Terbaru</h3>
              <p className="text-xs text-muted-foreground">5 pesanan terakhir yang masuk</p>
            </div>
            <Link href="/admin/orders" className="inline-flex items-center gap-1 text-sm font-semibold text-foreground transition hover:opacity-70">
              Lihat Semua <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {loading ? (
            <p className="p-8 text-center text-sm text-muted-foreground">Memuat...</p>
          ) : !stats?.recentOrders?.length ? (
            <div className="flex flex-col items-center py-12 text-muted-foreground">
              <ShoppingBag className="mb-2 h-8 w-8" />
              <p className="text-sm">Belum ada pesanan</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-6 py-3 font-semibold">Pelanggan</th>
                    <th className="px-6 py-3 font-semibold">ID Pesanan</th>
                    <th className="px-6 py-3 font-semibold">Total</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.slice(0, 5).map((o) => (
                    <tr key={o.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                      <td className="px-6 py-4 font-medium text-foreground">{o.customer}</td>
                      <td className="px-6 py-4 font-mono text-xs text-muted-foreground">#{o.id.slice(-6)}</td>
                      <td className="px-6 py-4 font-semibold text-foreground">{formatPrice(o.total)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusPill[o.status] || "bg-muted text-muted-foreground"}`}>
                          {statusLabel[o.status] || o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Low stock */}
        <div className="rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-6 py-4">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <h3 className="font-bold text-foreground">Stok Menipis</h3>
          </div>
          {loading ? (
            <p className="p-8 text-center text-sm text-muted-foreground">Memuat...</p>
          ) : !stats?.lowStock?.length ? (
            <p className="p-8 text-center text-sm font-medium text-foreground">Semua stok aman ✓</p>
          ) : (
            <ul className="divide-y divide-border">
              {stats.lowStock.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/admin/products/edit/${p.id}`}
                    className="flex items-center justify-between px-6 py-3.5 text-sm transition hover:bg-muted/50"
                  >
                    <span className="font-medium text-foreground">{p.name}</span>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${p.stock === 0 ? "bg-red-50 text-red-600" : "bg-muted text-foreground"}`}>
                      {p.stock === 0 ? "Habis" : `${p.stock} unit`}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
