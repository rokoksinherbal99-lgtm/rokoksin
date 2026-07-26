import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { formatPrice } from "@/lib/utils";
import type { Metadata } from "next";
import { Tag, Info } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Daftar Harga",
  description: "Lihat daftar harga lengkap produk Sin Herbal. Harga terjangkau untuk produk herbal berkualitas.",
};

const typeStyles: Record<string, string> = {
  SKT: "bg-amber-50 text-amber-700",
  SKM: "bg-blue-50 text-blue-700",
  Kopi: "bg-teal-50 text-teal-700",
};

const productTypes: Record<string, string> = {
  "Sin Platinum TSI": "SKT",
  "Sin Kujang Mas TSI": "SKT",
  "Sin Provost 19 TSI": "SKT",
  "Sin Sapu Jagat": "SKT",
  "Sin Krakatau": "SKT",
  "Sin New Normal ORG": "SKT",
  "Sin Precision White": "SKT",
  "Sin Precision": "SKT",
  "Sin Sinergi Mind": "SKM",
  "Sin Platinum Filter": "SKM",
  "Sin Sinergi Mind Menthol": "SKM",
  "Sin Trust Menthol": "SKM",
  "Sin Trust": "SKM",
  "Sin Kujang Mas Filter": "SKM",
  "Sin New Normal Mind": "SKM",
  "Sin New Normal Menthol": "SKM",
  "Sin Sinergi Encode": "SKM",
  "Kopi Mana Kopi": "Kopi",
  "Kopi Original": "Kopi",
};

interface CatGroup {
  category: string;
  items: { name: string; type: string; price: number; image: string; slug: string }[];
}

export default async function PriceListPage() {
  const rows = await db.select().from(products).leftJoin(categories, eq(products.categoryId, categories.id)).orderBy(asc(categories.name), asc(products.name));
  const grouped: Record<string, CatGroup> = {};
  for (const r of rows) {
    const catName = r.categories?.name || "Lainnya";
    if (!grouped[catName]) grouped[catName] = { category: catName, items: [] };
    grouped[catName].items.push({ name: r.products.name, type: productTypes[r.products.name] || "-", price: r.products.price, image: r.products.images, slug: r.products.slug });
  }

  return (
    <div>
      <section className="bg-gradient-to-b from-emerald-50 to-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-200">
            <Tag className="h-8 w-8 text-white" />
          </div>
          <span className="inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">Harga</span>
          <h1 className="mt-3 text-4xl font-bold text-gray-900">Daftar Harga</h1>
          <p className="mt-2 text-gray-500">Harga produk Sin Herbal terkini, terjangkau dan bersaing.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 space-y-12">
          {Object.values(grouped).map((group) => (
            <div key={group.category}>
              <h2 className="text-xl font-bold text-gray-900 mb-5">{group.category}</h2>
              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-emerald-50 to-white">
                      <th className="px-5 py-3.5 font-semibold text-gray-700" colSpan={2}>Produk</th>
                      <th className="px-5 py-3.5 font-semibold text-gray-700">Tipe</th>
                      <th className="px-5 py-3.5 font-semibold text-gray-700 text-right">Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.items.map((item, i) => (
                      <tr key={i} className="border-t border-gray-50 transition hover:bg-gray-50/50">
                        <td className="px-5 py-3 w-12">
                          <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-gray-100">
                            <Image src={item.image} alt={item.name} fill unoptimized sizes="40px" className="object-cover" />
                          </div>
                        </td>
                        <td className="py-4 font-medium text-gray-800">
                          <a href={`/products/${item.slug}`} className="transition hover:text-emerald-600 hover:underline">{item.name}</a>
                        </td>
                        <td className="px-5 py-4">
                          {item.type !== "-" ? (
                            <span className={`inline-block rounded-lg px-2.5 py-1 text-xs font-semibold ${typeStyles[item.type] || "bg-gray-100 text-gray-600"}`}>{item.type}</span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-right font-bold text-emerald-600">{formatPrice(item.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Info className="h-5 w-5 text-emerald-500 shrink-0" />
              <p className="text-sm font-semibold text-gray-700">Keterangan Tipe Produk</p>
            </div>
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="inline-block rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">SKT = Sigaret Kretek Tanpa Filter</span>
              <span className="inline-block rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">SKM = Sigaret Kretek Mesin</span>
              <span className="inline-block rounded-lg bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700">Kopi = Minuman Herbal Serbuk</span>
            </div>
            <p className="text-sm text-gray-600">
              Gratis ongkir untuk area tertentu (syarat & ketentuan berlaku). Bonus untuk pembelian grosir. Hubungi kami via WhatsApp untuk info lebih lanjut.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
