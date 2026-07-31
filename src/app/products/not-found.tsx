import Link from "next/link";

export default function ProductsNotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-foreground">404</h1>
      <p className="mt-2 text-muted-foreground">Halaman tidak ditemukan</p>
      <Link href="/products" className="mt-6 inline-block rounded-lg bg-primary px-6 py-2.5 font-semibold text-primary-foreground shadow transition hover:bg-primary/90">
        Lihat Semua Produk
      </Link>
    </div>
  );
}
