"use client";

import { useEffect, useState, createContext, useContext, useCallback, type ReactNode } from "react";
import { CheckCircle, X, AlertCircle } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContext {
  toast: (message: string, type?: ToastType) => void;
  addToast: (message: string, type?: ToastType) => void;
}

const ToastCtx = createContext<ToastContext | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastCtx.Provider value={{ toast: addToast, addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: CheckCircle,
  };
  const Icon = icons[toast.type];
  const colors = {
    success: "bg-[#F4F4F5] border-[#A1A1AA] text-[#18181B]",
    error: "bg-[#F0EDED] border-[#D5C5C5] text-[#8B3A2A]",
    info: "bg-white border-[#E4E4E7] text-[#18181B]",
  };

  return (
    <div className={`flex items-center gap-3 rounded-sm border px-4 py-3 shadow-lg backdrop-blur-sm animate-slide-in-right ${colors[toast.type]}`}>
      <Icon className="h-5 w-5 shrink-0" />
      <p className="text-sm font-medium">{toast.message}</p>
      <button onClick={onClose} className="ml-2 shrink-0 rounded-lg p-1 opacity-60 hover:opacity-100 transition">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
