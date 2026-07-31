"use client";

import { ShoppingCart, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useState, useEffect } from "react";

export default function StickyBottomBar() {
  const { items } = useCart();
  const [hydrated, setHydrated] = useState(false);
  const count = items.reduce((a, b) => a + b.quantity, 0);

  useEffect(() => { setHydrated(true); }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#E4E4E7] bg-white/95 backdrop-blur-lg shadow-[0_-4px_20px_rgba(44,36,22,0.08)] md:hidden">
      <div className="flex items-center gap-2 px-3 py-2.5">
        <a
          href="https://wa.me/6285161835757?text=Halo!%20Saya%20ingin%20pesan%20produk%20Sin%20Herbal."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-sm bg-[#25D366] px-4 py-3 font-sans text-xs font-bold text-white transition active:scale-[0.98]"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
          WhatsApp
        </a>
        <a
          href="/cart"
          className="relative flex flex-1 items-center justify-center gap-2 rounded-sm bg-[#18181B] px-4 py-3 font-sans text-sm font-bold text-white transition active:scale-[0.98]"
        >
          <ShoppingCart className="h-4 w-4" strokeWidth={1.5} />
          Keranjang
          {hydrated && count > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#25D366] px-1 text-[10px] font-bold text-white shadow-sm">
              {count}
            </span>
          )}
        </a>
      </div>
    </div>
  );
}
