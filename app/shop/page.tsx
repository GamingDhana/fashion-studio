"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  ShoppingBag,
  Heart,
  Sparkles,
  SlidersHorizontal,
  X,
  Plus,
  Check,
  ChevronDown,
  Shirt,
  Crown,
  Gem,
  Palette,
} from "lucide-react";

/* ============================================================
   TYPES
============================================================ */

type Category =
  | "All"
  | "Dresses"
  | "Shirts"
  | "Blouses"
  | "Traditional"
  | "Jackets"
  | "Accessories";

type Product = {
  id: number;
  name: string;
  category: Exclude<Category, "All">;
  price: number;
  image: string;
  description: string;
  badge?: string;
};

/* ============================================================
   PRODUCTS
============================================================ */

const products: Product[] = [
  {
    id: 1,
    name: "Midnight Satin Dress",
    category: "Dresses",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
    description:
      "Elegant satin silhouette with a refined evening finish.",
    badge: "New",
  },

  {
    id: 2,
    name: "Minimal Linen Shirt",
    category: "Shirts",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",
    description:
      "Relaxed premium linen shirt designed for everyday wear.",
  },

  {
    id: 3,
    name: "Soft Pearl Blouse",
    category: "Blouses",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
    description:
      "Soft feminine blouse with a clean contemporary silhouette.",
    badge: "Popular",
  },

  {
    id: 4,
    name: "Heritage Saree",
    category: "Traditional",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
    description:
      "Traditional-inspired styling with an elegant modern finish.",
  },

  {
    id: 5,
    name: "Structured Black Jacket",
    category: "Jackets",
    price: 159,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
    description:
      "Sharp structured jacket with a premium tailored shape.",
  },

  {
    id: 6,
    name: "Silk Evening Dress",
    category: "Dresses",
    price: 189,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",
    description:
      "Luxury silk-inspired evening silhouette for special occasions.",
    badge: "Luxury",
  },

  {
    id: 7,
    name: "Classic White Shirt",
    category: "Shirts",
    price: 69,
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
    description:
      "A timeless white shirt with a clean premium finish.",
  },

  {
    id: 8,
    name: "Statement Necklace",
    category: "Accessories",
    price: 49,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85",
    description:
      "Minimal statement jewellery designed to complete your look.",
  },

  {
    id: 9,
    name: "Modern Beige Blouse",
    category: "Blouses",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=900&q=85",
    description:
      "Modern blouse with soft structure and sophisticated detailing.",
  },

  {
    id: 10,
    name: "Classic Tailored Coat",
    category: "Jackets",
    price: 199,
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=900&q=85",
    description:
      "Long tailored coat with a refined luxury appearance.",
    badge: "Premium",
  },

  {
    id: 11,
    name: "Traditional Gold Saree",
    category: "Traditional",
    price: 219,
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=900&q=85",
    description:
      "A statement traditional silhouette with rich visual detailing.",
  },

  {
    id: 12,
    name: "Leather Mini Bag",
    category: "Accessories",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",
    description:
      "Compact everyday bag with a clean luxury aesthetic.",
  },
];

/* ============================================================
   CATEGORIES
============================================================ */

const categories: {
  name: Category;
  icon: React.ReactNode;
}[] = [
  {
    name: "All",
    icon: <Sparkles size={15} />,
  },
  {
    name: "Dresses",
    icon: <Shirt size={15} />,
  },
  {
    name: "Shirts",
    icon: <Shirt size={15} />,
  },
  {
    name: "Blouses",
    icon: <Shirt size={15} />,
  },
  {
    name: "Traditional",
    icon: <Crown size={15} />,
  },
  {
    name: "Jackets",
    icon: <Shirt size={15} />,
  },
  {
    name: "Accessories",
    icon: <Gem size={15} />,
  },
];

/* ============================================================
   MAIN SHOP
============================================================ */

