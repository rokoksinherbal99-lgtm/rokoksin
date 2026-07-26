import { Leaf, Shield, Star, CheckCircle, MessageCircle, Building2, Heart, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami - Cerita & Visi Sin Herbal",
  description: "Kenali lebih dekat Sin Herbal — distributor produk herbal dari Depok. Berawal dari keprihatinan terhadap bahaya rokok tembakau, kami hadirkan alternatif sehat dari bahan alami nusantara.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1A3626] via-[#2C4C3B] to-[#1A3626] py-20">
        <div className="hero-blob -top-48 -right-48 h-96 w-96 bg-[#ABC1A7]/15" />
        <div className="hero-blob -bottom-48 -left-48 h-96 w-96 bg-[#81A27B]/10" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <span className="inline-block rounded-full border border-[#ABC1A7]/30 bg-[#2C4C3B]/60 px-5 py-1 font-serif text-sm font-semibold italic text-[#D5E0D3] backdrop-blur-sm">Tentang Kami</span>
          <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-[white] md:text-5xl">Cerita Sin Herbal</h1>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-[#D5E0D3]/70">
            Berawal dari keprihatinan terhadap dampak rokok tembakau, kami hadirkan alternatif sehat dari rempah-rempah pilihan Nusantara.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 space-y-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <span className="inline-block rounded-full border border-[#ABC1A7]/30 bg-[#D5E0D3]/50 px-5 py-1 font-serif text-sm font-semibold italic text-[#2C4C3B]">Awal Mula</span>
              <h2 className="mt-4 font-serif text-2xl font-bold tracking-tight text-[#1A3626]">Dari Hobi Jadi Misi</h2>
              <p className="mt-4 font-sans leading-relaxed text-[#5D8356]">
                Sin Herbal lahir pada tahun 2020 dari keresahan sederhana: tembakau mahal, dampak kesehatannya nyata, dan pilihan herbal yang terjangkau sulit ditemukan.
              </p>
              <p className="mt-3 font-sans leading-relaxed text-[#5D8356]">
                Berbekal pengetahuan tentang rempah-rempah khas Indonesia — daun mint, sirih, kemangi, dan jahe — kami mulai meracik sendiri campuran rokok herbal yang nikmat tanpa nikotin berlebih.
              </p>
              <p className="mt-3 font-sans leading-relaxed text-[#5D8356]">
                Apa yang dimulai dari dapur kecil di Abadijaya, Depok, kini melayani ribuan pelanggan di seluruh Indonesia.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-sm border border-[#D5E0D3] bg-[white] p-6 text-center">
                <p className="font-serif text-3xl font-bold text-[#1A3626]">2020</p>
                <p className="mt-1 font-sans text-sm text-[#5D8356]">Berdiri</p>
              </div>
              <div className="rounded-sm border border-[#D5E0D3] bg-[white] p-6 text-center">
                <p className="font-serif text-3xl font-bold text-[#2C4C3B]">10rb+</p>
                <p className="mt-1 font-sans text-sm text-[#5D8356]">Pelanggan</p>
              </div>
              <div className="rounded-sm border border-[#D5E0D3] bg-[white] p-6 text-center">
                <p className="font-serif text-3xl font-bold text-[#1A3626]">50+</p>
                <p className="mt-1 font-sans text-sm text-[#5D8356]">Varian Produk</p>
              </div>
              <div className="rounded-sm border border-[#D5E0D3] bg-[white] p-6 text-center">
                <p className="font-serif text-3xl font-bold text-[#1A3626]">4.9/5</p>
                <p className="mt-1 font-sans text-sm text-[#5D8356]">Rating</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <span className="inline-block rounded-full border border-[#ABC1A7]/30 bg-[#D5E0D3]/50 px-5 py-1 font-serif text-sm font-semibold italic text-[#2C4C3B]">Visi & Misi</span>
            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-[#1A3626]">Apa yang Kami Percaya</h2>
            <div className="organic-divider mx-auto mt-4 max-w-[120px]" />
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-sm border border-[#D5E0D3] bg-gradient-to-br from-[#EDF2ED] to-[white] p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-[#ABC1A7]/30 bg-white">
                <Heart className="h-6 w-6 text-[#2C4C3B]" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-serif text-lg font-bold text-[#1A3626]">Visi</h3>
              <p className="mt-2 font-sans leading-relaxed text-[#5D8356]">
                Menjadi pelopor gaya hidup herbal di Indonesia dengan menyediakan produk alternatif berkualitas, terjangkau, dan mudah diakses oleh seluruh lapisan masyarakat.
              </p>
            </div>
            <div className="rounded-sm border border-[#D5E0D3] bg-gradient-to-br from-[#EDF2ED] to-[white] p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-[#ABC1A7]/30 bg-white">
                <Users className="h-6 w-6 text-[#2C4C3B]" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-serif text-lg font-bold text-[#1A3626]">Misi</h3>
              <ul className="mt-2 space-y-2">
                {["Menyediakan produk herbal 100% bahan alami Nusantara", "Memberikan edukasi tentang manfaat herbal bagi kesehatan", "Mendukung UKM lokal melalui kemitraan distribusi", "Menjaga konsistensi kualitas dan harga terjangkau"].map((m, i) => (
                  <li key={i} className="flex items-start gap-2 font-sans text-sm text-[#5D8356]">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#2C4C3B]" strokeWidth={1.5} />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="order-last md:order-first">
              <span className="inline-block rounded-full border border-[#ABC1A7]/30 bg-[#D5E0D3]/50 px-5 py-1 font-serif text-sm font-semibold italic text-[#2C4C3B]">Komitmen Kami</span>
              <h2 className="mt-4 font-serif text-2xl font-bold tracking-tight text-[#1A3626]">Mengapa Memilih Sin Herbal?</h2>
              <p className="mt-4 font-sans leading-relaxed text-[#5D8356]">
                Kami bukan sekadar toko. Setiap produk melewati proses seleksi bahan baku yang ketat. Kami bekerja sama dengan petani rempah lokal untuk memastikan kualitas dan keberlanjutan.
              </p>
              <p className="mt-3 font-sans leading-relaxed text-[#5D8356]">
                Legalitas produk terjamin — tercatat di Direktorat Jenderal Bea dan Cukai. Kami juga melayani pengiriman ke seluruh Indonesia dengan kemasan yang aman dan rapi.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { text: "100% Bahan Alami Nusantara" },
                { text: "Produk Terdaftar & Legal" },
                { text: "Harga Langsung Pabrik" },
                { text: "Tanpa Minimal Pembelian" },
                { text: "Pengiriman ke Seluruh Indonesia" },
                { text: "Gratis Ongkir Min. Belanja Rp 100rb" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 rounded-sm border border-[#D5E0D3] bg-[white] p-4 shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-[#ABC1A7]/30 bg-white">
                    <CheckCircle className="h-5 w-5 text-[#2C4C3B]" strokeWidth={1.5} />
                  </div>
                  <span className="font-sans font-medium text-[#1A3626]">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Shield, title: "Legalitas Terjamin", desc: "Terdaftar di Direktorat Jenderal Bea dan Cukai. Legalitas produk terjamin sepenuhnya." },
              { icon: Leaf, title: "Bahan Alami Pilihan", desc: "Mengandung rempah-rempah khas nusantara dengan kualitas terbaik tanpa bahan pengawet." },
              { icon: Star, title: "Harga Terjangkau", desc: "Kualitas premium dengan harga yang ramah di kantong. Langsung dari produsen ke konsumen." },
            ].map((item) => (
              <div key={item.title} className="rounded-sm border border-[#D5E0D3] bg-[white] p-6 text-center shadow-sm transition hover:shadow-md">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-sm border border-[#ABC1A7]/30 bg-white">
                  <item.icon className="h-7 w-7 text-[#2C4C3B]" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1A3626]">{item.title}</h3>
                <p className="mt-2 font-sans text-sm text-[#5D8356]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-[#1A3626] via-[#2C4C3B] to-[#1A3626] py-16">
        <div className="hero-blob top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 bg-[#ABC1A7]/10" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[white]">Jadi Bagian dari Perjalanan Kami?</h2>
          <p className="mt-3 font-sans text-lg text-[#D5E0D3]/70">Jadilah reseller atau distributor Sin Herbal. Dapatkan harga khusus dan dukungan pemasaran.</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PHONE || "6285161835757"}?text=${encodeURIComponent("Halo! Saya tertarik menjadi reseller/distributor Sin Herbal.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-6 py-3 font-sans text-sm font-semibold text-white transition hover:bg-[#1da851]"
            >
              <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
              Chat WhatsApp
            </a>
            <a
              href="/products"
              className="inline-flex items-center gap-2 rounded-sm border border-[#ABC1A7]/30 bg-white px-6 py-3 font-sans text-sm font-semibold text-[#1A3626] transition hover:bg-white/90"
            >
              Lihat Produk
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
