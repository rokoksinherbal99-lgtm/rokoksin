"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { ChevronLeft, ShoppingBag, Building2, Landmark, MessageCircle } from "lucide-react";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [waPhone, setWaPhone] = useState("6285161835757");
  const [form, setForm] = useState({
    customer: "", email: "", phone: "", address: "", city: "", province: "", postalCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.wa_phone) setWaPhone(data.wa_phone);
      })
      .catch(() => {});
  }, []);

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.customer.trim()) e.customer = "Nama wajib diisi";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email tidak valid";
    if (!/^[0-9]{10,13}$/.test(form.phone)) e.phone = "Nomor HP harus 10-13 digit angka";
    if (!form.address.trim()) e.address = "Alamat wajib diisi";
    if (!form.city.trim()) e.city = "Kota wajib diisi";
    if (!form.province.trim()) e.province = "Provinsi wajib diisi";
    if (!/^[0-9]{5}$/.test(form.postalCode)) e.postalCode = "Kode Pos harus 5 digit angka";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items, total, _website: "", _timestamp: Date.now() }),
      });
      const order = await res.json();
      if (!res.ok) {
        alert(order.error || "Terjadi kesalahan. Silakan coba lagi.");
        return;
      }
      clearCart();
      router.push(`/checkout/success?orderId=${order.id}&total=${total}`);
    } catch {
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-sm border border-[#E0D7C5] bg-[#FDFBF7]">
          <ShoppingBag className="h-10 w-10 text-[#C4B8A2]" strokeWidth={1.5} />
        </div>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-[#2C2416]">Belum Ada yang Dipilih</h1>
        <p className="mt-2 font-sans text-sm text-[#A8987F]">Isi keranjangmu dulu, ya. Kami tunggu.</p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <Link href="/cart" className="btn-primary gap-2 inline-flex">
            Lihat Keranjang
          </Link>
          <a
            href={`https://wa.me/${waPhone}?text=${encodeURIComponent("Halo! Saya ingin pesan produk Sin Herbal.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#25D366] hover:text-[#1da851]"
          >
            <MessageCircle className="h-4 w-4" /> Atau pesan via WhatsApp
          </a>
        </div>
      </div>
    );
  }

  const inputClass = (field: string) =>
    `w-full rounded-sm border px-4 py-3 font-sans text-sm text-[#2C2416] placeholder-[#C4B8A2] transition focus:border-[#2C4C3B] focus:outline-none focus:ring-2 focus:ring-[#D5E0D3] ${errors[field] ? "border-red-400 bg-red-50" : "border-[#E0D7C5]"}`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/cart" className="inline-flex items-center gap-1.5 font-sans text-sm text-[#2C4C3B] transition hover:text-[#1A3626]">
        <ChevronLeft className="h-4 w-4" strokeWidth={1.5} /> Kembali ke Keranjang
      </Link>
      <h1 className="mt-4 font-serif text-2xl font-bold tracking-tight text-[#2C2416]">Checkout</h1>
      <p className="mt-1 font-sans text-sm text-[#5D8356]">Isi data di bawah ini, lalu klik &quot;Pesan&quot;.</p>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Data Diri */}
          <div className="rounded-sm border border-[#E0D7C5] bg-[#FDFBF7] p-5 shadow-sm space-y-4">
            <h2 className="font-serif font-bold tracking-tight text-[#2C2416]">1. Data Diri</h2>

            <div>
              <label className="block font-sans text-xs font-semibold text-[#1A3626] mb-1">Nama Lengkap <span className="text-red-400">*</span></label>
              <input required value={form.customer} onChange={(e) => update("customer", e.target.value)} placeholder="Contoh: Budi Santoso" className={inputClass("customer")} />
              {errors.customer && <p className="mt-1 font-sans text-xs text-red-500">{errors.customer}</p>}
            </div>

            <div>
              <label className="block font-sans text-xs font-semibold text-[#1A3626] mb-1">Email <span className="text-red-400">*</span></label>
              <input required type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="Contoh: budi@gmail.com" className={inputClass("email")} />
              {errors.email && <p className="mt-1 font-sans text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="block font-sans text-xs font-semibold text-[#1A3626] mb-1">No. HP / WhatsApp <span className="text-red-400">*</span></label>
              <input required value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Contoh: 081234567890" className={inputClass("phone")} />
              <p className="mt-1 font-sans text-[11px] text-[#5D8356]">Kami akan menghubungi Anda via WhatsApp</p>
              {errors.phone && <p className="mt-1 font-sans text-xs text-red-500">{errors.phone}</p>}
            </div>
          </div>

          {/* Alamat */}
          <div className="rounded-sm border border-[#E0D7C5] bg-[#FDFBF7] p-5 shadow-sm space-y-4">
            <h2 className="font-serif font-bold tracking-tight text-[#2C2416]">2. Alamat Pengiriman</h2>
            <p className="font-sans text-xs text-[#5D8356]">Lengkapi alamat agar pesanan bisa dikirim dengan lancar.</p>

            <div>
              <label className="block font-sans text-xs font-semibold text-[#1A3626] mb-1">Alamat Lengkap <span className="text-red-400">*</span></label>
              <textarea required value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="Contoh: Jl. Merdeka No. 10, RT 01/RW 02" rows={3} className={inputClass("address")} />
              <p className="mt-1 font-sans text-[11px] text-[#5D8356]">Masukkan nama jalan, nomor rumah, RT/RW</p>
              {errors.address && <p className="mt-1 font-sans text-xs text-red-500">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-sans text-xs font-semibold text-[#1A3626] mb-1">Kota <span className="text-red-400">*</span></label>
                <input required value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Contoh: Depok" className={inputClass("city")} />
                {errors.city && <p className="mt-1 font-sans text-xs text-red-500">{errors.city}</p>}
              </div>
              <div>
                <label className="block font-sans text-xs font-semibold text-[#1A3626] mb-1">Provinsi <span className="text-red-400">*</span></label>
                <input required value={form.province} onChange={(e) => update("province", e.target.value)} placeholder="Contoh: Jawa Barat" className={inputClass("province")} />
                {errors.province && <p className="mt-1 font-sans text-xs text-red-500">{errors.province}</p>}
              </div>
            </div>

            <div>
              <label className="block font-sans text-xs font-semibold text-[#1A3626] mb-1">Kode Pos <span className="text-red-400">*</span></label>
              <input required value={form.postalCode} onChange={(e) => update("postalCode", e.target.value)} placeholder="Contoh: 16411" maxLength={5} className={inputClass("postalCode")} />
              {errors.postalCode && <p className="mt-1 font-sans text-xs text-red-500">{errors.postalCode}</p>}
            </div>
          </div>

          {/* Pembayaran */}
          <div className="rounded-sm border border-[#E0D7C5] bg-[#FDFBF7] p-5 shadow-sm">
            <h2 className="font-serif font-bold tracking-tight text-[#2C2416]">3. Pembayaran</h2>
            <p className="mt-1 font-sans text-xs text-[#5D8356]">Anda akan melakukan transfer setelah pesanan dikonfirmasi via WhatsApp.</p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 rounded-sm border border-[#E0D7C5] bg-[#F0EBE0] p-3.5">
                <Landmark className="h-5 w-5 shrink-0 text-[#2C4C3B]" strokeWidth={1.5} />
                <div>
                  <p className="font-sans text-sm font-semibold text-[#2C2416]">BCA</p>
                  <p className="font-sans text-xs text-[#A8987F]">1234567890 a.n. Sin Herbal</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-sm border border-[#E0D7C5] bg-[#F0EBE0] p-3.5">
                <Building2 className="h-5 w-5 shrink-0 text-[#2C4C3B]" strokeWidth={1.5} />
                <div>
                  <p className="font-sans text-sm font-semibold text-[#2C2416]">Mandiri</p>
                  <p className="font-sans text-xs text-[#A8987F]">9876543210 a.n. Sin Herbal</p>
                </div>
              </div>
            </div>
          </div>

          {/* Yang Terjadi */}
          <div className="rounded-sm border border-[#ABC1A7]/50 bg-[#EDF2ED]/50 p-4">
            <h3 className="font-sans text-sm font-bold text-[#1A3626] mb-2">Yang Terjadi Setelah Pesan:</h3>
            <ol className="space-y-1.5 font-sans text-xs text-[#5D8356] list-decimal list-inside">
              <li>Pesanan Anda masuk ke sistem kami.</li>
              <li>Tim kami menghubungi Anda via WhatsApp untuk konfirmasi.</li>
              <li>Setelah cocok, Anda melakukan transfer sesuai total.</li>
              <li>Kirim bukti transfer via WhatsApp.</li>
              <li>Pesanan dikirim ke alamat Anda.</li>
            </ol>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full gap-2 text-base py-4">
            {loading ? "Memproses..." : `Pesan Sekarang — ${formatPrice(total)}`}
          </button>
        </form>

        <div>
          <div className="rounded-sm border border-[#E0D7C5] bg-[#FDFBF7] p-6 shadow-sm sticky top-24">
            <h2 className="font-serif text-lg font-bold tracking-tight text-[#2C2416]">Ringkasan Pesanan</h2>
            <div className="mt-5 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm bg-[#F0EBE0]">
                    <Image src={item.image} alt={item.name} fill unoptimized sizes="56px" className="object-cover contrast-110" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm font-medium text-[#2C2416] line-clamp-1">{item.name}</p>
                    <p className="font-sans text-xs text-[#C4B8A2]">{item.quantity}x {formatPrice(item.price)}</p>
                  </div>
                  <p className="font-sans text-sm font-bold text-[#2C2416]">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-[#F0EBE0] pt-4">
              {total >= 100000 && (
                <div className="mb-3 rounded-sm border border-[#25D366]/30 bg-[#25D366]/5 px-3 py-2 text-center">
                  <p className="font-sans text-xs font-semibold text-[#25D366]">Gratis ongkir!</p>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="font-sans text-base text-[#A8987F]">Total</span>
                <span className="font-serif text-xl font-bold tracking-tight text-[#1A3626]">{formatPrice(total)}</span>
              </div>
              <p className="mt-2 font-sans text-xs text-[#C4B8A2]">Gratis ongkir ke seluruh Indonesia</p>
            </div>

            <div className="mt-6 rounded-sm bg-[#EDF2ED] p-3 text-center">
              <p className="font-sans text-[11px] text-[#5D8356]">
                Butuh bantuan?{" "}
                <a href={`https://wa.me/${waPhone}?text=${encodeURIComponent("Halo! Saya butuh bantuan saat checkout.")}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#25D366] underline">
                  Chat WhatsApp
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
