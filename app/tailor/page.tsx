"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Image as ImageIcon,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
  Sparkles,
  User,
  X,
} from "lucide-react";
import Link from "next/link";

type DressType = "blouse" | "dress" | "skirt" | "trouser" | "shirt";

type MeasurementField = {
  key: string;
  label: string;
  description: string;
  unit: string;
};

type Measurements = Record<string, string>;

const dressTypes: {
  id: DressType;
  name: string;
  description: string;
}[] = [
  {
    id: "blouse",
    name: "Blouse",
    description: "Custom blouse with your own reference design.",
  },
  {
    id: "dress",
    name: "Dress",
    description: "Custom dress made according to your measurements.",
  },
  {
    id: "skirt",
    name: "Skirt",
    description: "Custom skirt with your preferred style.",
  },
  {
    id: "trouser",
    name: "Trouser",
    description: "Custom trousers made to your measurements.",
  },
  {
    id: "shirt",
    name: "Shirt",
    description: "Custom shirt with your preferred design.",
  },
];

const measurementFields: Record<DressType, MeasurementField[]> = {
  blouse: [
    {
      key: "bust",
      label: "Bust",
      description: "Measure around the fullest part of your bust.",
      unit: "in",
    },
    {
      key: "waist",
      label: "Waist",
      description: "Measure around your natural waist.",
      unit: "in",
    },
    {
      key: "shoulder",
      label: "Shoulder",
      description: "Measure from one shoulder point to the other.",
      unit: "in",
    },
    {
      key: "blouseLength",
      label: "Blouse Length",
      description: "From the shoulder down to your desired blouse length.",
      unit: "in",
    },
    {
      key: "sleeveLength",
      label: "Sleeve Length",
      description: "Measure from the shoulder to the desired sleeve end.",
      unit: "in",
    },
    {
      key: "armhole",
      label: "Armhole",
      description: "Measure around the armhole area.",
      unit: "in",
    },
  ],

  dress: [
    {
      key: "bust",
      label: "Bust",
      description: "Measure around the fullest part of your bust.",
      unit: "in",
    },
    {
      key: "waist",
      label: "Waist",
      description: "Measure around your natural waist.",
      unit: "in",
    },
    {
      key: "hip",
      label: "Hip",
      description: "Measure around the fullest part of your hips.",
      unit: "in",
    },
    {
      key: "shoulder",
      label: "Shoulder",
      description: "Measure across your shoulders.",
      unit: "in",
    },
    {
      key: "dressLength",
      label: "Dress Length",
      description: "From shoulder to your desired dress length.",
      unit: "in",
    },
    {
      key: "sleeveLength",
      label: "Sleeve Length",
      description: "Measure from shoulder to sleeve end.",
      unit: "in",
    },
  ],

  skirt: [
    {
      key: "waist",
      label: "Waist",
      description: "Measure around your natural waist.",
      unit: "in",
    },
    {
      key: "hip",
      label: "Hip",
      description: "Measure around the fullest part of your hips.",
      unit: "in",
    },
    {
      key: "skirtLength",
      label: "Skirt Length",
      description: "From your waist to your desired skirt length.",
      unit: "in",
    },
  ],

  trouser: [
    {
      key: "waist",
      label: "Waist",
      description: "Measure around your natural waist.",
      unit: "in",
    },
    {
      key: "hip",
      label: "Hip",
      description: "Measure around the fullest part of your hips.",
      unit: "in",
    },
    {
      key: "thigh",
      label: "Thigh",
      description: "Measure around the fullest part of your thigh.",
      unit: "in",
    },
    {
      key: "inseam",
      label: "Inseam",
      description: "Measure from crotch to desired trouser length.",
      unit: "in",
    },
    {
      key: "trouserLength",
      label: "Trouser Length",
      description: "Measure from waist to desired trouser length.",
      unit: "in",
    },
  ],

  shirt: [
    {
      key: "chest",
      label: "Chest",
      description: "Measure around the fullest part of your chest.",
      unit: "in",
    },
    {
      key: "waist",
      label: "Waist",
      description: "Measure around your waist.",
      unit: "in",
    },
    {
      key: "shoulder",
      label: "Shoulder",
      description: "Measure across your shoulders.",
      unit: "in",
    },
    {
      key: "shirtLength",
      label: "Shirt Length",
      description: "From shoulder to desired shirt length.",
      unit: "in",
    },
    {
      key: "sleeveLength",
      label: "Sleeve Length",
      description: "From shoulder to sleeve end.",
      unit: "in",
    },
  ],
};

