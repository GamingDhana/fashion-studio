"use client";

import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Sparkles,
  ShoppingBag,
  Ruler,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Modern Blouse",
    category: "Tops",
    price: 2500,
    description: "Simple and elegant blouse for everyday wear.",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 2,
    name: "Classic Casual Dress",
    category: "Dresses",
    price: 6500,
    description: "Comfortable casual dress with a modern silhouette.",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 3,
    name: "Elegant Evening Dress",
    category: "Evening",
    price: 12900,
    description: "A stylish evening design for special occasions.",
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 4,
    name: "Soft Summer Dress",
    category: "Dresses",
    price: 7900,
    description: "Light and comfortable dress for warm days.",
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 5,
    name: "Everyday Top",
    category: "Tops",
    price: 2900,
    description: "Easy-to-wear top designed for everyday outfits.",
    image:
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 6,
    name: "Traditional Inspired Dress",
    category: "Traditional",
    price: 9500,
    description: "A modern design inspired by traditional fashion.",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 7,
    name: "Simple Office Dress",
    category: "Casual",
    price: 7200,
    description: "Clean and comfortable style for work and everyday use.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 8,
    name: "Premium Party Dress",
    category: "Evening",
    price: 14900,
    description: "Elegant party wear with a refined finish.",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=85",
  },
];

const categories = [
  "All",
  "Dresses",
  "Tops",
  "Casual",
  "Evening",
  "Traditional",
];

