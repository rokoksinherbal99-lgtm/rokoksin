"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Leaf, Lock, AlertCircle, ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error === "Admin not configured" ? "Admin belum dikonfigurasi. Hubungi developer." : "Password yang Anda masukkan salah.");
      }
    } catch {
      setError("Gagal terhubung ke server. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-foreground via-muted-foreground to-muted-foreground">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-foreground/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-foreground/5 blur-3xl" />
      </div>
      <form onSubmit={handleLogin} className="relative w-full max-w-sm animate-scale-in px-4">
        <div className="rounded-2xl border border-border/20 bg-white/95 p-8 shadow-2xl shadow-foreground/20 backdrop-blur-sm">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-foreground to-muted-foreground shadow-lg shadow-foreground/5/50">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Sin Herbal</h1>
            <p className="text-sm text-muted-foreground">Panel Admin</p>
          </div>

          {error && (
            <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Username</label>
              <input
                ref={inputRef}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-foreground placeholder-muted-foreground transition focus:border-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-ring/20"
                autoComplete="username"
                disabled={loading}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password admin"
                className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-foreground placeholder-muted-foreground transition focus:border-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-ring/20"
                autoComplete="current-password"
                disabled={loading}
              />
            </div>
            <button type="submit" disabled={loading || !username || !password} className="btn-primary w-full gap-2 py-3">
              {loading ? (
                <span className="flex items-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Memproses...</span>
              ) : (
                <><Lock className="h-4 w-4" /> Masuk</>
              )}
            </button>
          </div>

          <div className="mt-6 space-y-3 text-center text-xs text-muted-foreground">
            <p>
              <Link href="/" className="inline-flex items-center gap-1 transition hover:text-foreground">
                <ArrowLeft className="h-3 w-3" /> Kembali ke Beranda
              </Link>
            </p>
            <p>
              <a href="https://wa.me/6285161835757?text=Halo%20Sin%20Herbal%2C%20saya%20lupa%20password%20admin." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 transition hover:text-foreground">
                Lupa password? Hubungi kami
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