const MAX_IMAGE_SIZE = 8 * 1024 * 1024;

function formatPrice(value: number) {
  return `Rs. ${value.toLocaleString("en-LK")}`;
}

export default function TailorPage() {
  const [dressType, setDressType] = useState<DressType>("blouse");

  const [measurements, setMeasurements] = useState<Measurements>({});

  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);

  const [customerName, setCustomerName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const currentMeasurements = measurementFields[dressType];

  const selectedDress = dressTypes.find((item) => item.id === dressType);

  /*
   * PRICE ESTIMATION
   *
   * Blouse:
   * Normal expected Sri Lankan customer range:
   * Rs. 1,900 - Rs. 2,500
   *
   * We intentionally do NOT expose internal petrol/material sourcing
   * calculations to the customer.
   */
  const estimate = useMemo(() => {
    if (dressType === "blouse") {
      let low = 1900;
      let high = 2500;

      const filledMeasurements = Object.values(measurements).filter(
        (value) => value.trim() !== ""
      ).length;

      if (filledMeasurements >= 5) {
        low += 0;
        high += 0;
      }

      if (frontImage && backImage) {
        low += 0;
        high += 0;
      }

      return {
        low,
        high,
      };
    }

    if (dressType === "dress") {
      return {
        low: 3000,
        high: 5500,
      };
    }

    if (dressType === "skirt") {
      return {
        low: 1800,
        high: 3200,
      };
    }

    if (dressType === "trouser") {
      return {
        low: 2200,
        high: 3800,
      };
    }

    return {
      low: 2200,
      high: 4000,
    };
  }, [dressType, measurements, frontImage, backImage]);

  function handleDressTypeChange(type: DressType) {
    setDressType(type);
    setMeasurements({});
    setError("");
  }

  function handleMeasurementChange(key: string, value: string) {
    const cleanValue = value.replace(/[^0-9.]/g, "");

    setMeasurements((previous) => ({
      ...previous,
      [key]: cleanValue,
    }));
  }

  function readImage(
    file: File,
    setter: (value: string) => void
  ): void {
    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("Image must be smaller than 8MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setter(reader.result);
      } else {
        setError("Unable to read the selected image.");
      }
    };

    reader.onerror = () => {
      setError("Unable to read the selected image.");
    };

    reader.readAsDataURL(file);
  }

  function handleFrontImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    readImage(file, setFrontImage);
    event.target.value = "";
  }

  function handleBackImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    readImage(file, setBackImage);
    event.target.value = "";
  }

  function removeFrontImage() {
    setFrontImage(null);
  }

  function removeBackImage() {
    setBackImage(null);
  }

  function validateForm() {
    if (!customerName.trim()) {
      return "Please enter your name.";
    }

    if (!whatsapp.trim()) {
      return "Please enter your WhatsApp number.";
    }

    if (!address.trim()) {
      return "Please enter your address.";
    }

    const missingMeasurement = currentMeasurements.some(
      (field) => !measurements[field.key]?.trim()
    );

    if (missingMeasurement) {
      return "Please complete all required measurements.";
    }

    if (!frontImage) {
      return "Please upload the front reference image.";
    }

    if (!backImage) {
      return "Please upload the back reference image.";
    }

    return "";
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);

    try {
      /*
       * If you later create an order API, this is where the order data
       * can be sent to your database.
       *
       * The page currently completes the customer-facing order flow
       * without requiring another API route.
       */

      const order = {
        dressType,
        measurements,
        frontImage,
        backImage,
        customerName: customerName.trim(),
        whatsapp: whatsapp.trim(),
        address: address.trim(),
        notes: notes.trim(),
        estimatedPrice: {
          min: estimate.low,
          max: estimate.high,
        },
      };

      console.log("TAILOR ORDER:", order);

      await new Promise((resolve) => setTimeout(resolve, 700));

      setSubmitted(true);
    } catch (submitError) {
      console.error(submitError);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#fffaf9] text-[#211b1d]">
        <header className="border-b border-black/[0.06] bg-white">
          <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-5 lg:px-8">
            <Link
              href="/"
              className="flex items-center gap-3 font-semibold"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#211b1d] text-white">
                <Sparkles size={18} />
              </div>

              <div>
                <p>Atelier AI</p>
                <p className="text-[10px] font-normal uppercase tracking-[0.25em] text-black/40">
                  Tailor Studio
                </p>
              </div>
            </Link>
          </div>
        </header>

        <section className="flex min-h-[calc(100vh-76px)] items-center justify-center px-5 py-16">
          <div className="w-full max-w-2xl rounded-[2rem] border border-black/[0.06] bg-white p-8 text-center shadow-xl shadow-black/[0.04] sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f8e8ed] text-[#b85c78]">
              <Check size={30} />
            </div>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-[#b85c78]">
              Request received
            </p>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Thank you, {customerName}.
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-black/55">
              Your tailoring request has been received. We will contact you
              through WhatsApp for more information, the exact price, fabric
              details, delivery information and any other details needed
              before we start your order.
            </p>

            <div className="mx-auto mt-8 max-w-md rounded-2xl bg-[#f8e8ed] p-5">
              <p className="text-xs uppercase tracking-wider text-black/40">
                Approximate estimate
              </p>

              <p className="mt-2 text-2xl font-semibold text-[#8f425d]">
                {formatPrice(estimate.low)} – {formatPrice(estimate.high)}
              </p>

              <p className="mt-2 text-xs leading-5 text-black/45">
                This is only an estimated range. The exact price will be
                confirmed with you through WhatsApp.
              </p>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#211b1d] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#b85c78]"
              >
                <MessageCircle size={17} />
                Continue on WhatsApp
              </a>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 px-6 py-3.5 text-sm font-medium transition hover:bg-black/[0.03]"
              >
                Back to Home
              </Link>
            </div>

            <p className="mt-7 text-xs text-black/35">
              Thanks for choosing Atelier AI ✦
            </p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf9] text-[#211b1d]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#fffaf9]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#211b1d] text-white">
              <Sparkles size={18} />
            </div>

            <div>
              <p className="font-semibold tracking-tight">Atelier AI</p>

              <p className="text-[10px] uppercase tracking-[0.25em] text-black/40">
                Tailor Studio
              </p>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2.5 text-xs font-medium transition hover:bg-black/[0.03]"
          >
            <ArrowLeft size={15} />
            Home
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
        {/* PAGE INTRO */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#dca5b7]/40 bg-[#f8e8ed] px-4 py-2 text-xs font-medium text-[#8f425d]">
            <Ruler size={14} />
            Custom tailoring
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            Create your custom
            <span className="text-[#b85c78]"> outfit.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-black/55 sm:text-base">
            Choose your garment, upload the front and back reference images,
            provide the measurements we need, and send your tailoring request.
            We will review everything and contact you through WhatsApp.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 grid gap-8 lg:grid-cols-[1fr_380px]"
        >
          <div className="space-y-8">
            {/* STEP 1 */}
            <section className="rounded-[2rem] border border-black/[0.06] bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#211b1d] text-sm font-semibold text-white">
                  01
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Choose your garment
                  </h2>

                  <p className="mt-1 text-sm text-black/45">
                    Select the type of outfit you want us to make.
                  </p>
                </div>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {dressTypes.map((item) => {
                  const active = dressType === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleDressTypeChange(item.id)}
                      className={`rounded-2xl border p-5 text-left transition ${
                        active
                          ? "border-[#b85c78] bg-[#f8e8ed]"
                          : "border-black/10 bg-white hover:border-black/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">
                          {item.name}
                        </p>

                        {active && (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#b85c78] text-white">
                            <Check size={14} />
                          </div>
                        )}
                      </div>

                      <p className="mt-2 text-xs leading-5 text-black/45">
                        {item.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* STEP 2 */}
            <section className="rounded-[2rem] border border-black/[0.06] bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#211b1d] text-sm font-semibold text-white">
                  02
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Upload your reference
                  </h2>

                  <p className="mt-1 text-sm text-black/45">
                    Upload the front and back of the design you want.
                  </p>
                </div>
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                {/* FRONT */}
                <div>
                  <p className="mb-3 text-sm font-semibold">
                    Front reference
                  </p>

                  {frontImage ? (
                    <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-[#f5eeee]">
                      <img
                        src={frontImage}
                        alt="Front reference"
                        className="aspect-[4/5] w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={removeFrontImage}
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-lg"
                        aria-label="Remove front image"
                      >
                        <X size={16} />
                      </button>

                      <div className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium shadow-lg">
                        Front uploaded
                      </div>
                    </div>
                  ) : (
                    <label className="group flex aspect-[4/5] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-black/10 bg-[#fffaf9] p-6 text-center transition hover:border-[#b85c78] hover:bg-[#fdf4f6]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f8e8ed] text-[#b85c78]">
                        <Camera size={21} />
                      </div>

                      <p className="mt-4 text-sm font-semibold">
                        Upload front
                      </p>

                      <p className="mt-2 text-xs leading-5 text-black/40">
                        JPG, PNG or WEBP
                        <br />
                        Maximum 8MB
                      </p>

                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFrontImage}
                      />
                    </label>
                  )}
                </div>

                {/* BACK */}
                <div>
                  <p className="mb-3 text-sm font-semibold">
                    Back reference
                  </p>

                  {backImage ? (
                    <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-[#f5eeee]">
                      <img
                        src={backImage}
                        alt="Back reference"
                        className="aspect-[4/5] w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={removeBackImage}
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-lg"
                        aria-label="Remove back image"
                      >
                        <X size={16} />
                      </button>

                      <div className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium shadow-lg">
                        Back uploaded
                      </div>
                    </div>
                  ) : (
                    <label className="group flex aspect-[4/5] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-black/10 bg-[#fffaf9] p-6 text-center transition hover:border-[#b85c78] hover:bg-[#fdf4f6]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f8e8ed] text-[#b85c78]">
                        <ImageIcon size={21} />
                      </div>

                      <p className="mt-4 text-sm font-semibold">
                        Upload back
                      </p>

                      <p className="mt-2 text-xs leading-5 text-black/40">
                        JPG, PNG or WEBP
                        <br />
                        Maximum 8MB
                      </p>

                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleBackImage}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-[#f8f4f3] p-4">
                <div className="flex gap-3">
                  <Sparkles
                    size={17}
                    className="mt-0.5 shrink-0 text-[#b85c78]"
                  />

                  <p className="text-xs leading-5 text-black/50">
                    Use clear photos where the garment is easy to see. The
                    reference helps our tailor understand the design,
                    neckline, sleeves, shape and other visible details.
                  </p>
                </div>
              </div>
            </section>

            {/* STEP 3 */}
            <section className="rounded-[2rem] border border-black/[0.06] bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#211b1d] text-sm font-semibold text-white">
                  03
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Your measurements
                  </h2>

                  <p className="mt-1 text-sm text-black/45">
                    Only the measurements needed for your selected garment
                    are shown.
                  </p>
                </div>
              </div>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                {currentMeasurements.map((field) => (
                  <div key={field.key}>
                    <label
                      htmlFor={field.key}
                      className="text-sm font-semibold"
                    >
                      {field.label}
                    </label>

                    <div className="relative mt-2">
                      <input
                        id={field.key}
                        type="text"
                        inputMode="decimal"
                        value={measurements[field.key] || ""}
                        onChange={(event) =>
                          handleMeasurementChange(
                            field.key,
                            event.target.value
                          )
                        }
                        placeholder="Enter measurement"
                        className="w-full rounded-xl border border-black/10 bg-[#fffaf9] px-4 py-3.5 pr-12 text-sm outline-none transition placeholder:text-black/25 focus:border-[#b85c78] focus:ring-2 focus:ring-[#b85c78]/10"
                      />

                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-black/35">
                        {field.unit}
                      </span>
                    </div>

                    <p className="mt-2 text-[11px] leading-4 text-black/40">
                      {field.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-2xl border border-[#e7d5db] bg-[#fdf7f8] p-5">
                <div className="flex gap-3">
                  <Ruler
                    size={18}
                    className="mt-0.5 shrink-0 text-[#b85c78]"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      Measurement guide
                    </p>

                    <p className="mt-2 text-xs leading-5 text-black/50">
                      Use a soft measuring tape and keep it comfortable,
                      without pulling it too tightly. Measurements are shown
                      in inches.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* STEP 4 */}
            <section className="rounded-[2rem] border border-black/[0.06] bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#211b1d] text-sm font-semibold text-white">
                  04
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Your contact details
                  </h2>

                  <p className="mt-1 text-sm text-black/45">
                    We will use these details to contact you about your
                    tailoring request.
                  </p>
                </div>
              </div>

              <div className="mt-7 space-y-5">
                <div>
                  <label
                    htmlFor="customerName"
                    className="text-sm font-semibold"
                  >
                    Full name
                  </label>

                  <div className="relative mt-2">
                    <User
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                    />

                    <input
                      id="customerName"
                      value={customerName}
                      onChange={(event) =>
                        setCustomerName(event.target.value)
                      }
                      placeholder="Your name"
                      className="w-full rounded-xl border border-black/10 bg-[#fffaf9] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-black/25 focus:border-[#b85c78] focus:ring-2 focus:ring-[#b85c78]/10"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="whatsapp"
                    className="text-sm font-semibold"
                  >
                    WhatsApp number
                  </label>

                  <div className="relative mt-2">
                    <Phone
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                    />

                    <input
                      id="whatsapp"
                      type="tel"
                      value={whatsapp}
                      onChange={(event) =>
                        setWhatsapp(event.target.value)
                      }
                      placeholder="07XXXXXXXX"
                      className="w-full rounded-xl border border-black/10 bg-[#fffaf9] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-black/25 focus:border-[#b85c78] focus:ring-2 focus:ring-[#b85c78]/10"
                    />
                  </div>

                  <p className="mt-2 text-[11px] text-black/40">
                    Please make sure this number is available on WhatsApp.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="text-sm font-semibold"
                  >
                    Delivery address
                  </label>

                  <div className="relative mt-2">
                    <MapPin
                      size={17}
                      className="absolute left-4 top-4 text-black/30"
                    />

                    <textarea
                      id="address"
                      value={address}
                      onChange={(event) =>
                        setAddress(event.target.value)
                      }
                      placeholder="Enter your full delivery address"
                      rows={4}
                      className="w-full resize-none rounded-xl border border-black/10 bg-[#fffaf9] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-black/25 focus:border-[#b85c78] focus:ring-2 focus:ring-[#b85c78]/10"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="notes"
                    className="text-sm font-semibold"
                  >
                    Additional information
                    <span className="ml-2 font-normal text-black/35">
                      Optional
                    </span>
                  </label>

                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Fabric preference, colour, special requests, etc."
                    rows={4}
                    className="mt-2 w-full resize-none rounded-xl border border-black/10 bg-[#fffaf9] px-4 py-3.5 text-sm outline-none transition placeholder:text-black/25 focus:border-[#b85c78] focus:ring-2 focus:ring-[#b85c78]/10"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT SUMMARY */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white shadow-sm">
              <div className="bg-[#211b1d] p-6 text-white">
                <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                  Your request
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  {selectedDress?.name}
                </h2>

                <p className="mt-2 text-xs leading-5 text-white/45">
                  Custom-made according to your reference and measurements.
                </p>
              </div>

              <div className="p-6">
                <div className="rounded-2xl bg-[#f8e8ed] p-5">
                  <div className="flex items-center gap-2 text-[#8f425d]">
                    <Sparkles size={16} />

                    <p className="text-xs font-semibold uppercase tracking-wider">
                      Estimated price
                    </p>
                  </div>

                  <p className="mt-3 text-3xl font-semibold tracking-tight text-[#8f425d]">
                    {formatPrice(estimate.low)}
                    <span className="mx-1 text-lg font-normal text-[#8f425d]/50">
                      –
                    </span>
                    {formatPrice(estimate.high)}
                  </p>

                  <p className="mt-3 text-[11px] leading-5 text-black/45">
                    Approximate estimate only. Final price will be confirmed
                    after we review your design, fabric and requirements.
                  </p>
                </div>

                {/* BLOWSE PRICE EXPLANATION */}
                {dressType === "blouse" && (
                  <div className="mt-5 rounded-2xl border border-black/[0.06] p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-black/35">
                      Blouse estimate
                    </p>

                    <div className="mt-3 space-y-2 text-xs text-black/55">
                      <div className="flex justify-between gap-4">
                        <span>Normal tailoring + material range</span>
                        <span className="font-medium">
                          Rs. 1,900+
                        </span>
                      </div>

                      <div className="flex justify-between gap-4">
                        <span>Design / material variation</span>
                        <span className="font-medium">
                          Up to Rs. 2,500
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 text-[11px] leading-5 text-black/40">
                      The estimate can change if you request expensive fabric,
                      heavy embroidery, special accessories or complex
                      tailoring.
                    </p>
                  </div>
                )}

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-black/40">Front image</span>

                    <span
                      className={
                        frontImage
                          ? "font-medium text-green-600"
                          : "text-black/30"
                      }
                    >
                      {frontImage ? "Uploaded" : "Required"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-black/40">Back image</span>

                    <span
                      className={
                        backImage
                          ? "font-medium text-green-600"
                          : "text-black/30"
                      }
                    >
                      {backImage ? "Uploaded" : "Required"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-black/40">Measurements</span>

                    <span className="font-medium">
                      {
                        currentMeasurements.filter(
                          (field) =>
                            measurements[field.key]?.trim()
                        ).length
                      }{" "}
                      / {currentMeasurements.length}
                    </span>
                  </div>
                </div>

                {error && (
                  <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs leading-5 text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-[#211b1d] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#b85c78] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending request...
                    </>
                  ) : (
                    <>
                      Send tailoring request
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>

                <div className="mt-5 flex gap-3 rounded-2xl bg-[#f8f4f3] p-4">
                  <MessageCircle
                    size={17}
                    className="mt-0.5 shrink-0 text-[#b85c78]"
                  />

                  <p className="text-[11px] leading-5 text-black/45">
                    After you submit, we will contact you through WhatsApp for
                    more information and the exact final price.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </form>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-black/[0.06] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-5 py-8 text-xs text-black/35 sm:flex-row lg:px-8">
          <p>© 2026 Atelier AI. All rights reserved.</p>

          <Link
            href="/ai-studio"
            className="inline-flex items-center gap-2 transition hover:text-black"
          >
            <Sparkles size={13} />
            Create with AI
          </Link>
        </div>
      </footer>
    </main>
  );
}