function formatLKR(price: number) {
  return `LKR ${price.toLocaleString("en-LK")}`;
}

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#fffaf9] text-[#211b1d]">
      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#fffaf9]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#211b1d] text-white transition group-hover:rotate-6">
              <Sparkles size={18} />
            </div>

            <div>
              <p className="text-lg font-semibold tracking-tight">
                Atelier AI
              </p>

              <p className="text-[10px] uppercase tracking-[0.25em] text-black/40">
                Fashion Studio
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="text-sm font-medium transition hover:text-[#b85c78]"
            >
              Home
            </Link>

            <Link
              href="/ai-studio"
              className="text-sm font-medium transition hover:text-[#b85c78]"
            >
              AI Studio
            </Link>

            <Link
              href="/tailor"
              className="text-sm font-medium transition hover:text-[#b85c78]"
            >
              Tailor
            </Link>

            <Link
              href="/shop"
              className="font-semibold text-[#b85c78]"
            >
              Shop
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/tailor"
              className="hidden h-10 items-center gap-2 rounded-full border border-black/10 px-4 text-xs font-medium transition hover:bg-black hover:text-white sm:flex"
            >
              <Ruler size={15} />
              Custom Tailor
            </Link>

            <Link
              href="/ai-studio"
              className="flex items-center gap-2 rounded-full bg-[#211b1d] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#b85c78]"
            >
              <Sparkles size={15} />
              AI Studio
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="border-b border-black/[0.06] bg-[#f5eeec]">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#dca5b7]/40 bg-[#f8e8ed] px-4 py-2 text-xs font-medium text-[#8f425d]">
              <ShoppingBag size={14} />
              Sri Lankan friendly prices
            </div>

            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Fashion for
              <br />
              <span className="text-[#b85c78]">every budget.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-black/55 sm:text-lg">
              Explore our fashion collection with prices designed to be
              reasonable for the Sri Lankan market. Prices can vary depending
              on fabric, finishing and customization.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tailor"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#211b1d] px-6 py-4 text-sm font-medium text-white transition hover:-translate-y-1 hover:bg-[#b85c78]"
              >
                <Ruler size={17} />
                Make a custom order
              </Link>

              <Link
                href="/ai-studio"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-black/10 bg-white px-6 py-4 text-sm font-medium transition hover:bg-black/[0.03]"
              >
                <Sparkles size={17} />
                Design with AI
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER DISPLAY */}
      <section className="border-b border-black/[0.06] bg-white">
        <div className="mx-auto max-w-7xl overflow-x-auto px-5 py-5 lg:px-8">
          <div className="flex min-w-max gap-3">
            {categories.map((category, index) => (
              <a
                key={category}
                href={
                  index === 0
                    ? "#products"
                    : `#${category.toLowerCase()}`
                }
                className={`rounded-full border px-5 py-2.5 text-xs font-medium transition ${
                  index === 0
                    ? "border-[#211b1d] bg-[#211b1d] text-white"
                    : "border-black/10 hover:border-[#b85c78] hover:bg-[#f8e8ed] hover:text-[#8f425d]"
                }`}
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-black/35">
              Our collection
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Popular styles
            </h2>

            <p className="mt-3 text-sm text-black/45">
              Prices shown in Sri Lankan Rupees (LKR).
            </p>
          </div>

          <div className="rounded-full bg-[#f8e8ed] px-4 py-2 text-xs font-medium text-[#8f425d]">
            100% LKR pricing
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.id}
              id={product.category.toLowerCase()}
              className="group"
            >
              <div className="relative overflow-hidden rounded-[1.8rem] bg-[#eee5e6]">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <button
                  type="button"
                  aria-label={`Favorite ${product.name}`}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition hover:bg-[#211b1d] hover:text-white"
                >
                  <Heart size={16} />
                </button>

                <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
                  {product.category}
                </div>
              </div>

              <div className="pt-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-black/40">
                      {product.description}
                    </p>
                  </div>

                  <p className="whitespace-nowrap text-sm font-semibold text-[#b85c78]">
                    {formatLKR(product.price)}
                  </p>
                </div>

                <Link
                  href="/tailor"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-medium transition hover:text-[#b85c78]"
                >
                  Want this custom made?
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PRICE INFORMATION */}
      <section className="bg-[#211b1d] text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                Simple pricing
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Designed for
                <br />
                real budgets.
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-white/50">
                We want our website to be useful for everyone. Product prices
                are kept at reasonable levels instead of showing unnecessarily
                high prices.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
                <p className="text-xs text-white/35">Blouses</p>
                <p className="mt-3 text-2xl font-semibold">
                  LKR 1,900+
                </p>
                <p className="mt-2 text-xs leading-5 text-white/40">
                  Basic to customized blouse styles.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
                <p className="text-xs text-white/35">Casual dresses</p>
                <p className="mt-3 text-2xl font-semibold">
                  LKR 6,500+
                </p>
                <p className="mt-2 text-xs leading-5 text-white/40">
                  Depends on fabric and design.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
                <p className="text-xs text-white/35">Evening wear</p>
                <p className="mt-3 text-2xl font-semibold">
                  LKR 12,900+
                </p>
                <p className="mt-2 text-xs leading-5 text-white/40">
                  More detailed and premium designs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOM TAILOR CTA */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="rounded-[2.5rem] bg-[#f3e5e9] p-8 sm:p-12 lg:p-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#211b1d] text-white">
                <Ruler size={21} />
              </div>

              <p className="mt-7 text-xs uppercase tracking-[0.25em] text-black/40">
                Custom tailoring
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Have your own design?
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-black/55">
                Upload the front and back reference images, select the dress
                type and enter the required measurements. You can place an
                order without generating an AI image. We will provide a
                reasonable estimated cost and contact you through WhatsApp for
                the exact final price.
              </p>
            </div>

            <Link
              href="/tailor"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#211b1d] px-7 py-4 text-sm font-medium text-white transition hover:-translate-y-1 hover:bg-[#b85c78]"
            >
              Start tailoring
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-black/[0.06] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#211b1d] text-white">
                  <Sparkles size={16} />
                </div>

                <span className="font-semibold">Atelier AI</span>
              </Link>

              <p className="mt-5 max-w-md text-sm leading-6 text-black/45">
                Fashion design, AI inspiration and custom tailoring with
                reasonable Sri Lankan pricing.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-black/35">
                Explore
              </p>

              <div className="mt-4 space-y-3">
                <Link
                  href="/"
                  className="block text-sm text-black/60 transition hover:text-black"
                >
                  Home
                </Link>

                <Link
                  href="/ai-studio"
                  className="block text-sm text-black/60 transition hover:text-black"
                >
                  AI Studio
                </Link>

                <Link
                  href="/tailor"
                  className="block text-sm text-black/60 transition hover:text-black"
                >
                  Tailor
                </Link>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-black/35">
                Shop
              </p>

              <div className="mt-4 space-y-3">
                <a
                  href="#dresses"
                  className="block text-sm text-black/60 transition hover:text-black"
                >
                  Dresses
                </a>

                <a
                  href="#tops"
                  className="block text-sm text-black/60 transition hover:text-black"
                >
                  Tops
                </a>

                <a
                  href="#evening"
                  className="block text-sm text-black/60 transition hover:text-black"
                >
                  Evening
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col justify-between gap-3 border-t border-black/[0.06] pt-6 text-xs text-black/35 sm:flex-row">
            <p>© 2026 Atelier AI. All rights reserved.</p>

            <p>Prices displayed in LKR</p>
          </div>
        </div>
      </footer>
    </main>
  );
}