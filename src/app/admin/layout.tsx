"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Package, ShoppingBag, LayoutDashboard, LogOut, Menu, X, MessageSquareText, KeyRound, ExternalLink, Leaf } from "lucide-react";
import { ToastProvider } from "@/components/Toast";

function getTitle(pathname: string) {
  if (pathname.startsWith("/admin/products/new")) return "Tambah Produk";
  if (pathname.startsWith("/admin/products/edit")) return "Edit Produk";
  if (pathname.startsWith("/admin/products")) return "Produk";
  if (pathname.startsWith("/admin/orders")) return "Pesanan";
  if (pathname.startsWith("/admin/testimonials")) return "Testimoni";
  if (pathname.startsWith("/admin/change-password")) return "Ganti Password";
  return "Dashboard";
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setAuthed(false);
    fetch("/api/admin/check")
      .then((r) => {
        if (r.ok) setAuthed(true);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [pathname]);

  const logout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {}
    setAuthed(false);
    router.push("/admin");
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Memuat...</div>;
  if (!authed && pathname !== "/admin") { router.push("/admin"); return null; }
  if (pathname === "/admin" && !authed) return <ToastProvider>{children}</ToastProvider>;

  const nav = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Produk", icon: Package },
    { href: "/admin/orders", label: "Pesanan", icon: ShoppingBag },
    { href: "/admin/testimonials", label: "Testimoni", icon: MessageSquareText },
  ];

  const sectionLabel = (label: string) => (
    <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
  );

  const navItem = (href: string, label: string, Icon: any, extra?: React.ReactNode) => {
    const active = href === "/admin/dashboard" ? pathname === href : pathname.startsWith(href);
    return (
      <Link
        key={href}
        href={href}
        onClick={() => setSidebarOpen(false)}
        className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
          active ? "bg-muted font-semibold text-foreground" : "font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        <span className={`transition ${active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <span className="flex-1">{label}</span>
        {extra}
      </Link>
    );
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <Link href="/" className="flex items-center gap-3 px-5 pb-6 pt-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-white shadow-sm">
          <Leaf className="h-5 w-5" />
        </span>
        <span>
          <span className="block text-sm font-bold tracking-tight text-foreground">SIN<span className="text-foreground">HERBAL</span></span>
          <span className="block text-[11px] text-muted-foreground">Panel Admin</span>
        </span>
      </Link>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-4">
        <div>
          {sectionLabel("Menu Utama")}
          <div className="space-y-1">
            {nav.map((item) => navItem(item.href, item.label, item.icon))}
          </div>
        </div>
        <div>
          {sectionLabel("Pengaturan")}
          <div className="space-y-1">
            {navItem("/admin/change-password", "Ganti Password", KeyRound)}
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <LogOut className="h-[18px] w-[18px]" />
              <span className="flex-1 text-left">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="border-t border-border p-4">
        <Link href="/" className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2.5 text-xs font-semibold text-muted-foreground transition hover:border-border hover:bg-muted hover:text-foreground">
          <ExternalLink className="h-3.5 w-3.5" /> Lihat Toko
        </Link>
      </div>
    </div>
  );

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-muted/50">
        {/* Mobile backdrop */}
        {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/20 md:hidden" onClick={() => setSidebarOpen(false)} />}

        {/* Sidebar - mobile drawer / desktop fixed */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-card transition-transform duration-200 md:static md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sidebarContent}
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Navbar */}
          <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
            <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="rounded-lg border border-border bg-card p-2 text-muted-foreground transition hover:bg-muted md:hidden"
              >
                {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
              <div className="flex-1">
                <h1 className="text-base font-bold text-foreground sm:text-lg">{getTitle(pathname)}</h1>
              </div>
              <Link
                href="/"
                className="hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground sm:inline-flex"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Lihat Toko
              </Link>
              <button
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
              >
                <LogOut className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}
