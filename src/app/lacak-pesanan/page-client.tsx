"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Package, CheckCircle, Truck, Clock, XCircle, ShoppingBag, Copy, Check, MessageCircle } from "lucide-react";

const STATUS_STEPS = [
  { key: "pending", label: "Pesanan Diterima", icon: Clock },
  { key: "processed", label: "Diproses", icon: Package },
  { key: "shipped", label: "Dikirim", icon: Truck },
  { key: "delivered", label: "Selesai", icon: CheckCircle },
];

const STATUS_MAP: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: "Menunggu Diproses", color: "text-amber-600 bg-amber-50", icon: Clock },
  processed: { label: "Sedang Diproses", color: "text-blue-600 bg-blue-50", icon: Package },
  shipped: { label: "Dalam Pengiriman", color: "text-indigo-600 bg-indigo-50", icon: Truck },
  delivered: { label: "Pesanan Selesai", color: "text-emerald-600 bg-emerald-50", icon: CheckCircle },
  cancelled: { label: "Dibatalkan", color: "text-red-600 bg-red-50", icon: XCircle },
};

export default function LacakPesananPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const res = await fetch(`/api/orders/${orderId.trim()}`);
      if (!res.ok) throw new Error("Pesanan tidak ditemukan");
      const data = await res.json();
      setOrder(data);
    } catch {
      setError("Pesanan tidak ditemukan. Periksa kembali ID pesanan Anda.");
    } finally {
      setLoading(false);
    }
  };

  const currentStatus = order?.status || "pending";
  const currentIdx = STATUS_STEPS.findIndex((s) => s.key === currentStatus);
  const statusInfo = STATUS_MAP[currentStatus] || STATUS_MAP.pending;

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 py-10">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-sm bg-[#D5E0D3]">
          <Truck className="h-8 w-8 text-[#2C4C3B]" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-bold text-[#1A3626]">Lacak Pesanan</h1>
        <p className="mt-2 text-[#A8987F]">Masukkan ID pesanan untuk melihat status terbaru.</p>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-3">
          <input
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Masukkan ID Pesanan (contoh: 550e8400-...)"
            className="flex-1 rounded-sm border border-[#E0D7C5] px-4 py-3 text-sm transition focus:border-[#2C4C3B] focus:outline-none focus:ring-2 focus:ring-[#D5E0D3]"
          />
          <button type="submit" disabled={loading} className="btn-primary gap-2 px-6">
            <Search className="h-4 w-4" strokeWidth={1.5} />
            {loading ? "..." : "Cari"}
          </button>
        </div>
      </form>

      <div className="organic-divider mx-auto mt-4 max-w-[120px]" />

      {error && (
        <div className="mb-8 rounded-sm border border-red-100 bg-red-50 p-6 text-center">
          <XCircle className="mx-auto mb-2 h-10 w-10 text-red-400" />
          <p className="text-red-600">{error}</p>
          <a
            href="https://wa.me/6285161835757?text=Halo!%20Saya%20lupa%20ID%20pesanan%20saya.%20Bisa%20dibantu?"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-[#25D366] hover:text-[#1da851]"
          >
            <MessageCircle className="h-3.5 w-3.5" /> Chat WhatsApp untuk bantuan
          </a>
        </div>
      )}

      {order && (
        <div className="space-y-6">
          <div className="rounded-sm border-[#E0D7C5] bg-[#FDFBF7] p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-[#A8987F]">ID Pesanan</span>
                <p className="font-mono text-xs text-[#A8987F]">{order.id}</p>
                <button
                  onClick={async () => { try { await navigator.clipboard.writeText(order.id); } catch {} }}
                  className="mt-1 inline-flex items-center gap-1 rounded-sm px-2 py-0.5 transition hover:bg-[#EDF2ED]"
                >
                  <Copy className="h-3 w-3 text-[#A8987F]" strokeWidth={1.5} />
                  <span className="font-sans text-[10px] text-[#A8987F]">Salin</span>
                </button>
              </div>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${statusInfo.color}`}>
                <statusInfo.icon className="h-3.5 w-3.5" />
                {statusInfo.label}
              </span>
            </div>
            <div className="mt-4 text-sm text-[#A8987F]">
              {new Date(order.createdAt).toLocaleDateString("id-ID", {
                weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
              })}
            </div>
          </div>

          <div className="rounded-sm border-[#E0D7C5] bg-[#FDFBF7] p-6 shadow-sm">
            <h2 className="font-semibold text-[#1A3626]">Status Pesanan</h2>
            <div className="mt-6">
              <div className="relative flex items-center justify-between">
                {STATUS_STEPS.map((step, i) => {
                  const StepIcon = step.icon;
                  const isActive = i <= currentIdx;
                  const isLast = i === STATUS_STEPS.length - 1;
                  return (
                    <div key={step.key} className="flex flex-col items-center">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                        isActive ? "border-[#2C4C3B] bg-[#D5E0D3] text-[#1A3626]" : "border-[#E0D7C5] bg-[#F0EBE0] text-[#C4B8A2]"
                      }`}>
                        <StepIcon className="h-5 w-5" />
                      </div>
                      <p className={`mt-2 text-center text-xs font-medium ${isActive ? "text-[#2C4C3B]" : "text-[#A8987F]"}`}>
                        {step.label}
                      </p>
                      {!isLast && (
                        <div className={`absolute top-5 h-0.5 w-full -translate-y-1/2 ${
                          i < currentIdx ? "bg-[#2C4C3B]" : "bg-[#E0D7C5]"
                        }`} style={{ left: `${((i + 1) / (STATUS_STEPS.length - 1)) * 100}%`, width: `${100 / (STATUS_STEPS.length - 1)}%` }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-sm border-[#E0D7C5] bg-[#FDFBF7] p-6 shadow-sm">
            <h2 className="font-semibold text-[#1A3626]">Detail Pesanan</h2>
            <div className="mt-4 space-y-3 divide-y divide-gray-50">
              {order.items?.map((item: any) => (
                <div key={item.id} className="flex items-center gap-3 pt-3 first:pt-0">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm bg-[#F0EBE0]">
                    {item.productImage && (
                      <Image src={item.productImage} alt={item.productName || ""} fill unoptimized sizes="56px" className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1A3626]">{item.productName || "Produk"}</p>
                    <p className="text-xs text-[#A8987F]">{item.quantity}x Rp {(item.price || 0).toLocaleString("id-ID")}</p>
                  </div>
                  <p className="text-sm font-bold text-[#1A3626]">Rp {((item.price || 0) * (item.quantity || 0)).toLocaleString("id-ID")}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-[#E0D7C5] pt-4">
              <span className="font-semibold text-[#A8987F]">Total</span>
              <span className="text-xl font-bold text-[#2C4C3B]">Rp {(order.total || 0).toLocaleString("id-ID")}</span>
            </div>
          </div>

          <div className="rounded-sm border-[#E0D7C5] bg-[#FDFBF7] p-6 shadow-sm">
            <h2 className="font-semibold text-[#1A3626]">Alamat Pengiriman</h2>
            <div className="mt-3 text-sm text-[#A8987F]">
              <p className="font-medium text-[#1A3626]">{order.customer}</p>
              <p>{order.phone}</p>
              <p className="mt-1">{order.address}</p>
              <p>{order.city}, {order.province} {order.postalCode}</p>
            </div>
          </div>

          {(currentStatus === "shipped" || currentStatus === "delivered") && (
            <div className="rounded-sm border border-[#ABC1A7] bg-[#D5E0D3] p-6 text-center">
              <Truck className="mx-auto mb-2 h-8 w-8 text-[#2C4C3B]" strokeWidth={1.5} />
              <p className="text-sm font-medium text-[#1A3626]">
                Pesanan Anda sedang dalam perjalanan! Cek status pengiriman melalui:
              </p>
              <div className="mt-3 flex justify-center gap-3">
                <a href="https://jet.co.id/rates" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-[#FDFBF7] px-4 py-2 text-sm font-semibold text-[#2C4C3B] shadow-sm transition hover:bg-[#D5E0D3]">
                  J&T Express
                </a>
                <a href="https://lionelexpress.com/cek-tarif" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-[#FDFBF7] px-4 py-2 text-sm font-semibold text-[#2C4C3B] shadow-sm transition hover:bg-[#D5E0D3]">
                  Lion Express
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {!order && !error && (
        <div className="rounded-sm border-[#E0D7C5] bg-[#F0EBE0] p-10 text-center">
          <ShoppingBag className="mx-auto mb-3 h-12 w-12 text-[#C4B8A2]" strokeWidth={1.5} />
          <p className="text-sm font-medium text-[#A8987F]">Masukkan ID pesanan untuk mulai melacak.</p>
          <div className="mt-4 rounded-sm border border-[#D5E0D3] bg-white p-4 text-left">
            <p className="font-sans text-xs font-semibold text-[#1A3626] mb-2">Dimana saya bisa menemukan ID pesanan?</p>
            <ul className="space-y-1.5 font-sans text-xs text-[#5D8356]">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-[#ABC1A7]" />
                ID pesanan muncul di halaman setelah Anda selesai checkout.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-[#ABC1A7]" />
                Kami juga mengirimkannya via WhatsApp saat konfirmasi pesanan.
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <a
              href="https://wa.me/6285161835757?text=Halo!%20Saya%20lupa%20ID%20pesanan%20saya.%20Bisa%20dibantu?"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-[#25D366] hover:text-[#1da851]"
            >
              Lupa ID pesanan? Chat WhatsApp
            </a>
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link href="/products" className="btn-primary gap-2">
          <ShoppingBag className="h-4 w-4" strokeWidth={1.5} /> Belanja Lagi
        </Link>
      </div>
    </div>
  );
}
