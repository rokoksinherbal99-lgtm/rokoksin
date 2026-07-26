"use client";

import { Truck, MapPin, ExternalLink } from "lucide-react";

export default function CekOngkirPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-emerald-50 to-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-200">
            <Truck className="h-8 w-8 text-white" />
          </div>
          <span className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">Cek Ongkir</span>
          <h1 className="mt-3 text-4xl font-bold text-gray-900">Cek Biaya Pengiriman</h1>
          <p className="mt-2 text-gray-500">Cek ongkos kirim via J&T atau Lion Express</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-lg px-4 space-y-6">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
            <p className="text-sm font-semibold text-emerald-800 mb-2">Cara Mengecek Ongkir:</p>
            <ol className="space-y-2 text-sm text-emerald-700">
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">1</span>
                <span>Klik tombol &quot;Cek Tarif&quot; di bawah untuk ke website ekspedisi.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">2</span>
                <span>Masukkan kota asal: <strong>Depok</strong> dan kota tujuan Anda.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white">3</span>
                <span>Lihat hasilnya! Gratis ongkir untuk pembelian minimal Rp100.000.</span>
              </li>
            </ol>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-sm">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Informasi Pengiriman</h2>
                <p className="text-xs text-gray-400">Asal: Depok, Jawa Barat</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-600">
              <div className="rounded-xl bg-blue-50 px-4 py-3">
                <p className="font-semibold text-blue-800">Asal Pengiriman</p>
                <p className="text-blue-600 mt-1">Abadijaya, Sukmajaya, Depok</p>
              </div>

              <a
                href="https://jet.co.id/rates"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:from-red-700 hover:to-red-700 flex items-center justify-center gap-2"
              >
                <ExternalLink className="h-5 w-5" />
                Cek Tarif J&T Express
              </a>

              <a
                href="https://lionelexpress.com/cek-tarif"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:from-blue-700 hover:to-blue-700 flex items-center justify-center gap-2"
              >
                <ExternalLink className="h-5 w-5" />
                Cek Tarif Lion Express
              </a>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-400">
              Butuh bantuan? <a href="https://wa.me/6285161835757?text=Halo!%20Saya%20ingin%20tanya%20ongkos%20kirim." target="_blank" rel="noopener noreferrer" className="font-semibold text-[#25D366] hover:underline">Tanya via WhatsApp</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