export default function ShopPage() {
  const [category, setCategory] =
    useState<Category>("All");

  const [search, setSearch] =
    useState("");

  const [favorites, setFavorites] =
    useState<number[]>([]);

  const [cart, setCart] =
    useState<number[]>([]);

  const [sort, setSort] =
    useState("Featured");

  const [mobileFilters, setMobileFilters] =
    useState(false);

  /* ==========================================================
     FILTER PRODUCTS
  ========================================================== */

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== "All") {
      result = result.filter(
        (product) =>
          product.category === category
      );
    }

    if (search.trim()) {
      const query =
        search.toLowerCase().trim();

      result = result.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(query) ||
          product.category
            .toLowerCase()
            .includes(query) ||
          product.description
            .toLowerCase()
            .includes(query)
      );
    }

    if (sort === "Price: Low to High") {
      result.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sort === "Price: High to Low") {
      result.sort(
        (a, b) => b.price - a.price
      );
    }

    if (sort === "Newest") {
      result.sort(
        (a, b) => b.id - a.id
      );
    }

    return result;
  }, [category, search, sort]);

  /* ==========================================================
     FAVORITE
  ========================================================== */

  function toggleFavorite(id: number) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter(
            (item) => item !== id
          )
        : [...current, id]
    );
  }

  /* ==========================================================
     CART
  ========================================================== */

  function addToCart(id: number) {
    setCart((current) => [
      ...current,
      id,
    ]);
  }

  /* ==========================================================
     CLEAR SEARCH
  ========================================================== */

  function clearSearch() {
    setSearch("");
  }

  return (
    <main className="min-h-screen bg-[#f7f5f1] text-black">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-50 border-b border-black/[0.08] bg-[#f7f5f1]/90 backdrop-blur-xl">

        <div className="mx-auto flex h-[72px] max-w-[1500px] items-center justify-between px-5 lg:px-10">

          {/* BACK */}

          <Link
            href="/"
            className="group flex items-center gap-2 text-sm font-medium"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white transition group-hover:bg-black group-hover:text-white">
              <ArrowLeft size={16} />
            </span>

            <span className="hidden sm:block">
              Back
            </span>
          </Link>

          {/* LOGO */}

          <Link
            href="/"
            className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">
              <Sparkles size={17} />
            </div>

            <span className="font-semibold tracking-tight">
              Fashion Studio
            </span>
          </Link>

          {/* RIGHT */}

          <div className="flex items-center gap-2">

            <Link
              href="/ai-studio"
              className="hidden rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm font-medium transition hover:bg-black hover:text-white sm:block"
            >
              AI Studio
            </Link>

            <button
              type="button"
              className="relative flex h-11 w-11 items-center justify-center rounded-full bg-black text-white transition hover:scale-105"
            >
              <ShoppingBag size={17} />

              {cart.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[9px] font-bold text-black">
                  {cart.length}
                </span>
              )}
            </button>

          </div>

        </div>

      </header>

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="mx-auto max-w-[1500px] px-5 pb-12 pt-14 lg:px-10 lg:pt-20">

        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium shadow-sm">
              <Sparkles size={13} />
              Curated Fashion Collection
            </div>

            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Designed to be
              <br />
              <span className="text-black/35">
                remembered.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-black/50 sm:text-lg">
              Explore our curated collection of
              contemporary garments, traditional
              pieces and accessories.
            </p>

          </div>

          {/* SEARCH */}

          <div className="w-full lg:max-w-md">

            <div className="relative">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-black/35"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search garments..."
                className="h-14 w-full rounded-full border border-black/10 bg-white pl-12 pr-12 text-sm outline-none transition focus:border-black/30 focus:ring-4 focus:ring-black/5"
              />

              {search && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 transition hover:text-black"
                >
                  <X size={17} />
                </button>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* ======================================================
          CATEGORY NAV
      ====================================================== */}

      <section className="mx-auto max-w-[1500px] px-5 lg:px-10">

        <div className="flex items-center justify-between gap-5">

          <div className="hidden items-center gap-2 overflow-x-auto pb-2 md:flex">

            {categories.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() =>
                  setCategory(item.name)
                }
                className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-xs font-semibold transition ${
                  category === item.name
                    ? "bg-black text-white"
                    : "border border-black/10 bg-white text-black/55 hover:border-black/25 hover:text-black"
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}

          </div>

          {/* MOBILE FILTER */}

          <button
            type="button"
            onClick={() =>
              setMobileFilters(
                !mobileFilters
              )
            }
            className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-xs font-semibold md:hidden"
          >
            <SlidersHorizontal size={15} />
            Categories
          </button>

          {/* SORT */}

          <div className="relative">

            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
              className="appearance-none rounded-full border border-black/10 bg-white py-3 pl-4 pr-10 text-xs font-semibold outline-none"
            >
              <option>
                Featured
              </option>

              <option>
                Newest
              </option>

              <option>
                Price: Low to High
              </option>

              <option>
                Price: High to Low
              </option>
            </select>

            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/40"
            />

          </div>

        </div>

        {/* MOBILE CATEGORIES */}

        {mobileFilters && (
          <div className="mt-4 flex flex-wrap gap-2 md:hidden">

            {categories.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => {
                  setCategory(item.name);
                  setMobileFilters(false);
                }}
                className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold ${
                  category === item.name
                    ? "bg-black text-white"
                    : "border border-black/10 bg-white"
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}

          </div>
        )}

      </section>

      {/* ======================================================
          PRODUCT COUNT
      ====================================================== */}

      <section className="mx-auto max-w-[1500px] px-5 pb-5 pt-10 lg:px-10">

        <div className="flex items-center justify-between">

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/35">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1
              ? "Product"
              : "Products"}
          </p>

          {category !== "All" && (
            <button
              type="button"
              onClick={() =>
                setCategory("All")
              }
              className="text-xs font-medium text-black/45 transition hover:text-black"
            >
              Clear category
            </button>
          )}

        </div>

      </section>

      {/* ======================================================
          PRODUCTS
      ====================================================== */}

      <section className="mx-auto max-w-[1500px] px-5 pb-24 lg:px-10">

        {filteredProducts.length === 0 ? (

          <div className="flex min-h-[400px] items-center justify-center rounded-[28px] border border-black/[0.08] bg-white">

            <div className="max-w-sm px-6 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f4f1eb]">
                <Search size={22} />
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                No products found
              </h2>

              <p className="mt-2 text-sm leading-6 text-black/45">
                Try another search or select a
                different category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-5 rounded-full bg-black px-5 py-3 text-xs font-semibold text-white"
              >
                View all products
              </button>

            </div>

          </div>

        ) : (

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredProducts.map(
              (product) => {

                const isFavorite =
                  favorites.includes(
                    product.id
                  );

                const isInCart =
                  cart.includes(
                    product.id
                  );

                return (
                  <article
                    key={product.id}
                    className="group overflow-hidden rounded-[26px] border border-black/[0.08] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                  >

                    {/* IMAGE */}

                    <div className="relative aspect-[4/5] overflow-hidden bg-[#f1eee8]">

                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />

                      {/* BADGE */}

                      {product.badge && (
                        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider backdrop-blur">
                          {product.badge}
                        </span>
                      )}

                      {/* FAVORITE */}

                      <button
                        type="button"
                        onClick={() =>
                          toggleFavorite(
                            product.id
                          )
                        }
                        className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur transition ${
                          isFavorite
                            ? "bg-black text-white"
                            : "bg-white/90 text-black hover:bg-black hover:text-white"
                        }`}
                      >
                        <Heart
                          size={16}
                          fill={
                            isFavorite
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>

                      {/* QUICK ADD */}

                      <button
                        type="button"
                        onClick={() =>
                          addToCart(
                            product.id
                          )
                        }
                        className={`absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 rounded-full py-3.5 text-xs font-semibold opacity-0 shadow-lg transition duration-300 group-hover:opacity-100 ${
                          isInCart
                            ? "bg-white text-black"
                            : "bg-black text-white"
                        }`}
                      >
                        {isInCart ? (
                          <>
                            <Check size={15} />
                            Added to Bag
                          </>
                        ) : (
                          <>
                            <Plus size={15} />
                            Add to Bag
                          </>
                        )}
                      </button>

                    </div>

                    {/* CONTENT */}

                    <div className="p-5">

                      <div className="flex items-start justify-between gap-4">

                        <div className="min-w-0">

                          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
                            {product.category}
                          </p>

                          <h2 className="mt-2 truncate font-semibold">
                            {product.name}
                          </h2>

                        </div>

                        <p className="shrink-0 font-semibold">
                          ${product.price}
                        </p>

                      </div>

                      <p className="mt-3 line-clamp-2 text-xs leading-5 text-black/45">
                        {product.description}
                      </p>

                      {/* MOBILE ADD */}

                      <button
                        type="button"
                        onClick={() =>
                          addToCart(
                            product.id
                          )
                        }
                        className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full py-3 text-xs font-semibold transition sm:hidden ${
                          isInCart
                            ? "bg-[#f3f0ea] text-black"
                            : "bg-black text-white"
                        }`}
                      >
                        {isInCart ? (
                          <>
                            <Check size={14} />
                            Added
                          </>
                        ) : (
                          <>
                            <ShoppingBag
                              size={14}
                            />
                            Add to Bag
                          </>
                        )}
                      </button>

                    </div>

                  </article>
                );
              }
            )}

          </div>

        )}

      </section>

      {/* ======================================================
          AI BANNER
      ====================================================== */}

      <section className="mx-auto max-w-[1500px] px-5 pb-24 lg:px-10">

        <div className="relative overflow-hidden rounded-[32px] bg-black px-7 py-12 text-white sm:px-12 lg:px-16 lg:py-16">

          <div className="relative z-10 max-w-2xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium backdrop-blur">
              <Sparkles size={13} />
              AI Fashion Studio
            </div>

            <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Don't just shop a
              <br />
              garment. Design one.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
              Have a reference garment you love?
              Upload it to AI Studio and create
              your own customized design.
            </p>

            <Link
              href="/ai-studio"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              <Sparkles size={16} />
              Open AI Studio
            </Link>

          </div>

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />

          <div className="absolute -bottom-32 right-20 h-80 w-80 rounded-full border border-white/10" />

          <div className="absolute right-12 top-12 hidden h-28 w-28 items-center justify-center rounded-[28px] border border-white/10 bg-white/5 lg:flex">
            <Palette size={32} className="text-white/50" />
          </div>

        </div>

      </section>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <footer className="border-t border-black/[0.08]">

        <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-5 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-10">

          <div>

            <div className="flex items-center gap-2">

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
                <Sparkles size={14} />
              </div>

              <span className="font-semibold">
                Fashion Studio
              </span>

            </div>

            <p className="mt-2 text-xs text-black/35">
              Create. Customize. Wear.
            </p>

          </div>

          <div className="flex items-center gap-5 text-xs text-black/45">

            <Link
              href="/"
              className="transition hover:text-black"
            >
              Home
            </Link>

            <Link
              href="/ai-studio"
              className="transition hover:text-black"
            >
              AI Studio
            </Link>

            <Link
              href="/shop"
              className="font-semibold text-black"
            >
              Shop
            </Link>

          </div>

        </div>

      </footer>

    </main>
  );
}