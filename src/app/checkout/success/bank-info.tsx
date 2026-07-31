"use client";

import { Landmark, Building2, MessageCircle, Check } from "lucide-react";
import { useState } from "react";

const WA_PHONE = process.env.NEXT_PUBLIC_WA_PHONE || "6285161835757";

const BANKS = [
  { name: "BCA", account: "1234567890", icon: Landmark },
  { name: "Mandiri", account: "9876543210", icon: Building2 },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {}
      }}
      className="ml-2 shrink-0 rounded-sm p-1 transition hover:bg-[#F4F4F5]"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-[#3F3F46]" strokeWidth={2} /> : <span className="font-sans text-[10px] text-[#A1A1AA]">Salin</span>}
    </button>
  );
}

export function BankInfo({ orderId, total }: { orderId: string; total: string }) {
  const waMsg = `Halo Sin Herbal! Saya sudah transfer untuk pesanan:\n\n🆔 Order ID: ${orderId}\n💰 Total: Rp ${parseInt(total || "0").toLocaleString("id-ID")}\n\nBerikut bukti transfernya:`;

  return (
    <div className="mx-auto mt-6 max-w-sm rounded-sm border border-[#E4E4E7] bg-[#FFFFFF] p-5 shadow-sm text-left">
      <h3 className="font-serif font-bold tracking-tight text-[#18181B]">Transfer Pembayaran</h3>
      <p className="mt-1 font-sans text-xs text-[#A1A1AA]">Transfer sejumlah <strong className="text-[#18181B]">Rp {parseInt(total || "0").toLocaleString("id-ID")}</strong> ke salah satu rekening berikut:</p>

      <div className="mt-4 space-y-3">
        {BANKS.map((bank) => (
          <div key={bank.name} className="flex items-center justify-between rounded-sm border border-[#E4E4E7] bg-[#FAFAFA] p-3">
            <div className="flex items-center gap-3">
              <bank.icon className="h-5 w-5 text-[#3F3F46]" strokeWidth={1.5} />
              <div>
                <p className="font-sans text-sm font-semibold text-[#18181B]">{bank.name}</p>
                <p className="font-mono text-sm text-[#18181B]">{bank.account}</p>
                <p className="font-sans text-[10px] text-[#A1A1AA]">a.n. Sin Herbal</p>
              </div>
            </div>
            <CopyButton text={bank.account} />
          </div>
        ))}
      </div>

      <a
        href={`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(waMsg)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[#25D366] px-4 py-3 font-sans text-sm font-semibold text-white transition hover:bg-[#1da851]"
      >
        <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
        Konfirmasi Pembayaran via WA
      </a>
      <p className="mt-2 font-sans text-[10px] text-[#A1A1AA] text-center">Kirim bukti transfer setelah melakukan pembayaran</p>
    </div>
  );
}
