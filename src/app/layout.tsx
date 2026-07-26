import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import BackToTop from "@/components/BackToTop";
import AgeModal from "@/components/AgeModal";
import StickyBottomBar from "@/components/StickyBottomBar";
import { ToastProvider } from "@/components/Toast";
import { CartProvider } from "@/lib/cart-context";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://rokoksin.vercel.app";
const OG_IMAGE = "https://www.tridayasinergi.com/images/content/logo/TRST.png";

export const metadata: Metadata = {
  title: { default: "Sin Herbal - Agen Resmi Produk Sin Herbal Premium", template: "%s | Sin Herbal" },
  description: "Agen resmi produk Sin dari PT Tridaya Sinergi Indonesia. Rokok herbal SKT/SKM dan kopi premium. Terdaftar Bea Cukai, harga terjangkau. Gratis ongkir min. belanja Rp100rb.",
  keywords: ["rokok herbal", "sin herbal", "SKT", "SKM", "kretek", "tembakau herbal", "kopi herbal", "tridaya sinergi", "toko herbal online"],
  openGraph: {
    title: "Sin Herbal - Agen Resmi Produk Sin Herbal Premium",
    description: "Rokok herbal SKT/SKM dan kopi premium dari PT Tridaya Sinergi Indonesia. Terdaftar Bea Cukai, harga terjangkau!",
    type: "website",
    locale: "id_ID",
    siteName: "Sin Herbal",
    url: BASE_URL,
    images: [{ url: OG_IMAGE, width: 800, height: 800, alt: "Sin Herbal - Produk Herbal Premium" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sin Herbal - Agen Resmi Produk Sin Herbal Premium",
    description: "Rokok herbal SKT/SKM dan kopi premium. Terdaftar Bea Cukai, harga terjangkau!",
    images: [OG_IMAGE],
  },
  verification: { google: "jfqbB0vDy3sffngMeXLnGpnukeZigUMygJQWhUO3rfM" },
  robots: {
    index: true,
    follow: true,
  },
  alternates: { canonical: BASE_URL },
  manifest: "/manifest.json",
  icons: {
    apple: OG_IMAGE,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Sin Herbal",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Sin Herbal",
      description: "Agen resmi produk Sin dari PT Tridaya Sinergi Indonesia. Rokok herbal SKT/SKM dan kopi premium.",
      inLanguage: "id-ID",
      potentialAction: {
        "@type": "SearchAction",
        target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/products?q={search_term_string}` },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Sin Herbal",
      url: BASE_URL,
      logo: OG_IMAGE,
      image: OG_IMAGE,
      address: { "@type": "PostalAddress", addressLocality: "Depok", addressCountry: "ID" },
      contactPoint: { "@type": "ContactPoint", telephone: "+62-851-6183-5757", contactType: "customer service", language: "id" },
      sameAs: [`https://wa.me/${process.env.NEXT_PUBLIC_WA_PHONE || "6285161835757"}`],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${playfair.variable} flex min-h-screen flex-col`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[999] focus:rounded-sm focus:bg-[#1A3626] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white">
          Langsung ke konten
        </a>
        <ToastProvider>
          <CartProvider>
            <Header />
            <main id="main-content" className="flex-1 pb-16 md:pb-0">{children}</main>
            <StickyBottomBar />
            <Footer />
            <AgeModal />
            <AIChat />
            <BackToTop />
          </CartProvider>
        </ToastProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch(() => {});
          }
        `}} />
      </body>
    </html>
  );
}
