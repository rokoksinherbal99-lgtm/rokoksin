"use client";

import { MessageCircle, X, Send, Bot, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface Msg {
  text: string;
  from: "user" | "bot";
}

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { text: "Halo! Ada yang bisa saya bantu?", from: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight; }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((prev) => [...prev, { text, from: "user" }]);
    setTyping(true);

    try {
      const history = messages.slice(-10).map((m) => ({
        role: m.from === "user" ? "user" as const : "assistant" as const,
        content: m.text,
      }));

      const sessionId = localStorage.getItem("chat_session_id") || crypto.randomUUID();
      if (!localStorage.getItem("chat_session_id")) {
        localStorage.setItem("chat_session_id", sessionId);
      }
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, conversationHistory: history, sessionId }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { text: data.reply || "Maaf, saya tidak bisa menjawab saat ini.", from: "bot" }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { text: "Maaf, terjadi kesalahan. Silakan coba lagi.", from: "bot" },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 md:bottom-8 md:right-8">
      {open && (
        <div className="flex w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-sm border border-[#E4E4E7] bg-white shadow-2xl animate-scale-in">
          <div className="flex items-center justify-between bg-[#18181B] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-[#A1A1AA]/30">
                <Bot className="h-5 w-5 text-[#A1A1AA]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-sans text-sm font-bold text-white">Tanya Sin</p>
                <p className="font-sans text-xs text-[#A1A1AA]/70">Balasan instan</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-sm p-1 transition hover:bg-[#3F3F46]">
              <ChevronDown className="h-5 w-5 text-[#A1A1AA]" strokeWidth={1.5} />
            </button>
          </div>
          <div ref={listRef} className="flex h-80 flex-col gap-2 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-sm px-3.5 py-2.5 font-sans text-sm ${
                  msg.from === "user"
                    ? "bg-[#18181B] text-white"
                    : "border border-[#E4E4E7] bg-white text-[#52525B]"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="rounded-sm border border-[#E4E4E7] bg-white px-3.5 py-2.5 font-sans text-sm text-[#A1A1AA]">
                  <span className="animate-pulse">Mengetik...</span>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 border-t border-[#E4E4E7] p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
              placeholder="Ketik pesan..."
              className="flex-1 rounded-sm border border-[#E4E4E7] px-3.5 py-2 font-sans text-sm outline-none transition focus:border-[#A1A1AA]"
            />
            <button onClick={handleSend} disabled={!input.trim()} className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#18181B] text-white transition hover:bg-[#3F3F46] disabled:opacity-50">
              <Send className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}
      {!open && (
        <div className="hidden md:flex items-center gap-2 rounded-full bg-[#18181B] px-4 py-2.5 shadow-lg shadow-[#3F3F46]/20 transition-all duration-200 hover:bg-[#3F3F46] cursor-pointer" onClick={() => setOpen(true)}>
          <MessageCircle className="h-5 w-5 text-white" strokeWidth={1.5} />
          <span className="font-sans text-sm font-semibold text-white">Tanya Sin</span>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Tutup chat" : "Buka chat"}
        className={`group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#18181B] text-white shadow-lg shadow-[#3F3F46]/30 transition-all duration-200 hover:scale-110 hover:shadow-xl active:scale-95 ${open ? "md:hidden" : "md:hidden"}`}
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#A1A1AA] opacity-75" />
          <span className="relative inline-flex h-4 w-4 rounded-full bg-[#A1A1AA]" />
        </span>
        {open ? <X className="h-6 w-6" strokeWidth={1.5} /> : <MessageCircle className="h-6 w-6" strokeWidth={1.5} />}
      </button>
    </div>
  );
}
