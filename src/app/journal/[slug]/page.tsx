import { notFound } from "next/navigation";
import Link from "next/link";
import { BookOpen, ArrowLeft, Leaf, Shield, Heart } from "lucide-react";
import type { Metadata } from "next";

const ARTICLES = [
  {
    slug: "manfaat-rokok-herbal",
    title: "Manfaat Rokok Herbal bagi Kesehatan",
    excerpt: "Rokok herbal menjadi alternatif bagi mereka yang ingin mengurangi dampak buruk rokok tembakau. Berikut manfaat dan kandungannya.",
    icon: Leaf,
    category: "Rokok Herbal",
    date: "10 Juli 2026",
    readTime: "5 menit",
    content: `
      <h2>Apa Itu Rokok Herbal?</h2>
      <p>Rokok herbal adalah produk tembakau alternatif yang menggunakan campuran berbagai rempah dan bahan alami sebagai pengganti atau campuran tembakau konvensional. Berbeda dengan rokok biasa yang mengandalkan tembakau murni, rokok herbal menawarkan pengalaman merokok yang lebih ringan dengan kandungan herbal yang dipercaya memiliki manfaat tertentu.</p>

      <h2>Kandungan Utama Rokok Herbal</h2>
      <p>Rokok herbal umumnya mengandung campuran bahan-bahan alami seperti cengkeh, kayu manis, jahe, dan berbagai rempah pilihan lainnya. Setiap bahan memiliki karakteristik dan manfaat tersendiri yang memberikan sensasi unik saat dikonsumsi.</p>

      <h2>Manfaat bagi Perokok</h2>
      <p>Banyak perokok yang beralih ke rokok herbal karena beberapa alasan:</p>
      <ul>
        <li><strong>Rasa lebih ringan</strong> — Kombinasi herbal memberikan sensasi yang lebih lembut di tenggorokan</li>
        <li><strong>Aroma khas</strong> — Aroma rempah alami lebih menyenangkan dibanding asap tembakau biasa</li>
        <li><strong>Alternatif transisi</strong> — Cocok bagi yang ingin mengurangi konsumsi rokok tembakau secara bertahap</li>
      </ul>

      <h2>Legalitas dan Keamanan</h2>
      <p>Produk rokok herbal yang beredar di Indonesia harus terdaftar dan memenuhi standar yang ditetapkan oleh Bea dan Cukai serta BPOM. Pastikan selalu membeli produk yang sudah memiliki izin edar resmi untuk menjamin keamanan dan kualitasnya.</p>

      <h2>Kesimpulan</h2>
      <p>Rokok herbal dapat menjadi pilihan alternatif bagi mereka yang ingin merasakan pengalaman merokok yang berbeda. Namun tetaplah bijak dalam mengonsumsinya dan utamakan kesehatan.</p>
    `,
  },
  {
    slug: "cara-berhenti-merokok-alami",
    title: "7 Cara Berhenti Merokok secara Alami",
    excerpt: "Ingin berhenti merokok? Coba 7 cara alami ini yang bisa membantu mengurangi kecanduan nikotin secara bertahap.",
    icon: Heart,
    category: "Gaya Hidup",
    date: "8 Juli 2026",
    readTime: "7 menit",
    content: `
      <h2>1. Kurangi Secara Bertahap</h2>
      <p>Jangan berhenti secara drastis. Kurangi jumlah rokok yang dihisap setiap hari secara perlahan. Metode ini lebih efektif daripada berhenti total sekaligus karena tubuh punya waktu untuk beradaptasi.</p>

      <h2>2. Alihkan dengan Minuman Herbal</h2>
      <p>Minuman herbal seperti teh jahe, wedang uwuh, atau infused water bisa menjadi pengalih perhatian saat keinginan merokok muncul. Sensasi hangat dari minuman herbal juga membantu menenangkan pikiran.</p>

      <h2>3. Terapi Relaksasi</h2>
      <p>Stres adalah pemicu utama keinginan merokok. Coba teknik relaksasi seperti meditasi, pernapasan dalam, atau yoga untuk mengelola stres tanpa rokok.</p>

      <h2>4. Olahraga Teratur</h2>
      <p>Olahraga membantu mengeluarkan endorfin yang membuat perasaan lebih baik dan mengurangi craving terhadap nikotin. Mulai dengan jalan kaki 15-30 menit setiap hari.</p>

      <h2>5. Konsumsi Makanan Sehat</h2>
      <p>Makanan bergizi membantu memperbaiki kerusakan sel akibat rokok dan meningkatkan sistem imun. Perbanyak sayur, buah, dan protein berkualitas.</p>

      <h2>6. Cari Dukungan</h2>
      <p>Bergabung dengan komunitas atau berbagi目标 dengan teman yang juga ingin berhenti merokok bisa meningkatkan motivasi dan kesuksesan.</p>

      <h2>7. Konsultasi dengan Ahli</h2>
      <p>Jika kesulitan, jangan ragu berkonsultasi dengan dokter atau ahli kesehatan untuk mendapatkan panduan yang tepat sesuai kondisi Anda.</p>
    `,
  },
  {
    slug: "kopi-herbal-nusantara",
    title: "Mengenal Kopi Herbal Nusantara dan Khasiatnya",
    excerpt: "Dari jahe hingga madu, Indonesia kaya akan bahan kopi herbal. Simak khasiat dan cara menikmatinya.",
    icon: BookOpen,
    category: "Kopi Herbal",
    date: "5 Juli 2026",
    readTime: "6 menit",
    content: `
      <h2>Kekayaan Herbal Nusantara dalam Secangkir Kopi</h2>
      <p>Indonesia memiliki kekayaan rempah dan tanaman herbal yang luar biasa. Perpaduan kopi dengan bahan herbal tradisional menciptakan minuman yang tidak hanya nikmat tapi juga menyehatkan.</p>

      <h2>Bahan Herbal dalam Kopi Nusantara</h2>
      <ul>
        <li><strong>Jahe</strong> — Menghangatkan tubuh, membantu pencernaan, dan mengurangi peradangan</li>
        <li><strong>Madu</strong> — Sumber energi alami, menjaga daya tahan tubuh, dan menambah rasa manis sehat</li>
        <li><strong>Adas</strong> — Membantu meredakan masuk angin dan melancarkan pencernaan</li>
        <li><strong>Kapulaga</strong> — Aromanya khas, membantu menjaga kesehatan saluran pernapasan</li>
      </ul>

      <h2>Cara Menikmati Kopi Herbal</h2>
      <p>Untuk mendapatkan manfaat maksimal, seduh kopi herbal dengan air panas bersuhu 85-95°C. Aduk perlahan dan nikmati selagi hangat. Bisa ditambahkan gula atau madu sesuai selera.</p>
    `,
  },
  {
    slug: "legalitas-produk-herbal",
    title: "Legalitas Produk Herbal di Indonesia",
    excerpt: "Pentingnya memilih produk herbal yang terdaftar resmi dan memiliki izin edar. Panduan lengkap untuk konsumen cerdas.",
    icon: Shield,
    category: "Edukasi",
    date: "3 Juli 2026",
    readTime: "4 menit",
    content: `
      <h2>Mengapa Legalitas Penting?</h2>
      <p>Produk herbal yang legal telah melalui uji keamanan dan kualitas. Membeli produk ilegal tidak hanya merugikan secara materi, tapi juga membahayakan kesehatan karena kandungannya tidak terjamin.</p>

      <h2>Izin Edar Resmi</h2>
      <p>Di Indonesia, produk herbal harus memiliki izin edar dari BPOM (Badan Pengawas Obat dan Makanan). Untuk produk rokok herbal, juga wajib terdaftar di Bea dan Cukai. Nomor izin edar biasanya tercantum pada kemasan produk.</p>

      <h2>Cara Mengecek Keaslian</h2>
      <ul>
        <li>Periksa nomor izin edar BPOM pada kemasan</li>
        <li>Cek keaslian melalui website resmi BPOM atau aplikasi Cek BPOM</li>
        <li>Pastikan kemasan dalam kondisi baik dan ada label produksi</li>
        <li>Beli hanya di toko atau distributor resmi</li>
      </ul>

      <h2>Tips Konsumen Cerdas</h2>
      <p>Jangan tergiur harga murah tanpa kejelasan izin edar. Produk herbal yang baik adalah yang transparan tentang kandungan, produsen, dan legalitasnya.</p>
    `,
  },
];

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} - Sin Herbal`,
    description: article.excerpt,
  };
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const Icon = article.icon;

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#18181B] via-[#3F3F46] to-[#18181B] py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#3F3F46]/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-foreground/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/journal" className="mb-6 inline-flex items-center gap-2 text-sm text-[#A1A1AA] transition hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Kembali ke Jurnal
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E4E4E7]/20 shadow-sm">
              <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <span className="text-sm font-semibold text-[#A1A1AA]">{article.category}</span>
              <p className="text-xs text-[#A1A1AA]/60">{article.date} · {article.readTime}</p>
            </div>
          </div>
          <h1 className="mt-6 text-3xl font-bold text-white md:text-4xl">{article.title}</h1>
          <p className="mt-4 text-lg text-[#A1A1AA]">{article.excerpt}</p>
        </div>
      </section>

      <article className="py-12">
        <div className="mx-auto max-w-3xl px-4">
          <div
            className="prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-[#18181B] prose-p:text-[#52525B] prose-li:text-[#52525B] prose-strong:text-[#3F3F46] prose-a:text-[#3F3F46]"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </article>

      <div className="organic-divider mx-auto mb-16 max-w-[120px]" />

      <section className="pb-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="rounded-sm bg-gradient-to-br from-[#F4F4F5] to-white border border-[#E4E4E7] p-8 shadow-sm">
            <BookOpen className="mx-auto h-8 w-8 text-[#3F3F46]" strokeWidth={1.5} />
            <h2 className="mt-4 text-xl font-bold text-[#18181B]">Artikel Terkait</h2>
            <p className="mt-2 text-sm text-[#52525B]">Baca artikel menarik lainnya seputar herbal dan gaya hidup sehat.</p>
            <Link href="/journal" className="btn-primary mt-6">
              Lihat Semua Artikel
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
