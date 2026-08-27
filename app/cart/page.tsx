import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function CartPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <div className="mx-auto max-w-5xl px-5 py-16">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm"
        >
          <ArrowLeft size={16} />
          Continue shopping
        </Link>

        <div className="mt-14 rounded-[2rem] border border-black/10 bg-white p-10 text-center">
          <ShoppingBag
            size={42}
            strokeWidth={1}
            className="mx-auto text-black/40"
          />

          <h1 className="mt-6 text-3xl font-semibold">
            Your cart is empty
          </h1>

          <p className="mx-auto mt-3 max-w-md text-black/50">
            Add products from the shop or create a custom outfit
            with our AI Design Studio.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white"
            >
              Browse Shop
            </Link>

            <Link
              href="/ai-studio"
              className="rounded-full border border-black/15 px-6 py-3 text-sm font-medium"
            >
              AI Studio
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}