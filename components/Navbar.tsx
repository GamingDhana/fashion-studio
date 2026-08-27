"use client";

import Link from "next/link";
import {
  ShoppingBag,
  User,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#faf9f7]/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        
        <Link href="/" className="text-2xl font-semibold tracking-tight">
          Loomé
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/shop"
            className="text-sm font-medium transition hover:opacity-60"
          >
            Shop
          </Link>

          <Link
            href="/ai-studio"
            className="flex items-center gap-1.5 text-sm font-medium transition hover:opacity-60"
          >
            <Sparkles size={16} />
            AI Studio
          </Link>

          <Link
            href="/tailor"
            className="text-sm font-medium transition hover:opacity-60"
          >
            Custom Tailoring
          </Link>

          <Link
            href="#how-it-works"
            className="text-sm font-medium transition hover:opacity-60"
          >
            How It Works
          </Link>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link href="/cart" aria-label="Shopping cart">
            <ShoppingBag size={21} />
          </Link>

          <Link href="/account" aria-label="Account">
            <User size={21} />
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          aria-label="Menu"
        >
          {open ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-black/10 bg-[#faf9f7] px-5 py-6 md:hidden">
          <nav className="flex flex-col gap-5">
            <Link href="/shop" onClick={() => setOpen(false)}>
              Shop
            </Link>

            <Link href="/ai-studio" onClick={() => setOpen(false)}>
              AI Studio
            </Link>

            <Link href="/tailor" onClick={() => setOpen(false)}>
              Custom Tailoring
            </Link>

            <Link href="#how-it-works" onClick={() => setOpen(false)}>
              How It Works
            </Link>

            <Link href="/cart" onClick={() => setOpen(false)}>
              Cart
            </Link>

            <Link href="/account" onClick={() => setOpen(false)}>
              Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}