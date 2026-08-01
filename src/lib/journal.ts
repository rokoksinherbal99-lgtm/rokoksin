export interface JournalArticle {
  slug: string;
  title: string;
  excerpt: string;
  icon: "leaf" | "heart" | "bookopen" | "shield" | "checkcircle" | "sparkles";
  category: string;
  date: string;
  dateISO: string;
  readTime: string;
  content: string;
}

export const ARTICLES: JournalArticle[] = [
  {
    slug: "manfaat-rokok-herbal",
    title: "Manfaat Rokok Herbal bagi Kesehatan",
    excerpt: "Rokok herbal menjadi alternatif bagi mereka yang ingin mengurangi dampak buruk rokok tembakau. Berikut manfaat dan kandungannya.",
    icon: "leaf",
    category: "Rokok Herbal",
    date: "10 Juli 2026",
    dateISO: "2026-07-10",
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
    icon: "heart",
    category: "Gaya Hidup",
    date: "8 Juli 2026",
    dateISO: "2026-07-08",
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
      <p>Bergabung dengan komunitas atau berbagi tujuan dengan teman yang juga ingin berhenti merokok bisa meningkatkan motivasi dan kesuksesan.</p>

      <h2>7. Konsultasi dengan Ahli</h2>
      <p>Jika kesulitan, jangan ragu berkonsultasi dengan dokter atau ahli kesehatan untuk mendapatkan panduan yang tepat sesuai kondisi Anda.</p>
    `,
  },
  {
    slug: "kopi-herbal-nusantara",
    title: "Mengenal Kopi Herbal Nusantara dan Khasiatnya",
    excerpt: "Dari jahe hingga madu, Indonesia kaya akan bahan kopi herbal. Simak khasiat dan cara menikmatinya.",
    icon: "bookopen",
    category: "Kopi Herbal",
    date: "5 Juli 2026",
    dateISO: "2026-07-05",
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
    icon: "shield",
    category: "Edukasi",
    date: "3 Juli 2026",
    dateISO: "2026-07-03",
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
  {
    slug: "perbedaan-rokok-herbal-dan-tembakau",
    title: "Perbedaan Rokok Herbal dan Rokok Tembakau",
    excerpt: "Rokok herbal bebas nikotin atau tidak? Simak perbedaan lengkap rokok herbal vs rokok tembakau, dari kandungan hingga sensasi rasanya.",
    icon: "sparkles",
    category: "Rokok Herbal",
    date: "1 Agustus 2026",
    dateISO: "2026-08-01",
    readTime: "6 menit",
    content: `
      <h2>Perbedaan Dasar: Bahan Baku</h2>
      <p>Perbedaan paling mendasar antara rokok herbal dan rokok tembakau terletak pada bahan bakunya. Rokok tembakau menggunakan daun tembakau yang mengandung nikotin, zat adiktif yang menyebabkan ketergantungan. Sementara rokok herbal menggunakan campuran rempah dan tanaman alami seperti cengkeh, daun mint, sirih, kemangi, dan jahe.</p>

      <h2>Kandungan Nikotin</h2>
      <p>Nikotin adalah zat yang membuat rokok tembakau membuat kecanduan. Rokok herbal umumnya tidak mengandung nikotin atau hanya mengandung dalam jumlah yang sangat kecil. Inilah alasan utama banyak perokok beralih ke rokok herbal untuk mengurangi ketergantungan terhadap nikotin.</p>

      <h2>Sensasi dan Aroma</h2>
      <p>Rasa dan aroma rokok herbal cenderung lebih ringan dengan sentuhan rempah yang khas. Para pengguna biasanya merasakan sensasi yang lebih lembut di tenggorokan dibanding rokok tembakau biasa.</p>

      <h2>Harga dan Ketersediaan</h2>
      <p>Rokok herbal umumnya dijual dengan harga lebih terjangkau. Di Sin Herbal, Anda bisa mendapatkan berbagai varian SKT (Sigaret Kretek Tangan) dan SKM (Sigaret Kretek Mesin) dengan harga bersaing.</p>

      <h2>Kesimpulan</h2>
      <p>Baik rokok herbal maupun rokok tembakau tetap memiliki risiko kesehatan karena proses pembakaran menghasilkan asap. Namun jika tujuan Anda adalah mengurangi nikotin, rokok herbal bisa menjadi pilihan transisi yang tepat.</p>
    `,
  },
  {
    slug: "cara-memilih-rokok-herbal-berkualitas",
    title: "Cara Memilih Rokok Herbal yang Berkualitas dan Legal",
    excerpt: "Jangan asal beli! Simak cara memilih rokok herbal berkualitas, terdaftar Bea Cukai, dan aman dikonsumsi.",
    icon: "checkcircle",
    category: "Edukasi",
    date: "2 Agustus 2026",
    dateISO: "2026-08-02",
    readTime: "5 menit",
    content: `
      <h2>Periksa Legalitas Produk</h2>
      <p>Rokok herbal yang legal wajib terdaftar di Bea dan Cukai. Produk legal biasanya mencantumkan pita cukai resmi pada kemasan. Jangan membeli produk tanpa pita cukai karena bisa jadi barang ilegal dengan kualitas yang tidak terjamin.</p>

      <h2>Cek Kemasan dan Informasi Produk</h2>
      <p>Kemasan rokok herbal berkualitas mencantumkan informasi lengkap seperti nama produsen, komposisi, dan tanggal produksi. Hindari produk dengan kemasan rusak atau tanpa informasi yang jelas.</p>

      <h2>Beli di Distributor Resmi</h2>
      <p>Membeli di distributor resmi seperti Sin Herbal menjamin keaslian produk. Distributor resmi mendapat pasokan langsung dari produsen, sehingga harga lebih terjangkau dan produk dijamin original.</p>

      <h2>Cek Reputasi Penjual</h2>
      <p>Baca ulasan pelanggan sebelum membeli. Toko yang terpercaya biasanya memiliki ulasan positif dan pelayanan yang baik. Sin Herbal melayani pengiriman ke seluruh Indonesia dengan garansi uang kembali.</p>

      <h2>Kesimpulan</h2>
      <p>Memilih rokok herbal yang berkualitas tidak bisa sembarangan. Pastikan produk legal, informasi lengkap, dan beli dari sumber terpercaya.</p>
    `,
  },
  {
    slug: "apakah-rokok-herbal-berbahaya",
    title: "Apakah Rokok Herbal Berbahaya? Fakta yang Perlu Anda Tahu",
    excerpt: "Banyak yang mengira rokok herbal lebih aman. Simak fakta ilmiah tentang rokok herbal, kandungannya, dan cara mengonsumsinya secara bijak.",
    icon: "shield",
    category: "Edukasi",
    date: "3 Agustus 2026",
    dateISO: "2026-08-03",
    readTime: "6 menit",
    content: `
      <h2>Rokok Herbal: Fakta vs Mitos</h2>
      <p>Rokok herbal sering dianggap lebih sehat karena bahan alaminya. Faktanya, semua jenis rokok yang dibakar menghasilkan asap yang mengandung tar dan karbon monoksida yang berbahaya bagi kesehatan, termasuk rokok herbal.</p>

      <h2>Kandungan Rokok Herbal</h2>
      <p>Keunggulan utama rokok herbal adalah minim nikotin. Namun tetap penting untuk memahami bahwa proses pembakaran bahan organik apa pun — termasuk rempah herbal — tetap menghasilkan asap yang berisiko bagi paru-paru.</p>

      <h2>Alternatif yang Lebih Bijak</h2>
      <p>Jika tujuan Anda adalah mengurangi konsumsi tembakau dan nikotin, rokok herbal bisa menjadi jembatan transisi. Namun langkah terbaik untuk kesehatan adalah mengurangi atau berhenti merokok sepenuhnya, misalnya dengan beralih ke minuman herbal atau terapi pengganti.</p>

      <h2>Konsumsilah Secara Bijak</h2>
      <p>Jika Anda memilih rokok herbal, pastikan produknya legal dan terdaftar. Konsumsi secukupnya dan jangan jadikan kebiasaan berlebihan. Utamakan selalu kesehatan Anda dan keluarga.</p>
    `,
  },
];
