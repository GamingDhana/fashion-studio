"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  ImagePlus,
  Ruler,
  Sparkles,
  Upload,
  WandSparkles,
} from "lucide-react";

type MeasurementKey =
  | "bust"
  | "waist"
  | "hip"
  | "shoulder"
  | "sleeve"
  | "length"
  | "inseam";

type Measurement = {
  key: MeasurementKey;
  label: string;
  description: string;
  placeholder: string;
};

type DressType = {
  name: string;
  description: string;
  measurements: Measurement[];
};

const measurementData: Record<MeasurementKey, Measurement> = {
  bust: {
    key: "bust",
    label: "Bust",
    description: "Measure around the fullest part of your chest.",
    placeholder: "e.g. 36",
  },
  waist: {
    key: "waist",
    label: "Waist",
    description: "Measure around your natural waist, usually the narrowest part.",
    placeholder: "e.g. 30",
  },
  hip: {
    key: "hip",
    label: "Hip",
    description: "Measure around the fullest part of your hips and seat.",
    placeholder: "e.g. 40",
  },
  shoulder: {
    key: "shoulder",
    label: "Shoulder",
    description: "Measure from one shoulder point to the other.",
    placeholder: "e.g. 15",
  },
  sleeve: {
    key: "sleeve",
    label: "Sleeve",
    description: "Measure from the shoulder point down to your desired sleeve end.",
    placeholder: "e.g. 23",
  },
  length: {
    key: "length",
    label: "Length",
    description: "Measure from the shoulder or waist point to your desired hem.",
    placeholder: "e.g. 40",
  },
  inseam: {
    key: "inseam",
    label: "Inseam",
    description: "Measure from the crotch down to the desired trouser hem.",
    placeholder: "e.g. 30",
  },
};

const dressTypes: DressType[] = [
  {
    name: "T-Shirt",
    description: "Simple everyday top",
    measurements: [
      measurementData.bust,
      measurementData.shoulder,
      measurementData.sleeve,
      measurementData.length,
    ],
  },
  {
    name: "Blouse",
    description: "Fitted or relaxed blouse",
    measurements: [
      measurementData.bust,
      measurementData.waist,
      measurementData.shoulder,
      measurementData.sleeve,
      measurementData.length,
    ],
  },
  {
    name: "Dress",
    description: "One-piece dress",
    measurements: [
      measurementData.bust,
      measurementData.waist,
      measurementData.hip,
      measurementData.shoulder,
      measurementData.sleeve,
      measurementData.length,
    ],
  },
  {
    name: "Skirt",
    description: "Short, midi or maxi skirt",
    measurements: [
      measurementData.waist,
      measurementData.hip,
      measurementData.length,
    ],
  },
  {
    name: "Pants",
    description: "Trousers or fitted pants",
    measurements: [
      measurementData.waist,
      measurementData.hip,
      measurementData.inseam,
      measurementData.length,
    ],
  },
  {
    name: "Traditional",
    description: "Traditional or cultural outfit",
    measurements: [
      measurementData.bust,
      measurementData.waist,
      measurementData.hip,
      measurementData.shoulder,
      measurementData.sleeve,
      measurementData.length,
    ],
  },
];

