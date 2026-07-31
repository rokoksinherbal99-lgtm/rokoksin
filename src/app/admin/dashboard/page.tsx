"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, ShoppingBag, TrendingUp, AlertTriangle, ClipboardList, Plus, Eye } from "lucide-react";
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

  const mainCards = [
    { label: "Total Produk", value: loading ? "..." : stats?.products, icon: Package, href: "/admin/products", color: "from-blue-500 to-blue-600" },
    { label: "Total Pesanan", value: loading ? "..." : stats?.orders, icon: ShoppingBag, href: "/admin/orders", color: "from-foreground to-muted-foreground" },
    { label: "Pendapatan", value: loading ? "..." : formatPrice(stats?.revenue || 0), icon: TrendingUp, href: "/admin/orders", color: "from-foreground to-muted-foreground" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Pusat kendali operasional</p>
        </div>
        <Link href="/admin/orders" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white shadow-lg shadow-foreground/5 transition-all hover:bg-primary/90 active:scale-[0.97]">
          <Plus className="h-4 w-4" /> Tambah Pesanan Manual
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {mainCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.label} href={card.href} className="group rounded-xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br text-white ${card.color} shadow-sm`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <p className="mt-0.5 text-2xl font-bold text-foreground">{card.value}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Pesanan Perlu Diproses */}
        <div className="rounded-xl border bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-foreground" />
              <h2 className="font-bold text-foreground">Pesanan Perlu Diproses</h2>
            </div>
            <Link href="/admin/orders" className="text-xs font-medium text-foreground hover:text-foreground">Lihat Semua</Link>
          </div>
          {loading ? (
            <p className="mt-4 text-sm text-muted-foreground">Memuat...</p>
          ) : !stats?.recentOrders?.length ? (
            <div className="mt-4 flex flex-col items-center py-8 text-muted-foreground">
              <ClipboardList className="mb-2 h-8 w-8" />
              <p className="text-sm">Belum ada pesanan</p>
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              {stats.recentOrders.slice(0, 5).map((o) => (
                <div key={o.id} className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3 text-sm transition hover:bg-muted">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-foreground">{o.customer}</span>
                    <span className="text-xs text-muted-foreground">#{o.id.slice(-6)}</span>
                    <span className={`rounded-lg px-2 py-0.5 text-xs font-semibold ${
                      o.status === "completed" ? "bg-muted text-foreground" :
                      o.status === "confirmed" ? "bg-blue-100 text-blue-700" :
                      o.status === "shipped" ? "bg-purple-100 text-purple-700" :
                      o.status === "cancelled" ? "bg-red-100 text-red-700" :
                      "bg-muted text-foreground"
                    }`}>{o.status}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-foreground">{formatPrice(o.total)}</span>
                    <Link href={`/admin/orders`} className="rounded-lg border border-border bg-white p-1.5 text-muted-foreground transition hover:border-border hover:text-foreground">
                      <Eye className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Alert Panel */}
        <div className="space-y-4">
          {/* Low Stock Alert */}
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-foreground">
              <AlertTriangle className="h-5 w-5" />
              <h2 className="font-bold text-foreground">Stok Menipis</h2>
            </div>
            {loading ? (
              <p className="mt-3 text-sm text-muted-foreground">Memuat...</p>
            ) : !stats?.lowStock?.length ? (
              <p className="mt-3 text-sm font-medium text-foreground">Semua stok aman ✓</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {stats.lowStock.map((p) => (
                  <li key={p.id}>
                    <Link href={`/admin/products/edit/${p.id}`} className="flex items-center justify-between rounded-lg bg-muted px-3 py-2 text-sm transition hover:bg-muted">
                      <span className="font-medium text-foreground">{p.name}</span>
                      <span className="font-bold text-red-500">{p.stock}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
