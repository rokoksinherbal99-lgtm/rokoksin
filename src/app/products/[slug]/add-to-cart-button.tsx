"use client";

import { ShoppingCart, MessageCircle } from "lucide-react";
import { generateSingleProductMessage } from "@/lib/wa-message";
import { useCart } from "@/lib/cart-context";

interface Props {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  disabled?: boolean;
}

export default function AddToCartButton({ id, name, slug, price, image, disabled }: Props) {
  const { addItem } = useCart();
  const { url } = generateSingleProductMessage(name, price);

  if (disabled) {
    return (
      <div className="mt-6 rounded-xl border border-border bg-muted/50 p-5 text-center">
        <p className="text-sm font-semibold text-foreground">Stok Habis</p>
        <p className="mt-1 text-xs text-muted-foreground">Produk ini sedang tidak tersedia</p>
        <a
          href={`https://wa.me/6285161835757?text=${encodeURIComponent(`Halo! Kapan produk ${name} tersedia lagi?`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#25D366] hover:text-[#1da851]"
        >
          <MessageCircle className="h-3.5 w-3.5" /> Tanya via WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#25D366] px-6 py-4 text-base font-bold text-white shadow-md shadow-[#25D366]/20 transition-all duration-200 hover:bg-[#1da851] active:scale-[0.98]"
      >
        <MessageCircle className="h-5 w-5" />
        Pesan via WhatsApp
      </a>
      <button
        onClick={() => addItem({ id, name, slug, price, image, quantity: 1 })}
        className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow transition-all duration-200 hover:bg-primary/90 active:scale-[0.98]"
      >
        <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
        Tambah ke Keranjang
      </button>
      <div className="flex items-center justify-center gap-4 pt-1">
        <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <MessageCircle className="h-3 w-3 text-[#25D366]" /> Pesan langsung
        </span>
        <span className="text-border">|</span>
        <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <ShoppingCart className="h-3 w-3 text-foreground" /> Beli beberapa sekaligus
        </span>
      </div>
    </div>
  );
}
