import Link from "next/link";
import { Leaf, MapPin, Phone, Mail, Clock } from "lucide-react";
import { db } from "@/db";
import { settings } from "@/db/schema";
import { unstable_cache } from "next/cache";

const DEFAULTS: Record<string, string> = {
  wa_phone: "6285161835757",
  address: "Ruko Sentra Niaga Blok A1 No. 5, Pakisaji, Malang 65162",
  email: "info@sinherbal.com",
  shipping_info: "Gratis ongkir untuk area tertentu (syarat & ketentuan berlaku)",
  operating_hours: "Senin - Sabtu 08.00 - 17.00\nMinggu 09.00 - 14.00",
};

const getSettings = unstable_cache(
  async () => {
    try {
      const rows = await db.select().from(settings);
      const result = { ...DEFAULTS };
      for (const row of rows) {
        if (row.key in result) {
          result[row.key as keyof typeof result] = row.value;
        }
      }
      return result;
    } catch {
      return DEFAULTS;
    }
  },
  ["footer-settings"],
  { revalidate: 300, tags: ["settings"] }
);

function formatPhone(phone: string) {
  const cleaned = phone.replace(/\D/g, "");
  return `0${cleaned.slice(2, 5)}-${cleaned.slice(5, 9)}-${cleaned.slice(9)}`;
}

function parseHours(hours: string) {
  const lines = hours.split("\n").filter(Boolean);
  if (lines.length >= 2) {
    return lines.map((line) => {
      const [days, ...rest] = line.split(" ");
      return { days, hours: rest.join(" ") };
    });
  }
  return [{ days: "Senin - Sabtu", hours: "08.00 - 17.00" }, { days: "Minggu", hours: "09.00 - 14.00" }];
}

export default async function Footer() {
  const s = await getSettings();
  const phoneDisplay = formatPhone(s.wa_phone);
  const hours = parseHours(s.operating_hours);

  return (
    <footer className="border-t border-[#D5E0D3] bg-[#EDF2ED]/50">
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2C4C3B] via-[#ABC1A7] to-[#2C4C3B]" />
        <div className="py-14">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-sm border border-[#ABC1A7]/50 bg-[#1A3626]">
                  <Leaf className="h-5 w-5 text-[#D5E0D3]" strokeWidth={1.5} />
                </div>
                <span className="font-serif text-lg font-bold tracking-tight text-[#1A3626]">Sin Herbal</span>
              </div>
              <p className="mt-4 font-sans text-sm leading-relaxed text-[#5D8356]">
                Distributor resmi produk herbal berkualitas. 100% bahan alami, harga terjangkau.
              </p>
              <div className="flex items-center gap-3">
                <a href={`https://wa.me/${s.wa_phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-sm bg-[#25D366] px-4 py-2 font-sans text-xs font-semibold text-white transition hover:bg-[#1da851]">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Chat WhatsApp
                </a>
                <a href="https://instagram.com/sin_herbal" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-sm border border-[#D5E0D3] bg-white text-[#ABC1A7] transition hover:border-[#ABC1A7] hover:bg-[#D5E0D3] hover:text-[#2C4C3B]" aria-label="Instagram">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.11 2.525c.636-.247 1.363-.416 2.427-.465C8.88 2.013 9.235 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.566.683 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/></svg>
                </a>
                <a href="https://www.youtube.com/@SinHerbal" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-sm border border-[#D5E0D3] bg-white text-[#ABC1A7] transition hover:border-[#ABC1A7] hover:bg-[#D5E0D3] hover:text-[#2C4C3B]" aria-label="YouTube">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-serif font-bold tracking-tight text-[#1A3626]">Menu</h4>
              <ul className="mt-4 space-y-3">
                <li><Link href="/products" className="font-sans text-sm text-[#5D8356] transition hover:text-[#2C4C3B]">Produk</Link></li>
                <li><Link href="/harga" className="font-sans text-sm text-[#5D8356] transition hover:text-[#2C4C3B]">Daftar Harga</Link></li>
                <li><Link href="/journal" className="font-sans text-sm text-[#5D8356] transition hover:text-[#2C4C3B]">Jurnal</Link></li>
                <li><Link href="/lacak-pesanan" className="font-sans text-sm text-[#5D8356] transition hover:text-[#2C4C3B]">Lacak Pesanan</Link></li>
                <li><Link href="/tentang-kami" className="font-sans text-sm text-[#5D8356] transition hover:text-[#2C4C3B]">Tentang Kami</Link></li>
                <li><Link href="/faq" className="font-sans text-sm text-[#5D8356] transition hover:text-[#2C4C3B]">FAQ</Link></li>
                <li><Link href="/kontak" className="font-sans text-sm text-[#5D8356] transition hover:text-[#2C4C3B]">Kontak</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-bold tracking-tight text-[#1A3626]">Kontak</h4>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-2.5 font-sans text-sm text-[#5D8356]">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#2C4C3B]" strokeWidth={1.5} />
                  {s.address}
                </li>
                <li className="flex items-center gap-2.5 font-sans text-sm text-[#5D8356]">
                  <Phone className="h-4 w-4 shrink-0 text-[#2C4C3B]" strokeWidth={1.5} />
                  {phoneDisplay}
                </li>
                <li className="flex items-center gap-2.5 font-sans text-sm text-[#5D8356]">
                  <Mail className="h-4 w-4 shrink-0 text-[#2C4C3B]" strokeWidth={1.5} />
                  {s.email}
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-bold tracking-tight text-[#1A3626]">Jam Operasional</h4>
              <ul className="mt-4 space-y-3">
                {hours.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 font-sans text-sm text-[#5D8356]">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#2C4C3B]" strokeWidth={1.5} />
                    <div>
                      <p>{h.days}</p>
                      <p className="font-semibold text-[#1A3626]">{h.hours}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="rounded-sm border border-[#25D366]/30 bg-[#25D366]/5 p-5 mb-6">
          <div className="text-center">
            <p className="font-sans text-sm font-bold text-[#1A3626]">Butuh Bantuan?</p>
            <p className="mt-1 font-sans text-xs text-[#5D8356]">Tim kami siap membantu Anda kapan saja.</p>
            <div className="mt-3 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
              <a
                href={`https://wa.me/${s.wa_phone}?text=${encodeURIComponent("Halo! Saya butuh bantuan.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-5 py-2.5 font-sans text-xs font-semibold text-white transition hover:bg-[#1da851]"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Chat WhatsApp
              </a>
              <a
                href={`tel:${s.wa_phone}`}
                className="inline-flex items-center gap-2 rounded-sm border border-[#ABC1A7] bg-white px-5 py-2.5 font-sans text-xs font-semibold text-[#2C4C3B] transition hover:bg-[#EDF2ED]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                Telepon {phoneDisplay}
              </a>
            </div>
          </div>
        </div>
        <div className="rounded-sm border border-amber-200 bg-amber-50 p-4 mb-8">
          <div className="flex items-start gap-2.5">
            <svg className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <p className="font-sans text-xs font-medium text-amber-800">
              <strong>PERINGATAN:</strong> Produk ini mengandung nikotin yang sangat adiktif. Dilarang dijual kepada orang di bawah usia 21 tahun. Merokok dapat menyebabkan kanker, impotensi, dan gangguan kehamilan.
            </p>
          </div>
        </div>
        <div className="border-t border-[#D5E0D3] py-6 text-center font-sans text-sm text-[#ABC1A7]">
          &copy; {new Date().getFullYear()} Sin Herbal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
