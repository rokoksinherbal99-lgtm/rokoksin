"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Leaf, Menu, X, Search, Home, Package, DollarSign, BookOpen, Info, HelpCircle, Truck, Phone, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function Header() {
  const pathname = usePathname();
  const { items } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const count = items.reduce((a, b) => a + b.quantity, 0);

  useEffect(() => { setHydrated(true); }, []);

  const links = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/products", label: "Produk", icon: Package },
    { href: "/harga", label: "Daftar Harga", icon: DollarSign },
    { href: "/journal", label: "Jurnal", icon: BookOpen },
    { href: "/tentang-kami", label: "Tentang", icon: Info },
    { href: "/faq", label: "FAQ", icon: HelpCircle },
    { href: "/lacak-pesanan", label: "Lacak Pesanan", icon: Truck },
    { href: "/kontak", label: "Kontak", icon: Phone },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#D5E0D3]/50 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-sm border border-[#ABC1A7]/50 bg-[#1A3626] shadow-sm transition group-hover:bg-[#2C4C3B]">
            <Leaf className="h-5 w-5 text-[#D5E0D3]" strokeWidth={1.5} />
          </div>
          <span className="font-serif text-lg font-bold tracking-tight text-[#1A3626]">Sin Herbal</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`relative rounded-sm px-3 py-2 font-sans text-sm font-medium transition ${isActive(l.href) ? "text-[#1A3626]" : "text-[#5D8356] hover:text-[#2C4C3B]"}`}>
              {l.label}
              {isActive(l.href) && <span className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#2C4C3B]" />}
            </Link>
          ))}
          <Link href="/cart" aria-label="Keranjang Belanja" className="relative ml-2 rounded-sm p-2 text-[#5D8356] transition hover:bg-[#EDF2ED] hover:text-[#1A3626]">
            <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
            {hydrated && count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-[#2C4C3B] px-1 text-[10px] font-bold text-white shadow-sm animate-scale-in">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </Link>
        </nav>
        <div className="flex items-center gap-1 md:hidden">
          <Link href="/products" aria-label="Cari Produk" className="rounded-sm p-2 text-[#5D8356] transition hover:bg-[#EDF2ED] hover:text-[#1A3626]">
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </Link>
          <Link href="/cart" aria-label="Keranjang Belanja" className="relative rounded-sm p-2 text-[#5D8356]">
            <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
            {hydrated && count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-[#2C4C3B] px-1 text-[10px] font-bold text-white shadow-sm">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Tutup menu" : "Buka menu"} className="rounded-sm p-2 text-[#5D8356] transition hover:bg-[#EDF2ED] hover:text-[#1A3626]">
            {menuOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 left-0 z-50 mx-4 mb-4 overflow-hidden rounded-sm border border-[#D5E0D3]/50 bg-white shadow-xl md:hidden animate-scale-in">
            <div className="p-2">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className={`flex items-center gap-3 rounded-sm px-4 py-3 font-sans text-sm font-medium transition ${isActive(l.href) ? "bg-[#EDF2ED] text-[#1A3626]" : "text-[#5D8356] hover:bg-[#EDF2ED] hover:text-[#2C4C3B]"}`}>
                  <l.icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  {l.label}
                </Link>
              ))}
              <div className="mx-3 mt-2 border-t border-[#D5E0D3] pt-3">
                <a href="https://wa.me/6285161835757?text=Halo!%20Saya%20butuh%20bantuan." target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-sm bg-[#25D366]/10 px-4 py-3 font-sans text-sm font-bold text-[#25D366]">
                  <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  Butuh Bantuan? Chat WhatsApp
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
