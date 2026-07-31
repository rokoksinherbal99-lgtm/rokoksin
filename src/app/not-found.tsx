import Link from "next/link";
import { Search, Home, ShoppingCart } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#F4F4F5]">
        <span className="font-serif text-4xl font-bold text-[#A1A1AA]">404</span>
      </div>
      <h1 className="font-serif text-2xl font-bold tracking-tight text-[#18181B]">Halaman Tidak Ditemukan</h1>
      <p className="mt-2 max-w-sm font-sans text-sm text-[#52525B]">
        Sepertinya halaman yang Anda cari sudah dipindahkan atau tidak tersedia.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="inline-flex items-center gap-2 rounded-sm bg-[#18181B] px-6 py-3 font-sans text-sm font-semibold text-white transition hover:bg-[#3F3F46]">
          <Home className="h-4 w-4" strokeWidth={1.5} />
          Kembali ke Beranda
        </Link>
        <Link href="/products" className="inline-flex items-center gap-2 rounded-sm border border-[#A1A1AA] bg-white px-6 py-3 font-sans text-sm font-semibold text-[#3F3F46] transition hover:bg-[#F4F4F5]">
          <ShoppingCart className="h-4 w-4" strokeWidth={1.5} />
          Lihat Produk
        </Link>
      </div>
      <p className="mt-6 font-sans text-xs text-[#A1A1AA]">
        Atau hubungi kami via{" "}
        <a href="https://wa.me/6285161835757?text=Halo!%20Saya%20kesulitan%20mengakses%20halaman." target="_blank" rel="noopener noreferrer" className="font-semibold text-[#25D366] underline hover:text-[#1da851]">
          WhatsApp
        </a>{" "}
        jika butuh bantuan.
      </p>
    </div>
  );
}
