import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ritual - Sin Herbal",
  description: "Cara menikmati Sin Herbal: perlahan, sadar, dan penuh rasa syukur.",
};

const STEPS = [
  {
    number: "01",
    title: "Cari Tempat yang Teduh",
    body: "Duduklah di mana kamu bisa mendengar napas sendiri. Kursi kayu di beranda, bangku taman, atau sudut ruang yang terkena cahaya sore. Biarkan tubuhmu menemukan posisi yang paling ringan.",
  },
  {
    number: "02",
    title: "Siapkan Tangan yang Bersih",
    body: "Ambil sebatang. Rasakan tekstur kertasnya di ujung jari. Ini bukan gerakan otomatis — ini isyarat sadar bahwa sebentar lagi kamu akan hadir penuh pada momen ini.",
  },
  {
    number: "03",
    title: "Nyalakan, Perlahan",
    body: "Satu tarikan pertama. Biarkan asapnya singgah sebentar di dalam, lalu lepaskan pelan-pelan. Tidak perlu terburu-buru. Tidak ada yang mengejar.",
  },
  {
    number: "04",
    title: "Rasakan Sunyi",
    body: "Di antara satu hisapan dan hisapan berikutnya, ada ruang kosong. Biarkan ruang itu terisi oleh apa pun yang muncul — pikiran, ingatan, atau sekadar suara angin. Inilah bagian yang paling jarang ditemukan di luar sana.",
  },
  {
    number: "05",
    title: "Kembali, dengan Tenang",
    body: "Ketika sudah selesai, jangan langsung sibuk lagi. Ambil satu napas dalam. Rasakan perubahan di tubuhmu. Lalu, kembalilah ke dunia — sedikit lebih tenang dari sebelumnya.",
  },
];

export default function RitualPage() {
  return (
    <div>
      <section className="relative min-h-screen bg-gradient-to-b from-[#18181B] via-[#18181B] to-[#18181B] py-20">
        <div className="hero-blob top-1/4 left-1/4 h-80 w-80 bg-[#A1A1AA]/10" />
        <div className="hero-blob bottom-1/4 right-1/4 h-96 w-96 bg-[#71717A]/8" />
        <div className="relative mx-auto max-w-3xl px-4">
          <div className="mb-20 text-center animate-fade-in">
            <span className="inline-block font-serif text-sm italic tracking-[0.3em] text-[#A1A1AA]/50 uppercase">— Sebuah Ritual —</span>
            <h1 className="mt-8 font-serif text-4xl font-bold leading-[1.15] tracking-tight text-[#FAFAFA] md:text-5xl">
              Lima Langkah<br />
              <span className="italic text-[#A1A1AA]">Menuju Sunyi</span>
            </h1>
            <p className="mx-auto mt-5 max-w-lg font-sans text-base leading-relaxed text-[#E4E4E7]/60">
              Bukan petunjuk penggunaan. Hanya pengingat bahwa beberapa hal layak dinikmati dengan lambat.
            </p>
          </div>

          <div className="space-y-24">
            {STEPS.map((step, i) => (
              <div key={step.number} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="grid gap-6 md:grid-cols-[80px_1fr]">
                  <div className="text-center md:text-left">
                    <span className="font-serif text-5xl font-bold italic text-[#A1A1AA]/30">{step.number}</span>
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-bold tracking-tight text-[#FAFAFA]">{step.title}</h2>
                    <p className="mt-4 font-sans text-base leading-[1.8] text-[#E4E4E7]/70">{step.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 border-t border-[#A1A1AA]/15 pt-16 text-center">
            <p className="font-serif text-2xl italic text-[#A1A1AA]/60">
              &ldquo;Nikmati dengan bijak.<br />Konsumsi berlebihan tetap tidak dianjurkan,<br />meski berbahan herbal.&rdquo;
            </p>
            <p className="mt-8 font-sans text-sm text-[#E4E4E7]/40">
              Sin Herbal — dari Depok, untuk mereka yang mencari ketenangan.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
