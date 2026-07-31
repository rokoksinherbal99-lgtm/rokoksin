import { Search, Shield, AlertTriangle, CheckCircle, Heart } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transparansi Kandungan & Keamanan",
  description: "Kami percaya pada kejujuran. Berikut adalah isi, proses, dan batasan dari produk Sin Herbal — tanpa polesan, tanpa klaim berlebihan.",
};

const INGREDIENTS = [
  { name: "Daun Mint", source: "Dataran Tinggi Jawa Barat", role: "Memberikan sensasi segar dan menenangkan pada setiap hisapan." },
  { name: "Daun Sirih", source: "Kebun Tradisional Jawa Tengah", role: "Dikenal dalam pengobatan tradisional sebagai pembersih alami." },
  { name: "Daun Kemangi", source: "Ladang Organik Jawa Timur", role: "Aroma khas yang membumi, menenangkan pikiran." },
  { name: "Cengkeh", source: "Perkebunan Maluku Utara", role: "Rempah klasik yang memberi karakter hangat." },
  { name: "Jahe Merah", source: "Petani Lereng Gunung Sindoro", role: "Menghangatkan tenggorokan secara alami." },
];

const NOT_CONTAIN = [
  "Nikotin sintetis",
  "Tar buatan",
  "Bahan pengawet",
  "Pemanis buatan",
  "Zat adiktif kimia",
  "Tembakau sintetis",
];

export default function TransparansiPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#18181B] via-[#3F3F46] to-[#18181B] py-20">
        <div className="hero-blob -top-48 -right-48 h-96 w-96 bg-[#A1A1AA]/15" />
        <div className="hero-blob -bottom-48 -left-48 h-96 w-96 bg-[#71717A]/10" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <span className="inline-block rounded-full border border-[#A1A1AA]/30 bg-[#3F3F46]/60 px-5 py-1 font-serif text-sm font-semibold italic text-[#E4E4E7] backdrop-blur-sm">— Kejujuran adalah Racikan Utama —</span>
          <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-[#FAFAFA] md:text-5xl">Yang Masuk ke Dalam,<br />Kami Tulis di Sini.</h1>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-[#E4E4E7]/70">
            Tidak ada yang kami sembunyikan. Karena percaya dimulai dari keterbukaan.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 space-y-20">
          <div>
            <span className="inline-block rounded-full border border-[#A1A1AA]/30 bg-[#E4E4E7]/50 px-5 py-1 font-serif text-sm font-semibold italic text-[#3F3F46]">— Kandungan —</span>
            <h2 className="mt-4 font-serif text-2xl font-bold tracking-tight text-[#18181B]">Apa yang Ada di Dalamnya</h2>
            <p className="mt-2 font-sans text-sm text-[#A1A1AA]">Setiap bahan dipilih bukan karena murah, tapi karena memang cocok.</p>
            <div className="mt-8 space-y-4">
              {INGREDIENTS.map((item) => (
                <div key={item.name} className="rounded-sm border border-[#E4E4E7] bg-[#FFFFFF] p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#18181B]">{item.name}</h3>
                      <p className="mt-1 font-sans text-sm italic text-[#A1A1AA]">Dari {item.source}</p>
                    </div>
                    <span className="shrink-0 rounded-sm bg-[#F4F4F5] px-3 py-1 font-sans text-[11px] font-medium text-[#3F3F46]">Alami</span>
                  </div>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-[#A1A1AA]">{item.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="inline-block rounded-full border border-[#A1A1AA]/30 bg-[#E4E4E7]/50 px-5 py-1 font-serif text-sm font-semibold italic text-[#3F3F46]">— Bukan Ini —</span>
            <h2 className="mt-4 font-serif text-2xl font-bold tracking-tight text-[#18181B]">Yang Tidak Kami Campurkan</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {NOT_CONTAIN.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-sm border border-[#E4E4E7] bg-[#FFFFFF] p-4">
                  <CheckCircle className="h-5 w-5 shrink-0 text-[#3F3F46]" strokeWidth={1.5} />
                  <span className="font-sans text-sm text-[#18181B]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-sm border border-[#A1A1AA] bg-[#F4F4F5] p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-[#18181B]" strokeWidth={1.5} />
              <div>
                <h3 className="font-serif text-lg font-bold text-[#18181B]">Apa yang Belum Kami Ketahui</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-[#A1A1AA]">
                  Kami adalah peracik, bukan ilmuwan. Produk ini belum melalui uji klinis skala besar. Kami tidak mengklaim dapat menyembuhkan, menggantikan obat dokter, atau menjadi solusi medis apa pun.
                </p>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[#A1A1AA]">
                  Jika Anda memiliki kondisi kesehatan tertentu, berkonsultasilah dengan tenaga medis sebelum mengonsumsi produk herbal apa pun.
                </p>
                <p className="mt-3 font-sans text-sm font-semibold text-[#18181B]">
                  Kejujuran ini adalah komitmen kami. Bukan penghalang.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="organic-divider mx-auto max-w-[120px]" />
            <p className="mt-6 font-sans text-sm leading-relaxed text-[#A1A1AA]">
              Nikmati dengan bijak. Konsumsi berlebihan tetap tidak dianjurkan, meski berbahan herbal.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 font-sans text-xs text-[#A1A1AA]">
              <Heart className="h-3 w-3" strokeWidth={1.5} />
              Terima kasih telah membaca dengan saksama.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
