"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Package, ShoppingBag, LayoutDashboard, LogOut, Menu, X, MessageSquareText, KeyRound } from "lucide-react";
import { ToastProvider } from "@/components/Toast";

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

  return (
    <ToastProvider>
      <div className="flex min-h-screen">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed left-4 top-3 z-50 rounded-lg border bg-white p-2 shadow md:hidden"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <aside className={`flex w-56 flex-col border-r bg-muted/50 p-4 transition-transform md:relative md:translate-x-0 ${sidebarOpen ? "fixed inset-y-0 left-0 z-40 translate-x-0" : "fixed -translate-x-full md:translate-x-0"}`}>
          <Link href="/" className="mb-8 mt-6 flex items-center gap-2 text-lg font-bold text-foreground md:mt-0">
            Sin Herbal
          </Link>
          <nav className="flex flex-col gap-2">
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${pathname.startsWith(item.href) ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted"}`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto space-y-1">
            <Link href="/admin/change-password" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted">
              <KeyRound className="h-4 w-4" /> Ganti Password
            </Link>
            <button onClick={logout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </aside>
        {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/20 md:hidden" onClick={() => setSidebarOpen(false)} />}
        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </ToastProvider>
  );
}