function MeasurementGuide({
  activeMeasurement,
}: {
  activeMeasurement: MeasurementKey;
}) {
  const is = (key: MeasurementKey) => activeMeasurement === key;

  return (
    <div className="relative mx-auto w-full max-w-[390px] overflow-hidden rounded-[2rem] border border-black/10 bg-[#faf7f6] p-5">
      <div className="mb-4 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/35">
          Measurement guide
        </p>

        <p className="mt-1 text-xs text-black/45">
          Follow the highlighted line
        </p>
      </div>

      <div className="relative mx-auto h-[520px] w-[300px]">
        {/* MODEL HEAD */}
        <div className="absolute left-1/2 top-5 h-16 w-14 -translate-x-1/2 rounded-[45%] border-2 border-[#211b1d]/70 bg-[#ead8d0]" />

        {/* MODEL NECK */}
        <div className="absolute left-1/2 top-[70px] h-10 w-9 -translate-x-1/2 rounded-b-xl bg-[#ead8d0]" />

        {/* BODY */}
        <div
          className={`absolute left-1/2 top-[88px] h-[250px] w-[145px] -translate-x-1/2 rounded-[45%_45%_20%_20%] border-2 border-[#211b1d]/70 transition ${
            ["bust", "waist", "hip", "length"].includes(activeMeasurement)
              ? "bg-[#f0c5d1]"
              : "bg-[#e8dfe1]"
          }`}
        />

        {/* LEFT ARM */}
        <div className="absolute left-[58px] top-[100px] h-[225px] w-9 -rotate-[8deg] rounded-full border-2 border-[#211b1d]/60 bg-[#ead8d0]" />

        {/* RIGHT ARM */}
        <div className="absolute right-[58px] top-[100px] h-[225px] w-9 rotate-[8deg] rounded-full border-2 border-[#211b1d]/60 bg-[#ead8d0]" />

        {/* LEFT LEG */}
        <div className="absolute left-[105px] top-[320px] h-[175px] w-[45px] rounded-b-3xl border-2 border-[#211b1d]/60 bg-[#ead8d0]" />

        {/* RIGHT LEG */}
        <div className="absolute right-[105px] top-[320px] h-[175px] w-[45px] rounded-b-3xl border-2 border-[#211b1d]/60 bg-[#ead8d0]" />

        {/* BUST GUIDE */}
        <div
          className={`absolute left-[37px] top-[145px] flex w-[226px] items-center transition-all ${
            is("bust") ? "opacity-100" : "opacity-25"
          }`}
        >
          <div className="h-px flex-1 border-t-2 border-dashed border-[#b85c78]" />
          <span className="mx-2 rounded-full bg-[#b85c78] px-2 py-1 text-[9px] font-bold text-white">
            BUST
          </span>
          <div className="h-px flex-1 border-t-2 border-dashed border-[#b85c78]" />
        </div>

        {/* WAIST GUIDE */}
        <div
          className={`absolute left-[50px] top-[205px] flex w-[200px] items-center transition-all ${
            is("waist") ? "opacity-100" : "opacity-25"
          }`}
        >
          <div className="h-px flex-1 border-t-2 border-dashed border-[#b85c78]" />
          <span className="mx-2 rounded-full bg-[#b85c78] px-2 py-1 text-[9px] font-bold text-white">
            WAIST
          </span>
          <div className="h-px flex-1 border-t-2 border-dashed border-[#b85c78]" />
        </div>

        {/* HIP GUIDE */}
        <div
          className={`absolute left-[35px] top-[255px] flex w-[230px] items-center transition-all ${
            is("hip") ? "opacity-100" : "opacity-25"
          }`}
        >
          <div className="h-px flex-1 border-t-2 border-dashed border-[#b85c78]" />
          <span className="mx-2 rounded-full bg-[#b85c78] px-2 py-1 text-[9px] font-bold text-white">
            HIP
          </span>
          <div className="h-px flex-1 border-t-2 border-dashed border-[#b85c78]" />
        </div>

        {/* SHOULDER GUIDE */}
        <div
          className={`absolute left-[52px] top-[108px] flex w-[196px] items-center transition-all ${
            is("shoulder") ? "opacity-100" : "opacity-25"
          }`}
        >
          <div className="h-px flex-1 border-t-2 border-dashed border-[#b85c78]" />
          <span className="mx-2 rounded-full bg-[#b85c78] px-2 py-1 text-[9px] font-bold text-white">
            SHOULDER
          </span>
          <div className="h-px flex-1 border-t-2 border-dashed border-[#b85c78]" />
        </div>

        {/* SLEEVE GUIDE */}
        <div
          className={`absolute right-[3px] top-[160px] flex w-[110px] rotate-[80deg] items-center transition-all ${
            is("sleeve") ? "opacity-100" : "opacity-25"
          }`}
        >
          <div className="h-px flex-1 border-t-2 border-dashed border-[#b85c78]" />
          <span className="mx-2 -rotate-[80deg] whitespace-nowrap rounded-full bg-[#b85c78] px-2 py-1 text-[9px] font-bold text-white">
            SLEEVE
          </span>
        </div>

        {/* LENGTH GUIDE */}
        <div
          className={`absolute right-[20px] top-[105px] h-[230px] transition-all ${
            is("length") ? "opacity-100" : "opacity-25"
          }`}
        >
          <div className="absolute left-1/2 h-full -translate-x-1/2 border-l-2 border-dashed border-[#b85c78]" />

          <span className="absolute left-2 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#b85c78] px-2 py-1 text-[9px] font-bold text-white">
            LENGTH
          </span>
        </div>

        {/* INSEAM GUIDE */}
        <div
          className={`absolute bottom-[25px] left-[118px] h-[150px] transition-all ${
            is("inseam") ? "opacity-100" : "opacity-25"
          }`}
        >
          <div className="absolute left-1/2 h-full -translate-x-1/2 border-l-2 border-dashed border-[#b85c78]" />

          <span className="absolute left-2 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#b85c78] px-2 py-1 text-[9px] font-bold text-white">
            INSEAM
          </span>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4">
        <p className="text-xs font-semibold">
          {measurementData[activeMeasurement].label}
        </p>

        <p className="mt-1 text-xs leading-5 text-black/50">
          {measurementData[activeMeasurement].description}
        </p>
      </div>
    </div>
  );
}

