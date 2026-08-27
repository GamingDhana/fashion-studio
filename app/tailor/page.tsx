import Link from "next/link";
import {
  ArrowRight,
  Ruler,
  Scissors,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function TailorPage() {
  return (
    <main>
      <Navbar />

      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.25em] text-black/40">
            Custom Tailoring
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl">
            Made for you.
            <br />
            Literally.
          </h1>

          <p className="mt-6 text-lg leading-8 text-black/55">
            Give us your design, your measurements and your fabric.
            Our tailoring team will turn your approved design into a
            real garment.
          </p>

          <Link
            href="/ai-studio"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-7 py-4 font-medium text-white"
          >
            Design My Outfit
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Sparkles,
              number: "01",
              title: "Create your design",
              description:
                "Use AI to create a new design or start from an inspiration image.",
            },
            {
              icon: Ruler,
              number: "02",
              title: "Give measurements",
              description:
                "Provide the measurements needed for your selected garment.",
            },
            {
              icon: Scissors,
              number: "03",
              title: "We tailor it",
              description:
                "Our tailor uses your approved design and measurements to make it.",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.number}
                className="rounded-[1.5rem] border border-black/10 bg-white p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black/40">
                    {item.number}
                  </span>

                  <Icon size={25} strokeWidth={1.5} />
                </div>

                <h2 className="mt-12 text-2xl font-semibold">
                  {item.title}
                </h2>

                <p className="mt-3 leading-7 text-black/55">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}