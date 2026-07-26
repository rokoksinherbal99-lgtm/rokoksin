"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyOrderIdButton({ orderId }: { orderId: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="mx-auto mt-6 inline-block rounded-sm border border-[#E0D7C5] bg-[#F0EBE0] px-6 py-3">
      <p className="font-sans text-xs text-[#A8987F]">ID Pesanan</p>
      <p className="font-mono text-sm font-semibold text-[#1A3626]">{orderId}</p>
      <button
        onClick={handleCopy}
        className="mt-2 inline-flex items-center gap-1.5 rounded-sm bg-white px-3 py-1.5 transition hover:bg-[#EDF2ED]"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-[#2C4C3B]" strokeWidth={2} />
        ) : (
          <Copy className="h-3.5 w-3.5 text-[#A8987F]" strokeWidth={1.5} />
        )}
        <span className="font-sans text-xs text-[#A8987F]">{copied ? "Tersalin!" : "Salin ID"}</span>
      </button>
    </div>
  );
}
