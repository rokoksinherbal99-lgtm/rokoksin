"use client";

interface Props {
  waPhone: string;
}

export default function NewsletterForm({ waPhone }: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const email = new FormData(e.currentTarget).get("email");
        const base = `https://wa.me/${waPhone}`;
        window.open(`${base}?text=${encodeURIComponent(`Halo! Saya ingin berlangganan info produk.\nEmail saya: ${email}`)}`, "_blank");
      }}
      className="mx-auto flex max-w-md gap-2"
    >
      <input
        type="email"
        name="email"
        required
        placeholder="Alamat email Anda"
        className="h-9 flex-1 rounded-md border border-input bg-card px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />
      <button type="submit" className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-all hover:bg-primary/90">
        Berlangganan
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12" /></svg>
      </button>
    </form>
  );
}
