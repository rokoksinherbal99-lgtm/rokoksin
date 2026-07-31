"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, Search, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function Header() {
  const pathname = usePathname();
  const { items } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const count = items.reduce((a, b) => a + b.quantity, 0);

  useEffect(() => { setHydrated(true); }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const links = [
    { href: "/", label: "Beranda" },
    { href: "/products", label: "Produk" },
    { href: "/harga", label: "Daftar Harga" },
    { href: "/lacak-pesanan", label: "Lacak Pesanan" },
    { href: "/faq", label: "FAQ" },
    { href: "/kontak", label: "Kontak" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 py-4">
          {/* Logo */}
          <Link href="/" className="shrink-0 text-xl font-semibold tracking-tight text-foreground transition-colors hover:text-primary">
            SIN<span className="text-primary">HERBAL</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center space-x-1 lg:flex" role="navigation" aria-label="Navigasi utama">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                  isActive(l.href) ? "text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Search */}
          <div className="hidden max-w-md flex-1 items-center lg:flex">
            <form action="/products" className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={2} />
              <input
                type="search"
                name="q"
                placeholder="Cari produk..."
                className="w-full rounded-full border border-input bg-card py-2 pl-10 pr-4 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Mobile search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="rounded-full p-2 transition-colors hover:bg-accent lg:hidden"
              aria-label="Cari"
            >
              <Search className="h-5 w-5 text-foreground" strokeWidth={1.5} />
            </button>

            {/* Cart */}
            <Link href="/cart" aria-label="Keranjang Belanja" className="relative rounded-full p-2 transition-colors hover:bg-accent">
              <ShoppingCart className="h-5 w-5 text-foreground" strokeWidth={1.5} />
              {hydrated && count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground shadow-sm animate-scale-in">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Link>

            {/* WhatsApp */}
            <a
              href="https://wa.me/6285161835757?text=Halo!%20Saya%20ingin%20pesan%20produk%20Sin%20Herbal."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-lg bg-[#25D366] px-3 py-2 text-sm font-medium text-white transition-all hover:bg-[#1da851] sm:inline-flex"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
              WhatsApp
            </a>

            {/* Burger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-full p-2 transition-colors hover:bg-accent lg:hidden"
              aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
            >
              {menuOpen ? <X className="h-5 w-5 text-foreground" strokeWidth={1.5} /> : <Menu className="h-5 w-5 text-foreground" strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="pb-4 lg:hidden animate-fade-in">
            <form action="/products" className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={2} />
              <input
                type="search"
                name="q"
                placeholder="Cari produk..."
                className="w-full rounded-full border border-input bg-card py-2.5 pl-10 pr-4 text-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </form>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden" onClick={() => setMenuOpen(false)} />
          <div className="absolute left-4 right-4 z-50 overflow-hidden rounded-lg border border-border bg-card shadow-xl lg:hidden animate-scale-in">
            <div className="p-2">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block rounded-md px-4 py-3 font-sans text-sm font-medium transition ${
                    isActive(l.href) ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <div className="mx-3 mt-2 border-t border-border pt-3">
                <a
                  href="https://wa.me/6285161835757?text=Halo!%20Saya%20butuh%20bantuan."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md bg-[#25D366]/10 px-4 py-3 font-sans text-sm font-semibold text-[#25D366]"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
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