export default function TailorPage() {
  const [dressType, setDressType] = useState("Dress");
  const [activeMeasurement, setActiveMeasurement] =
    useState<MeasurementKey>("bust");

  const [measurements, setMeasurements] = useState<
    Partial<Record<MeasurementKey, string>>
  >({});

  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);

  const [prompt, setPrompt] = useState("");

  const selectedDress = useMemo(
    () => dressTypes.find((item) => item.name === dressType) ?? dressTypes[2],
    [dressType]
  );

  function changeDressType(type: string) {
    setDressType(type);

    const selected = dressTypes.find((item) => item.name === type);

    if (selected && selected.measurements.length > 0) {
      setActiveMeasurement(selected.measurements[0].key);
    }

    setMeasurements({});
  }

  function updateMeasurement(
    key: MeasurementKey,
    value: string
  ) {
    setMeasurements((current) => ({
      ...current,
      [key]: value,
    }));
  }

  return (
    <main className="min-h-screen bg-[#fffaf9] text-[#211b1d]">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#fffaf9]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#211b1d] text-white">
              <Sparkles size={18} />
            </div>

            <div>
              <p className="font-semibold">Atelier AI</p>
              <p className="text-[9px] uppercase tracking-[0.25em] text-black/35">
                Fashion Studio
              </p>
            </div>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 text-xs font-medium transition hover:bg-black hover:text-white"
          >
            <ArrowLeft size={14} />
            Home
          </Link>
        </div>
      </header>

      {/* INTRO */}
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-12 lg:px-8 lg:pt-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#dca5b7]/40 bg-[#f8e8ed] px-4 py-2 text-xs font-medium text-[#8f425d]">
            <Ruler size={14} />
            Custom tailoring
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
            Create a garment
            <br />
            <span className="text-[#b85c78]">made for you.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-black/50 sm:text-base">
            Select your garment type, enter only the measurements that matter,
            upload front and back references, and create your personalized
            fashion mockup.
          </p>
        </div>
      </section>

      {/* STEP 1 */}
      <section className="mx-auto max-w-7xl px-5 pb-10 lg:px-8">
        <div className="rounded-[2rem] border border-black/[0.07] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#211b1d] text-sm font-bold text-white">
              1
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                Garment
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                What do you want to make?
              </h2>
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {dressTypes.map((type) => {
              const selected = type.name === dressType;

              return (
                <button
                  key={type.name}
                  type="button"
                  onClick={() => changeDressType(type.name)}
                  className={`group rounded-2xl border p-5 text-left transition ${
                    selected
                      ? "border-[#b85c78] bg-[#f8e8ed]"
                      : "border-black/10 bg-white hover:border-black/20 hover:bg-black/[0.02]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">
                        {type.name}
                      </p>

                      <p className="mt-1 text-xs text-black/40">
                        {type.description}
                      </p>
                    </div>

                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        selected
                          ? "bg-[#b85c78] text-white"
                          : "bg-black/5 text-black/30"
                      }`}
                    >
                      {selected ? (
                        <Check size={15} />
                      ) : (
                        <ArrowRight size={14} />
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {type.measurements.map((measurement) => (
                      <span
                        key={measurement.key}
                        className="rounded-full bg-black/5 px-2.5 py-1 text-[9px] font-medium text-black/45"
                      >
                        {measurement.label}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* STEP 2 */}
      <section className="mx-auto max-w-7xl px-5 pb-10 lg:px-8">
        <div className="rounded-[2rem] border border-black/[0.07] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#211b1d] text-sm font-bold text-white">
              2
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                Measurements
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                Your {selectedDress.name} measurements
              </h2>

              <p className="mt-2 text-xs leading-5 text-black/40">
                Only measurements needed for this garment are shown.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_390px]">
            {/* MEASUREMENT INPUTS */}
            <div>
              <div className="flex flex-wrap gap-2">
                {selectedDress.measurements.map((measurement) => {
                  const selected =
                    activeMeasurement === measurement.key;

                  return (
                    <button
                      key={measurement.key}
                      type="button"
                      onClick={() =>
                        setActiveMeasurement(measurement.key)
                      }
                      className={`rounded-full px-4 py-2.5 text-xs font-semibold transition ${
                        selected
                          ? "bg-[#211b1d] text-white"
                          : "border border-black/10 bg-white text-black/55 hover:border-black/20"
                      }`}
                    >
                      {measurement.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {selectedDress.measurements.map((measurement) => {
                  const selected =
                    activeMeasurement === measurement.key;

                  return (
                    <div
                      key={measurement.key}
                      className={`rounded-2xl border p-4 transition ${
                        selected
                          ? "border-[#b85c78] bg-[#fff7f9]"
                          : "border-black/10 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold">
                          {measurement.label}
                        </label>

                        {selected && (
                          <span className="rounded-full bg-[#f8e8ed] px-2 py-1 text-[9px] font-semibold text-[#8f425d]">
                            Guide shown
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-[11px] leading-5 text-black/40">
                        {measurement.description}
                      </p>

                      <div className="mt-3 flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={measurements[measurement.key] ?? ""}
                          onFocus={() =>
                            setActiveMeasurement(measurement.key)
                          }
                          onChange={(event) =>
                            updateMeasurement(
                              measurement.key,
                              event.target.value
                            )
                          }
                          placeholder={measurement.placeholder}
                          className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#b85c78] focus:ring-2 focus:ring-[#b85c78]/10"
                        />

                        <span className="rounded-xl bg-black/5 px-3 py-3 text-xs font-semibold text-black/40">
                          cm
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl bg-[#f7f2f0] p-4">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                    <Ruler size={16} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold">
                      How to measure
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-black/45">
                      Keep the measuring tape comfortably against your body.
                      Do not pull it too tight. Measurements should be taken
                      while standing naturally.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* GUIDE */}
            <MeasurementGuide
              activeMeasurement={activeMeasurement}
            />
          </div>
        </div>
      </section>

      {/* STEP 3 */}
      <section className="mx-auto max-w-7xl px-5 pb-10 lg:px-8">
        <div className="rounded-[2rem] border border-black/[0.07] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#211b1d] text-sm font-bold text-white">
              3
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                References
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                Upload the garment reference
              </h2>

              <p className="mt-2 text-xs leading-5 text-black/40">
                Upload both front and back images when available. The AI will
                use them to understand the garment construction and details.
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {/* FRONT */}
            <label className="group cursor-pointer">
              <div
                className={`relative flex min-h-[280px] flex-col items-center justify-center overflow-hidden rounded-[1.7rem] border-2 border-dashed transition ${
                  frontImage
                    ? "border-[#b85c78] bg-[#fff7f9]"
                    : "border-black/10 bg-[#faf8f7] hover:border-[#b85c78]/50 hover:bg-[#fff7f9]"
                }`}
              >
                {frontImage ? (
                  <div className="p-6 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f8e8ed] text-[#b85c78]">
                      <Check size={24} />
                    </div>

                    <p className="mt-4 text-sm font-semibold">
                      Front image selected
                    </p>

                    <p className="mt-1 max-w-[240px] truncate text-xs text-black/40">
                      {frontImage.name}
                    </p>

                    <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-[#b85c78]">
                      Click to replace
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                      <Camera size={22} />
                    </div>

                    <p className="mt-4 text-sm font-semibold">
                      Front reference
                    </p>

                    <p className="mt-1 text-xs text-black/40">
                      Upload front view
                    </p>

                    <span className="mt-4 flex items-center gap-2 rounded-full bg-[#211b1d] px-4 py-2 text-[10px] font-semibold text-white">
                      <Upload size={12} />
                      Choose image
                    </span>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) =>
                    setFrontImage(event.target.files?.[0] ?? null)
                  }
                />
              </div>
            </label>

            {/* BACK */}
            <label className="group cursor-pointer">
              <div
                className={`relative flex min-h-[280px] flex-col items-center justify-center overflow-hidden rounded-[1.7rem] border-2 border-dashed transition ${
                  backImage
                    ? "border-[#b85c78] bg-[#fff7f9]"
                    : "border-black/10 bg-[#faf8f7] hover:border-[#b85c78]/50 hover:bg-[#fff7f9]"
                }`}
              >
                {backImage ? (
                  <div className="p-6 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f8e8ed] text-[#b85c78]">
                      <Check size={24} />
                    </div>

                    <p className="mt-4 text-sm font-semibold">
                      Back image selected
                    </p>

                    <p className="mt-1 max-w-[240px] truncate text-xs text-black/40">
                      {backImage.name}
                    </p>

                    <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-[#b85c78]">
                      Click to replace
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                      <ImagePlus size={22} />
                    </div>

                    <p className="mt-4 text-sm font-semibold">
                      Back reference
                    </p>

                    <p className="mt-1 text-xs text-black/40">
                      Upload back view
                    </p>

                    <span className="mt-4 flex items-center gap-2 rounded-full bg-[#211b1d] px-4 py-2 text-[10px] font-semibold text-white">
                      <Upload size={12} />
                      Choose image
                    </span>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) =>
                    setBackImage(event.target.files?.[0] ?? null)
                  }
                />
              </div>
            </label>
          </div>

          <div className="mt-5 flex items-center gap-2 text-[11px] text-black/40">
            <ImagePlus size={14} />
            PNG, JPG or WEBP images are recommended.
          </div>
        </div>
      </section>

      {/* STEP 4 */}
      <section className="mx-auto max-w-7xl px-5 pb-12 lg:px-8">
        <div className="rounded-[2rem] border border-black/[0.07] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#211b1d] text-sm font-bold text-white">
              4
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                Design instructions
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                Tell AI what you want
              </h2>

              <p className="mt-2 text-xs leading-5 text-black/40">
                You can describe changes you want, or leave this empty and let
                the reference guide the design.
              </p>
            </div>
          </div>

          <div className="mt-7">
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder={`Example: Keep the same dress shape and neckline. Change the fabric to dark blue silk and make the sleeves slightly longer.`}
              rows={6}
              className="w-full resize-none rounded-2xl border border-black/10 bg-[#faf8f7] px-5 py-4 text-sm leading-6 outline-none transition placeholder:text-black/25 focus:border-[#b85c78] focus:bg-white focus:ring-2 focus:ring-[#b85c78]/10"
            />

            <div className="mt-3 flex items-center gap-2 text-[11px] text-black/35">
              <Sparkles size={13} />
              The reference image and your prompt can work together.
            </div>
          </div>
        </div>
      </section>

      {/* GENERATE */}
      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8 lg:pb-28">
        <div className="overflow-hidden rounded-[2.5rem] bg-[#211b1d] text-white">
          <div className="relative px-6 py-14 text-center sm:px-10 lg:py-20">
            <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#b85c78]/20 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f0c5d1] text-[#211b1d]">
                <WandSparkles size={23} />
              </div>

              <p className="mt-6 text-[10px] uppercase tracking-[0.25em] text-white/35">
                Ready to create
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
                Generate your {selectedDress.name.toLowerCase()} mockup.
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/50">
                Your selected measurements, reference images and design
                instructions will be used to create a personalized fashion
                concept.
              </p>

              <div className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-2">
                <span className="rounded-full bg-white/10 px-4 py-2 text-[10px] text-white/60">
                  {selectedDress.name}
                </span>

                <span className="rounded-full bg-white/10 px-4 py-2 text-[10px] text-white/60">
                  {selectedDress.measurements.length} measurements
                </span>

                {frontImage && (
                  <span className="rounded-full bg-white/10 px-4 py-2 text-[10px] text-white/60">
                    Front reference
                  </span>
                )}

                {backImage && (
                  <span className="rounded-full bg-white/10 px-4 py-2 text-[10px] text-white/60">
                    Back reference
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  console.log({
                    dressType,
                    measurements,
                    frontImage,
                    backImage,
                    prompt,
                  });

                  alert(
                    "Your design information is ready. Connect this button to your AI image-generation API."
                  );
                }}
                className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#211b1d] transition hover:-translate-y-1 hover:bg-[#f0c5d1]"
              >
                <WandSparkles size={17} />
                Generate mockup
                <ArrowRight size={16} />
              </button>

              <p className="mt-4 text-[10px] text-white/30">
                AI generation will create the clothing mockup separately from
                the measurement guide.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}