"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Trash2, Minus, Plus, ShoppingBag, ShoppingCart, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-sm border border-[#E0D7C5] bg-[#FDFBF7]">
          <ShoppingBag className="h-10 w-10 text-[#C4B8A2]" strokeWidth={1.5} />
        </div>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-[#2C2416]">Masih Sepi</h1>
        <p className="mt-2 font-sans text-sm text-[#A8987F]">Belum ada yang kamu pilih. Yuk, lihat-lihat dulu.</p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/products" className="inline-flex items-center gap-2 rounded-sm bg-[#1A3626] px-6 py-3 font-sans text-sm font-semibold text-white transition hover:bg-[#2C4C3B]">
            <ShoppingCart className="h-4 w-4" strokeWidth={1.5} /> Mulai Belanja
          </Link>
          <a
            href="https://wa.me/6285161835757?text=Halo!%20Saya%20ingin%20pesan%20produk%20Sin%20Herbal."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-[#25D366] bg-white px-6 py-3 font-sans text-sm font-semibold text-[#25D366] transition hover:bg-[#25D366]/5"
          >
            <MessageCircle className="h-4 w-4" /> Pesan via WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <nav className="mb-6 font-sans text-sm text-[#C4B8A2]">
        <Link href="/" className="transition hover:text-[#2C4C3B]">Beranda</Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-[#2C2416]">Keranjang</span>
      </nav>

      <h1 className="font-serif text-2xl font-bold tracking-tight text-[#2C2416]">Keranjang Belanja</h1>
      <p className="mt-1 font-sans text-sm text-[#C4B8A2]">{items.length} item</p>

      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 rounded-sm border border-[#E0D7C5] bg-[#FDFBF7] p-4 shadow-sm transition hover:shadow-md">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-sm bg-[#F0EBE0]">
              <Image src={item.image} alt={item.name} fill unoptimized sizes="80px" className="object-cover contrast-110" />
            </div>
            <div className="flex-1 min-w-0">
              <Link href={`/products/${item.slug}`} className="font-serif font-bold text-[#2C2416] transition hover:text-[#1A3626] line-clamp-1">
                {item.name}
              </Link>
              <p className="mt-1 font-sans text-sm font-bold text-[#2C4C3B]">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#E0D7C5] text-[#C4B8A2] transition hover:border-[#ABC1A7] hover:bg-[#EDF2ED] hover:text-[#2C4C3B]">
                <Minus className="h-4 w-4" strokeWidth={2} />
              </button>
              <span className="w-10 text-center font-sans text-base font-bold text-[#2C2416]">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="flex h-10 w-10 items-center justify-center rounded-sm border border-[#E0D7C5] text-[#C4B8A2] transition hover:border-[#ABC1A7] hover:bg-[#EDF2ED] hover:text-[#2C4C3B]">
                <Plus className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
            <p className="w-24 text-right font-sans font-bold text-[#2C2416]">{formatPrice(item.price * item.quantity)}</p>
            <button onClick={() => removeItem(item.id)} className="flex h-10 w-10 items-center justify-center rounded-sm text-[#C4B8A2] transition hover:bg-red-50 hover:text-red-500" title="Hapus item">
              <Trash2 className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-sm border border-[#E0D7C5] bg-[#FDFBF7] p-6 shadow-sm">
        {total >= 100000 && (
          <div className="mb-4 rounded-sm border border-[#25D366]/30 bg-[#25D366]/5 px-4 py-2.5 text-center">
            <p className="font-sans text-xs font-semibold text-[#25D366]">Selamat! Pesanan Anda sudah memenuhi syarat gratis ongkir 🎉</p>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="font-sans text-lg text-[#A8987F]">Total Belanja</span>
          <span className="font-serif text-3xl font-bold tracking-tight text-[#1A3626]">{formatPrice(total)}</span>
        </div>
        <Link href="/checkout" className="btn-primary mt-6 w-full gap-2 inline-flex justify-center">
          <ShoppingBag className="h-5 w-5" strokeWidth={1.5} /> Lanjutkan ke Checkout
        </Link>
        <div className="mt-3 text-center">
          <a
            href={`https://wa.me/6285161835757?text=${encodeURIComponent("Halo! Saya ingin pesan:\n\n" + items.map((i) => `${i.name} x${i.quantity} = ${formatPrice(i.price * i.quantity)}`).join("\n") + `\n\nTotal: ${formatPrice(total)}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-[#25D366] transition hover:text-[#1da851]"
          >
            <MessageCircle className="h-4 w-4" />
            Atau pesan langsung via WhatsApp
          </a>
        </div>
      </div>

      <div className="mt-8 rounded-sm border border-[#D5E0D3] bg-[#EDF2ED]/50 p-4 text-center">
        <p className="font-sans text-xs text-[#5D8356]">
          Belum paham cara pesan?{" "}
          <a href="https://wa.me/6285161835757?text=Halo!%20Saya%20mau%20tanya%20cara%20pesan%20produk." target="_blank" rel="noopener noreferrer" className="font-semibold text-[#25D366] underline hover:text-[#1da851]">
            Tanya kami via WhatsApp
          </a>
        </p>
      </div>
    </div>
  );
}
