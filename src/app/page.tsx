import Link from "next/link";
import Image from "next/image";
import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import ProductCard from "@/components/ProductCard";
import Testimonials from "@/components/Testimonials";
import HomeFAQ from "@/components/HomeFAQ";
import BannerSlider from "@/components/BannerSlider";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/AnimateIn";
import { Package, ShieldCheck, Truck, BadgeCheck, ChevronRight, MessageCircle, Leaf, DollarSign, FileText, MapPin, Store, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sin Herbal — Toko Herbal Alami Terpercaya",
  description: "Toko herbal terpercaya menyediakan berbagai produk herbal alami berkualitas. Belanja herbal online aman & mudah di Sin Herbal.",
};

export const dynamic = "force-dynamic";

async function queryWithTimeout<T>(fn: () => Promise<T>, ms = 15000): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Database query timed out")), ms)
  );
  return Promise.race([fn(), timeout]);
}

export default async function HomePage() {
  const [featuredProducts, allCategories] = await Promise.all([
    queryWithTimeout(() => db.select().from(products).where(eq(products.featured, true)).limit(8)),
    queryWithTimeout(() => db.select().from(categories)),
  ]);

  return (
    <>
      {/* 1. Banner Slider */}
      <BannerSlider />

      {/* 2. Welcome + Why Choose Us */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <FadeInUp>
            <div className="text-center">
              <p className="font-serif text-sm uppercase tracking-[0.2em] text-[#5D8356]">Welcome to Our Site</p>
              <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight text-[#1A3626] md:text-5xl">Sin Herbal</h1>
              <div className="mx-auto mt-4 h-px max-w-[60px] bg-[#ABC1A7]" />
              <p className="mt-4 font-serif text-lg italic text-[#2C4C3B]">Agen Resmi Produk Sin</p>
              <p className="mt-1 font-sans text-sm text-[#5D8356]">Alternatif rokok alami</p>
            </div>
          </FadeInUp>
          <div className="mt-12 grid gap-8 border-t border-[#D5E0D3] pt-12 sm:grid-cols-2 md:grid-cols-4">
            {[
              { icon: Package, title: "Pilihan Produk Lengkap", desc: "Berbagai varian rokok herbal dan minuman serbuk kemasan sachet tersedia untuk Anda." },
              { icon: DollarSign, title: "Harga Termurah", desc: "Kami memberikan penawaran harga terbaik dan paling ekonomis di kelasnya." },
              { icon: ShieldCheck, title: "100% Original", desc: "Semua produk dijamin keasliannya. Kami adalah distributor resmi produk Sin." },
              { icon: Truck, title: "Pengiriman Aman & Cepat", desc: "Dukung ekspedisi express yang mampu menjangkau seluruh wilayah Indonesia." },
            ].map((item) => (
              <div key={item.title} className="group text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EDF2ED] transition group-hover:bg-[#D5E0D3]">
                  <item.icon className="h-7 w-7 text-[#2C4C3B]" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 font-serif font-bold text-[#1A3626]">{item.title}</h3>
                <p className="mt-1 font-sans text-sm leading-relaxed text-[#5D8356]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Best Seller */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <FadeInUp>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="font-serif text-sm uppercase tracking-[0.2em] text-[#5D8356]">— Paling Laris —</span>
                <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#1A3626]">Produk Best Seller</h2>
              </div>
              <Link href="/products" className="hidden items-center gap-1 font-sans text-sm font-semibold text-[#2C4C3B] transition hover:text-[#1A3626] sm:inline-flex">
                Semua Produk <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
          </FadeInUp>
          <StaggerContainer className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">
            {featuredProducts.map((p) => (
              <StaggerItem key={p.id}>
                <ProductCard id={p.id} name={p.name} slug={p.slug} price={p.price} image={p.images} stock={p.stock} />
              </StaggerItem>
            ))}
          </StaggerContainer>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/products" className="inline-flex items-center gap-1 border border-[#ABC1A7] px-6 py-3 font-sans text-sm font-semibold text-[#2C4C3B] transition hover:bg-[#EDF2ED]">
              Semua Produk <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Categories */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <FadeInUp>
            <div className="text-center">
              <span className="font-serif text-sm uppercase tracking-[0.2em] text-[#5D8356]">— Kategori Produk —</span>
              <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#1A3626]">Menyediakan Rokok dan Minuman Serbuk Kemasan Sachet</h2>
            </div>
          </FadeInUp>
          <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-2">
            {allCategories.map((cat, i) => (
              <StaggerItem key={cat.id}>
                <Link
                  href={`/products?cat=${cat.slug}`}
                  className="group relative flex items-center overflow-hidden rounded-sm border border-[#D5E0D3] bg-white p-8 transition-all duration-300 hover:border-[#ABC1A7]/50 hover:shadow-lg md:p-10"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-serif text-5xl font-bold text-[#ABC1A7]/40 md:text-7xl">0{i + 1}</span>
                    <div>
                      <h3 className="font-serif text-2xl font-bold tracking-tight text-[#1A3626] md:text-3xl">{cat.name}</h3>
                      <span className="mt-2 inline-flex items-center gap-1 font-sans text-sm font-semibold text-[#2C4C3B] transition group-hover:gap-2">
                        View <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                    </div>
                  </div>
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#EDF2ED] opacity-50 transition group-hover:scale-150" />
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 5. Testimonials */}
      <Testimonials />

      {/* 6. Keunggulan Produk */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <FadeInUp>
            <div className="text-center">
              <span className="font-serif text-sm uppercase tracking-[0.2em] text-[#5D8356]">— Keunggulan Produk —</span>
              <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#1A3626]">Mengapa Memilih Produk Kami</h2>
              <div className="mx-auto mt-4 h-px max-w-[60px] bg-[#ABC1A7]" />
            </div>
          </FadeInUp>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { icon: BadgeCheck, title: "Terdaftar di Direktorat Jenderal Bea dan Cukai", desc: "Produk kami telah terdaftar secara resmi dan diawasi oleh instansi terkait." },
              { icon: Leaf, title: "Mengandung Rempah-rempah Khas Nusantara", desc: "Dibuat dari bahan-bahan alami pilihan yang tumbuh subur di tanah air." },
              { icon: DollarSign, title: "Harga Terjangkau dan Ramah di Kantong", desc: "Kualitas premium dengan harga yang bersahabat untuk semua kalangan." },
            ].map((item) => (
              <div key={item.title} className="group text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm transition group-hover:shadow-md">
                  <item.icon className="h-9 w-9 text-[#2C4C3B]" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 font-serif text-lg font-bold text-[#1A3626]">{item.title}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-[#5D8356]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6b. Trust Badges */}
      <section className="border-y border-[#D5E0D3] bg-[#FDFBF7] py-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { text: "Terdaftar Bea Cukai", sub: "Produk resmi & legal" },
              { text: "100% Original", sub: "Garansi uang kembali" },
              { text: "Gratis Ongkir", sub: "Min. belanja Rp100rb" },
              { text: "Kirim Seluruh Indonesia", sub: "Ekspedisi terpercaya" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-2.5 text-center">
                <CheckCircle className="h-5 w-5 shrink-0 text-[#2C4C3B]" strokeWidth={1.5} />
                <div>
                  <p className="font-sans text-xs font-bold text-[#1A3626]">{b.text}</p>
                  <p className="font-sans text-[10px] text-[#5D8356]">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Tentang Toko */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <FadeInUp>
            <div className="text-center">
              <span className="font-serif text-5xl font-bold italic text-[#1A3626]">Tentang Toko</span>
            </div>
          </FadeInUp>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {[
              { icon: Store, title: "Profil", desc: "Kenali lebih dekat toko kami", href: "/tentang-kami" },
              { icon: FileText, title: "Blog Info", desc: "Artikel dan informasi terbaru", href: "/journal" },
              { icon: MapPin, title: "Contact us", desc: "Hubungi kami untuk informasi lebih", href: "/kontak" },
              { icon: Package, title: "Product", desc: "Lihat koleksi produk lengkap", href: "/products" },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group overflow-hidden rounded-sm border border-[#D5E0D3] bg-white transition-all duration-200 hover:border-[#ABC1A7]/50 hover:shadow-lg"
              >
                <div className="aspect-[3/2] bg-gradient-to-br from-[#EDF2ED] to-[#D5E0D3] flex items-center justify-center">
                  <item.icon className="h-12 w-12 text-[#2C4C3B]/60 transition group-hover:scale-110" strokeWidth={1.5} />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-[#1A3626]">{item.title}</h3>
                  <p className="mt-1 font-sans text-sm text-[#5D8356]">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Cara Order */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <FadeInUp>
            <div className="text-center">
              <span className="font-serif text-sm uppercase tracking-[0.2em] text-[#5D8356]">— Cara Order —</span>
              <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#1A3626]">Bagaimana Cara Memesan?</h2>
              <div className="mx-auto mt-4 h-px max-w-[60px] bg-[#ABC1A7]" />
            </div>
          </FadeInUp>
          <StaggerContainer className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { step: "01", icon: Package, title: "Pilih Produk", desc: "Jelajahi katalog kami dan pilih produk yang kamu suka. Klik \"Tambah ke Keranjang\" atau langsung pesan via WhatsApp." },
              { step: "02", icon: MessageCircle, title: "Isi Data Diri", desc: "Masukkan nama, alamat pengiriman, dan nomor HP yang bisa dihubungi." },
              { step: "03", icon: ShieldCheck, title: "Konfirmasi & Bayar", desc: "Kami akan menghubungi via WhatsApp untuk konfirmasi. Setelah itu, lakukan pembayaran dan pesanan dikirim." },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <div className="relative rounded-sm border border-[#D5E0D3] bg-[#FDFBF7] p-8 text-center transition-all duration-300 hover:border-[#ABC1A7]/50 hover:shadow-lg">
                  <span className="font-serif text-5xl font-bold text-[#ABC1A7]/30">{item.step}</span>
                  <div className="mx-auto mt-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#EDF2ED]">
                    <item.icon className="h-7 w-7 text-[#2C4C3B]" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-bold text-[#1A3626]">{item.title}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-[#5D8356]">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeInUp delay={0.15}>
            <div className="mt-10 text-center">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PHONE || "6285161835757"}?text=${encodeURIComponent("Halo! Saya ingin pesan produk Sin Herbal. Bisa bantu?")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-6 py-3 font-sans text-sm font-semibold text-white transition hover:bg-[#1da851] active:scale-[0.97]"
              >
                <MessageCircle className="h-5 w-5" />
                Pesan via WhatsApp
              </a>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <FadeInUp>
            <div className="text-center">
              <span className="font-serif text-sm uppercase tracking-[0.2em] text-[#5D8356]">— FAQ —</span>
              <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-[#1A3626]">Pertanyaan yang Sering Diajukan</h2>
              <div className="mx-auto mt-4 h-px max-w-[60px] bg-[#ABC1A7]" />
            </div>
          </FadeInUp>
          <FadeInUp delay={0.15}>
            <div className="mt-10">
              <HomeFAQ />
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* 10. Butuh Bantuan? */}
      <section className="bg-[#FDFBF7] border-y border-[#D5E0D3] py-12">
        <div className="mx-auto max-w-4xl px-4">
          <FadeInUp>
            <div className="text-center">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-[#1A3626]">Butuh Bantuan?</h2>
              <p className="mt-2 font-sans text-sm text-[#5D8356]">Tim kami siap membantu Anda. Kirim pesan atau telepon langsung.</p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PHONE || "6285161835757"}?text=${encodeURIComponent("Halo! Saya butuh bantuan.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-6 py-3 font-sans text-sm font-semibold text-white shadow-sm transition hover:bg-[#1da851]"
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat WhatsApp
                </a>
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_WA_PHONE || "6285161835757"}`}
                  className="inline-flex items-center gap-2 rounded-sm border border-[#ABC1A7] bg-white px-6 py-3 font-sans text-sm font-semibold text-[#2C4C3B] transition hover:bg-[#EDF2ED]"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                  Telepon Kami
                </a>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* 11. CTA */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1A3626] via-[#2C4C3B] to-[#1A3626] py-20">
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ABC1A7]/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#81A27B]/10 blur-3xl" />
        <FadeInUp>
          <div className="relative mx-auto max-w-4xl px-4 text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-white md:text-4xl">Mulai Percakapan</h2>
            <p className="mt-3 font-sans text-lg text-[#D5E0D3]/70">Kami hadir di WhatsApp. Untuk pesanan, pertanyaan, atau sekadar ngobrol tentang daun.</p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PHONE || "6285161835757"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 border border-[#ABC1A7]/30 bg-white px-7 py-3.5 font-sans text-sm font-semibold text-[#1A3626] transition-all duration-200 hover:bg-white active:scale-[0.97]"
            >
              <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
              Chat via WhatsApp
            </a>
          </div>
        </FadeInUp>
      </section>
    </>
  );
}
