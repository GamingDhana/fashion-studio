"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Heart,
  WandSparkles,
  Camera,
  Star,
  ChevronRight,
} from "lucide-react";

const categories = [
  {
    name: "Dresses",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Tops",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Casual",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Evening",
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85",
  },
];

const features = [
  {
    icon: Camera,
    title: "Upload inspiration",
    text: "Upload a fashion reference and let AI analyze the garment.",
  },
  {
    icon: Sparkles,
    title: "Customize with AI",
    text: "Change only the parts you want while preserving the reference.",
  },
  {
    icon: WandSparkles,
    title: "Create your look",
    text: "Generate your finished fashion concept from your design.",
  },
];

const trending = [
  {
    name: "Soft Denim Dress",
    category: "Everyday",
    price: "$89",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Midnight Evening",
    category: "Evening",
    price: "$129",
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85",
  },
  {
    name: "Modern Blouse",
    category: "New",
    price: "$69",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf9] text-[#211b1d]">
      {/* NAVIGATION */}
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#fffaf9]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#211b1d] text-white transition duration-300 group-hover:rotate-6">
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

          {/* DESKTOP NAVIGATION */}
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
              className="text-sm font-medium transition hover:text-[#b85c78]"
            >
              Shop
            </Link>
          </nav>

          {/* HEADER BUTTONS */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Favorites"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-black/10 transition hover:bg-black hover:text-white sm:flex"
            >
              <Heart size={17} />
            </button>

            <Link
              href="/tailor"
              className="hidden items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-medium transition hover:border-[#b85c78] hover:bg-[#f8e8ed] hover:text-[#8f425d] lg:flex"
            >
              Tailor
            </Link>

            <Link
              href="/ai-studio"
              className="flex items-center gap-2 rounded-full bg-[#211b1d] px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#b85c78]"
            >
              <Sparkles size={15} />
              Create with AI
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-24 lg:pt-16">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dca5b7]/40 bg-[#f8e8ed] px-4 py-2 text-xs font-medium text-[#8f425d]">
              <Sparkles size={14} />
              AI-powered personal fashion
            </div>

            <h1 className="max-w-2xl text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[78px]">
              Your style.
              <br />
              <span className="text-[#b85c78]">Your imagination.</span>
              <br />
              Made real.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-black/55 sm:text-lg">
              Turn your fashion ideas and favorite references into beautiful
              custom designs with AI. Create the outfit you have always wanted
              to wear.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/ai-studio"
                className="group flex items-center justify-center gap-3 rounded-full bg-[#211b1d] px-7 py-4 text-sm font-medium text-white transition hover:-translate-y-1 hover:bg-[#b85c78]"
              >
                Start designing
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/tailor"
                className="flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-7 py-4 text-sm font-medium transition hover:border-[#b85c78] hover:bg-[#f8e8ed] hover:text-[#8f425d]"
              >
                Custom Tailoring
                <ChevronRight size={16} />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-black/45">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="h-7 w-7 rounded-full border-2 border-[#fffaf9] bg-[#e8b6c5]" />
                  <div className="h-7 w-7 rounded-full border-2 border-[#fffaf9] bg-[#c99a83]" />
                  <div className="h-7 w-7 rounded-full border-2 border-[#fffaf9] bg-[#8d6870]" />
                </div>

                <span>Loved by creators</span>
              </div>

              <div className="h-4 w-px bg-black/10" />

              <div className="flex items-center gap-1">
                <Star size={13} fill="currentColor" />
                <span>AI fashion studio</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#f1c6d3]/50 blur-3xl" />

            <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-[#ded0eb]/40 blur-3xl" />

            <div className="relative mx-auto max-w-[590px]">
              <div className="overflow-hidden rounded-[2.5rem] bg-[#eadfe1] shadow-2xl shadow-black/10">
                <img
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=90"
                  alt="Fashion model wearing a modern outfit"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>

              <div className="absolute -bottom-5 left-4 max-w-[260px] rounded-2xl border border-white/60 bg-white/90 p-4 shadow-xl backdrop-blur-xl sm:-left-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8e8ed] text-[#b85c78]">
                    <Sparkles size={17} />
                  </div>

                  <div>
                    <p className="text-xs text-black/45">AI Studio</p>

                    <p className="text-sm font-semibold">
                      Create your look
                    </p>
                  </div>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-black/5">
                  <div className="h-full w-4/5 rounded-full bg-[#b85c78]" />
                </div>
              </div>

              <div className="absolute right-3 top-5 rounded-full border border-white/50 bg-white/90 px-4 py-2 text-xs font-medium shadow-lg backdrop-blur-xl sm:right-[-18px]">
                ✦ Made for you
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY STRIP */}
      <section className="border-y border-black/[0.06] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 overflow-x-auto px-5 py-5 lg:px-8">
          <p className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] text-black/35">
            Explore your style
          </p>

          <div className="flex gap-3">
            {[
              "Dresses",
              "Tops",
              "Casual",
              "Evening",
              "Traditional",
              "Custom",
            ].map((item) => (
              <Link
                key={item}
                href={item === "Custom" ? "/tailor" : "/shop"}
                className="whitespace-nowrap rounded-full border border-black/10 px-5 py-2.5 text-xs font-medium transition hover:border-[#b85c78] hover:bg-[#f8e8ed] hover:text-[#8f425d]"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AI CREATION */}
      <section className="bg-[#211b1d] text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                Your personal AI designer
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                See an idea.
                <br />
                Make it yours.
              </h2>

              <p className="mt-6 max-w-lg text-base leading-7 text-white/55">
                Found a dress online? Have an outfit you love? Upload it as a
                reference and let AI understand its garment type, shape,
                sleeves, neckline, fabric and details.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/ai-studio"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-medium text-[#211b1d] transition hover:-translate-y-1 hover:bg-[#f8e8ed]"
                >
                  Open AI Studio
                  <ArrowRight size={17} />
                </Link>

                <Link
                  href="/tailor"
                  className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-4 text-sm font-medium text-white transition hover:-translate-y-1 hover:bg-white/10"
                >
                  Custom Tailoring
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 transition hover:-translate-y-1 hover:bg-white/[0.09]"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f0c5d1] text-[#211b1d]">
                      <Icon size={19} />
                    </div>

                    <p className="mt-6 text-xs text-white/35">
                      0{index + 1}
                    </p>

                    <h3 className="mt-2 text-sm font-semibold">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-xs leading-5 text-white/45">
                      {feature.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-black/35">
              Find your mood
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Shop by style
            </h2>
          </div>

          <Link
            href="/shop"
            className="hidden items-center gap-2 text-sm font-medium sm:flex"
          >
            View all
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href="/shop"
              className="group relative overflow-hidden rounded-[1.8rem] bg-[#eee5e6]"
            >
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-20">
                <div className="flex items-center justify-between text-white">
                  <h3 className="text-lg font-semibold">{category.name}</h3>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition group-hover:bg-[#f0c5d1]">
                    <ArrowRight size={15} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TRENDING */}
      <section className="bg-[#f5eeec]">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-black/35">
                Curated for you
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Trending now
              </h2>
            </div>

            <Link
              href="/shop"
              className="flex items-center gap-2 text-sm font-medium"
            >
              Shop all
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {trending.map((product) => (
              <div key={product.name} className="group">
                <Link href="/shop">
                  <div className="relative overflow-hidden rounded-[1.8rem] bg-white">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <button
                      type="button"
                      aria-label={`Favorite ${product.name}`}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur transition hover:bg-[#211b1d] hover:text-white"
                    >
                      <Heart size={16} />
                    </button>

                    <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
                      {product.category}
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-1 pt-4">
                    <div>
                      <h3 className="text-sm font-semibold">
                        {product.name}
                      </h3>

                      <p className="mt-1 text-xs text-black/40">
                        Designed for modern wardrobes
                      </p>
                    </div>

                    <p className="text-sm font-semibold">{product.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REFERENCE DESIGN */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="overflow-hidden rounded-[2.5rem] bg-[#e9d9de]">
          <div className="grid items-center lg:grid-cols-2">
            <div className="relative min-h-[500px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1100&q=90"
                alt="Fashion inspiration"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute left-6 top-6 rounded-2xl bg-white/90 p-4 shadow-xl backdrop-blur">
                <div className="flex items-center gap-2">
                  <Camera size={16} />

                  <span className="text-xs font-semibold">Reference</span>
                </div>

                <p className="mt-1 text-[10px] text-black/45">
                  Your inspiration
                </p>
              </div>
            </div>

            <div className="p-8 sm:p-12 lg:p-16">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#211b1d] text-white">
                <ImageIconIcon />
              </div>

              <p className="mt-7 text-xs uppercase tracking-[0.25em] text-black/40">
                Reference-first design
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-tight">
                Love the shape?
                <br />
                Keep the shape.
              </h2>

              <p className="mt-5 text-sm leading-7 text-black/55">
                Our AI workflow starts by analyzing your reference. It
                identifies the garment type and important visual details, then
                shows only the customization options that make sense for that
                garment.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  "Identify the garment",
                  "Analyze the visible details",
                  "Customize only relevant parts",
                  "Lock parts you want unchanged",
                  "Generate the final design",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-semibold">
                      {index + 1}
                    </div>

                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/ai-studio"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#211b1d] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#b85c78]"
                >
                  Try reference design
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/tailor"
                  className="mt-8 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white px-6 py-3.5 text-sm font-medium transition hover:border-[#b85c78] hover:text-[#b85c78]"
                >
                  Tailor a dress
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 pb-20 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#211b1d]">
          <div className="relative px-6 py-20 text-center sm:px-10 lg:py-28">
            <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#b85c78]/20 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f0c5d1] text-[#211b1d]">
                <Sparkles size={22} />
              </div>

              <p className="mt-7 text-xs uppercase tracking-[0.25em] text-white/35">
                Your next outfit starts here
              </p>

              <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
                Stop imagining it.
                <br />
                Start designing it.
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-white/50">
                Upload your favorite reference or simply tell us what you want
                to wear. Your AI fashion studio is ready.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/ai-studio"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#211b1d] transition hover:-translate-y-1 hover:bg-[#f0c5d1]"
                >
                  <WandSparkles size={17} />
                  Create my outfit
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/tailor"
                  className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-white/10"
                >
                  Custom Tailoring
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
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
                A modern AI fashion studio for turning inspiration, imagination
                and personal style into beautiful designs.
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

                <Link
                  href="/shop"
                  className="block text-sm text-black/60 transition hover:text-black"
                >
                  Shop
                </Link>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-black/35">
                Create
              </p>

              <div className="mt-4 space-y-3">
                <Link
                  href="/ai-studio"
                  className="block text-sm text-black/60 transition hover:text-black"
                >
                  Reference Design
                </Link>

                <Link
                  href="/tailor"
                  className="block text-sm text-black/60 transition hover:text-black"
                >
                  Custom Tailoring
                </Link>

                <Link
                  href="/ai-studio"
                  className="block text-sm text-black/60 transition hover:text-black"
                >
                  AI Fashion
                </Link>

                <Link
                  href="/ai-studio"
                  className="block text-sm text-black/60 transition hover:text-black"
                >
                  Mockups
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col justify-between gap-3 border-t border-black/[0.06] pt-6 text-xs text-black/35 sm:flex-row">
            <p>© 2026 Atelier AI. All rights reserved.</p>

            <p>Designed with AI ✦</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ImageIconIcon() {
  return (
    <div className="relative">
      <div className="h-5 w-5 rounded-md border-2 border-white" />
      <div className="absolute bottom-1 left-1 h-2 w-2 rounded-full bg-white" />
    </div>
  );
}