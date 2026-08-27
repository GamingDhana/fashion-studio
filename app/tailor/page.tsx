"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Image as ImageIcon,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
  Sparkles,
  Upload,
  User,
} from "lucide-react";

type DressType = "blouse" | "dress" | "skirt" | "trouser" | "shirt";

type Measurement = {
  label: string;
  value: string;
  unit: "cm" | "in";
};

type Pricing = {
  min: number;
  max: number;
  label: string;
};

const DRESS_TYPES: {
  value: DressType;
  label: string;
  description: string;
}[] = [
  {
    value: "blouse",
    label: "Blouse",
    description: "Custom blouse with your reference design",
  },
  {
    value: "dress",
    label: "Dress",
    description: "Custom-made dress",
  },
  {
    value: "skirt",
    label: "Skirt",
    description: "Custom skirt",
  },
  {
    value: "trouser",
    label: "Trouser",
    description: "Custom trousers",
  },
  {
    value: "shirt",
    label: "Shirt",
    description: "Custom shirt",
  },
];

const MEASUREMENTS: Record<
  DressType,
  { key: string; label: string; help: string }[]
> = {
  blouse: [
    {
      key: "bust",
      label: "Bust",
      help: "Measure around the fullest part of your bust.",
    },
    {
      key: "waist",
      label: "Waist",
      help: "Measure around your natural waist.",
    },
    {
      key: "shoulder",
      label: "Shoulder",
      help: "Measure from one shoulder point to the other.",
    },
    {
      key: "blouseLength",
      label: "Blouse Length",
      help: "Measure from the shoulder down to your desired blouse length.",
    },
    {
      key: "sleeveLength",
      label: "Sleeve Length",
      help: "Measure from shoulder to your desired sleeve length.",
    },
    {
      key: "armhole",
      label: "Armhole",
      help: "Measure around the armhole area.",
    },
  ],

  dress: [
    {
      key: "bust",
      label: "Bust",
      help: "Measure around the fullest part of your bust.",
    },
    {
      key: "waist",
      label: "Waist",
      help: "Measure around your natural waist.",
    },
    {
      key: "hip",
      label: "Hip",
      help: "Measure around the fullest part of your hips.",
    },
    {
      key: "shoulder",
      label: "Shoulder",
      help: "Measure from one shoulder point to the other.",
    },
    {
      key: "dressLength",
      label: "Dress Length",
      help: "Measure from shoulder to your desired dress length.",
    },
    {
      key: "sleeveLength",
      label: "Sleeve Length",
      help: "Measure from shoulder to your desired sleeve length.",
    },
  ],

  skirt: [
    {
      key: "waist",
      label: "Waist",
      help: "Measure around your natural waist.",
    },
    {
      key: "hip",
      label: "Hip",
      help: "Measure around the fullest part of your hips.",
    },
    {
      key: "skirtLength",
      label: "Skirt Length",
      help: "Measure from waist to your desired skirt length.",
    },
  ],

  trouser: [
    {
      key: "waist",
      label: "Waist",
      help: "Measure around your natural waist.",
    },
    {
      key: "hip",
      label: "Hip",
      help: "Measure around the fullest part of your hips.",
    },
    {
      key: "thigh",
      label: "Thigh",
      help: "Measure around the fullest part of your thigh.",
    },
    {
      key: "inseam",
      label: "Inseam",
      help: "Measure from crotch to the desired trouser length.",
    },
    {
      key: "trouserLength",
      label: "Trouser Length",
      help: "Measure from waist to desired trouser length.",
    },
  ],

  shirt: [
    {
      key: "chest",
      label: "Chest",
      help: "Measure around the fullest part of your chest.",
    },
    {
      key: "waist",
      label: "Waist",
      help: "Measure around your natural waist.",
    },
    {
      key: "shoulder",
      label: "Shoulder",
      help: "Measure from one shoulder point to the other.",
    },
    {
      key: "shirtLength",
      label: "Shirt Length",
      help: "Measure from shoulder to desired shirt length.",
    },
    {
      key: "sleeveLength",
      label: "Sleeve Length",
      help: "Measure from shoulder to desired sleeve length.",
    },
  ],
};

/*
 * NORMAL SRI LANKAN ESTIMATES
 *
 * These are deliberately NOT AI-generated.
 *
 * Blouse with Masha fabric:
 * Rs. 1,900 - Rs. 2,500
 *
 * You can change these values later if your tailor/material prices change.
 */
const BASE_PRICES: Record<DressType, Pricing> = {
  blouse: {
    min: 1900,
    max: 2500,
    label: "Blouse with Masha fabric",
  },

  dress: {
    min: 3500,
    max: 6500,
    label: "Custom dress",
  },

  skirt: {
    min: 2200,
    max: 3500,
    label: "Custom skirt",
  },

  trouser: {
    min: 2500,
    max: 4000,
    label: "Custom trousers",
  },

  shirt: {
    min: 2200,
    max: 3500,
    label: "Custom shirt",
  },
};

const DELIVERY_ESTIMATE = {
  min: 300,
  max: 800,
};

function formatLKR(value: number) {
  return `Rs. ${value.toLocaleString("en-LK")}`;
}

export default function TailorPage() {
  const [dressType, setDressType] = useState<DressType>("blouse");

  const [frontImage, setFrontImage] = useState<string>("");
  const [backImage, setBackImage] = useState<string>("");

  const [measurements, setMeasurements] = useState<
    Record<string, Measurement>
  >({});

  const [customerName, setCustomerName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");

  const [step, setStep] = useState(1);
  const [orderSent, setOrderSent] = useState(false);

  const currentMeasurements = MEASUREMENTS[dressType];
  const currentPricing = BASE_PRICES[dressType];

  const measurementComplete = useMemo(() => {
    return currentMeasurements.every(
      (measurement) =>
        measurements[measurement.key]?.value?.trim().length > 0
    );
  }, [currentMeasurements, measurements]);

  const canContinueFromStep1 = Boolean(dressType);

  const canContinueFromStep2 =
    frontImage.length > 0 && backImage.length > 0;

  const canContinueFromStep3 = measurementComplete;

  const canSubmit =
    customerName.trim() !== "" &&
    whatsapp.trim() !== "" &&
    address.trim() !== "" &&
    city.trim() !== "";

  /*
   * PRICE LOGIC
   *
   * We do NOT use AI here.
   *
   * For blouse:
   * Base = Rs. 1,900 - Rs. 2,500
   *
   * Delivery is displayed separately.
   *
   * The customer sees:
   * Tailoring/material estimate
   * Delivery estimate
   * Approximate total
   *
   * The exact final price is confirmed through WhatsApp.
   */
  const estimatedTotal = {
    min: currentPricing.min + DELIVERY_ESTIMATE.min,
    max: currentPricing.max + DELIVERY_ESTIMATE.max,
  };

  function handleImageUpload(
    event: ChangeEvent<HTMLInputElement>,
    side: "front" | "back"
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Please select an image smaller than 10MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== "string") {
        return;
      }

      if (side === "front") {
        setFrontImage(result);
      } else {
        setBackImage(result);
      }
    };

    reader.readAsDataURL(file);
  }

  function updateMeasurement(key: string, value: string) {
    setMeasurements((previous) => ({
      ...previous,
      [key]: {
        label:
          currentMeasurements.find((item) => item.key === key)?.label || key,
        value,
        unit: previous[key]?.unit || "cm",
      },
    }));
  }

  function updateUnit(key: string, unit: "cm" | "in") {
    setMeasurements((previous) => ({
      ...previous,
      [key]: {
        label:
          currentMeasurements.find((item) => item.key === key)?.label || key,
        value: previous[key]?.value || "",
        unit,
      },
    }));
  }

  function changeDressType(type: DressType) {
    setDressType(type);
    setMeasurements({});
    setStep(1);
    setOrderSent(false);
  }

  function nextStep() {
    if (step === 1 && !canContinueFromStep1) {
      return;
    }

    if (step === 2 && !canContinueFromStep2) {
      alert("Please upload both front and back reference images.");
      return;
    }

    if (step === 3 && !canContinueFromStep3) {
      alert("Please complete all required measurements.");
      return;
    }

    setStep((previous) => Math.min(previous + 1, 5));
  }

  function previousStep() {
    setStep((previous) => Math.max(previous - 1, 1));
  }

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      alert("Please complete your name, WhatsApp number and address.");
      return;
    }

    setOrderSent(true);
  }

  function openWhatsApp() {
    const phone = whatsapp.replace(/[^\d+]/g, "");

    const measurementText = currentMeasurements
      .map((item) => {
        const data = measurements[item.key];

        if (!data) {
          return `${item.label}: Not provided`;
        }

        return `${item.label}: ${data.value} ${data.unit}`;
      })
      .join("\n");

    const message = [
      "Hello Atelier AI, I would like to place a custom tailoring order.",
      "",
      `Dress type: ${DRESS_TYPES.find((item) => item.value === dressType)?.label}`,
      "",
      "Measurements:",
      measurementText,
      "",
      `Customer name: ${customerName}`,
      `WhatsApp: ${whatsapp}`,
      `City: ${city}`,
      `Address: ${address}`,
      "",
      `Estimate: ${formatLKR(estimatedTotal.min)} - ${formatLKR(
        estimatedTotal.max
      )}`,
      "",
      "The displayed amount is only an estimate. Please contact me with the exact price and further information.",
      "",
      notes ? `Additional notes: ${notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    /*
     * Change this number to your business WhatsApp number.
     *
     * IMPORTANT:
     * Use the international format without + or spaces.
     *
     * Example Sri Lanka:
     * 94771234567
     */
    const businessWhatsAppNumber = "947XXXXXXXX";

    const url = `https://wa.me/${businessWhatsAppNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");

    /*
     * "phone" is intentionally calculated above so the customer's
     * WhatsApp number can be included in the order message if needed.
     */
    void phone;
  }

  return (
    <main className="min-h-screen bg-[#fffaf9] text-[#211b1d]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#fffaf9]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#211b1d] text-white">
              <Sparkles size={18} />
            </div>

            <div>
              <p className="text-lg font-semibold">Atelier AI</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-black/40">
                Custom Tailoring
              </p>
            </div>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-black/[0.03]"
          >
            <ArrowLeft size={15} />
            Home
          </Link>
        </div>
      </header>

      {/* PAGE INTRO */}
      <section className="mx-auto max-w-5xl px-5 pb-10 pt-10 lg:px-8 lg:pt-16">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f8e8ed] text-[#b85c78]">
            <Ruler size={24} />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#b85c78]">
            Custom tailoring
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Make your reference fit you.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-black/50 sm:text-base">
            Choose your garment, upload the front and back reference,
            enter only the measurements needed for that garment, and send
            your order request.
          </p>
        </div>

        {/* PROGRESS */}
        <div className="mx-auto mt-10 flex max-w-3xl items-center">
          {[1, 2, 3, 4, 5].map((number, index) => {
            const active = number <= step;

            return (
              <div
                key={number}
                className="flex flex-1 items-center last:flex-none"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition ${
                    active
                      ? "bg-[#211b1d] text-white"
                      : "bg-black/[0.06] text-black/35"
                  }`}
                >
                  {number < step ? <Check size={15} /> : number}
                </div>

                {index < 4 && (
                  <div
                    className={`mx-2 h-px flex-1 transition ${
                      number < step ? "bg-[#211b1d]" : "bg-black/10"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* MAIN */}
      <section className="mx-auto max-w-5xl px-5 pb-24 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-black/[0.07] bg-white shadow-xl shadow-black/[0.04]">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="p-6 sm:p-10">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                  Step 01
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  What do you want made?
                </h2>

                <p className="mt-2 text-sm text-black/45">
                  Select the garment type. We will only ask for the useful
                  measurements for that garment.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {DRESS_TYPES.map((item) => {
                  const selected = dressType === item.value;

                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => changeDressType(item.value)}
                      className={`rounded-3xl border p-5 text-left transition ${
                        selected
                          ? "border-[#b85c78] bg-[#f8e8ed] shadow-lg shadow-[#b85c78]/10"
                          : "border-black/10 hover:border-black/20 hover:bg-black/[0.02]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#211b1d] text-white">
                          <Ruler size={19} />
                        </div>

                        {selected && (
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#b85c78] text-white">
                            <Check size={14} />
                          </div>
                        )}
                      </div>

                      <h3 className="mt-5 font-semibold">{item.label}</h3>

                      <p className="mt-2 text-xs leading-5 text-black/45">
                        {item.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* BLOUSE PRICE PREVIEW */}
              {dressType === "blouse" && (
                <div className="mt-8 rounded-3xl border border-[#e7c4ce] bg-[#fff7f9] p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f8e8ed] text-[#b85c78]">
                      <Sparkles size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        Blouse estimate
                      </p>

                      <p className="mt-1 text-xs leading-5 text-black/50">
                        Our normal estimate for a blouse using Masha fabric
                        is:
                      </p>

                      <p className="mt-3 text-xl font-semibold text-[#b85c78]">
                        {formatLKR(currentPricing.min)} -{" "}
                        {formatLKR(currentPricing.max)}
                      </p>

                      <p className="mt-2 text-[11px] leading-5 text-black/40">
                        This is only an approximate price. The exact price
                        will be confirmed after we check your reference,
                        measurements, material and requirements.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!canContinueFromStep1}
                  className="flex items-center gap-2 rounded-full bg-[#211b1d] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#b85c78] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Continue
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="p-6 sm:p-10">
              <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                Step 02
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Upload your reference
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-black/45">
                Upload both the front and back image of the clothing you want
                us to make.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {/* FRONT */}
                <div>
                  <p className="mb-3 text-sm font-semibold">Front image</p>

                  <label className="group relative flex min-h-[360px] cursor-pointer items-center justify-center overflow-hidden rounded-[2rem] border-2 border-dashed border-black/10 bg-[#faf7f6] transition hover:border-[#b85c78]">
                    {frontImage ? (
                      <>
                        <img
                          src={frontImage}
                          alt="Front reference"
                          className="absolute inset-0 h-full w-full object-cover"
                        />

                        <div className="absolute inset-x-0 bottom-0 bg-black/55 p-4 text-center text-xs font-medium text-white backdrop-blur">
                          Click to change image
                        </div>
                      </>
                    ) : (
                      <div className="px-6 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f8e8ed] text-[#b85c78]">
                          <Upload size={22} />
                        </div>

                        <p className="mt-5 text-sm font-semibold">
                          Upload front
                        </p>

                        <p className="mt-2 text-xs leading-5 text-black/40">
                          JPG, PNG or WEBP
                          <br />
                          Maximum 10MB
                        </p>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) =>
                        handleImageUpload(event, "front")
                      }
                    />
                  </label>
                </div>

                {/* BACK */}
                <div>
                  <p className="mb-3 text-sm font-semibold">Back image</p>

                  <label className="group relative flex min-h-[360px] cursor-pointer items-center justify-center overflow-hidden rounded-[2rem] border-2 border-dashed border-black/10 bg-[#faf7f6] transition hover:border-[#b85c78]">
                    {backImage ? (
                      <>
                        <img
                          src={backImage}
                          alt="Back reference"
                          className="absolute inset-0 h-full w-full object-cover"
                        />

                        <div className="absolute inset-x-0 bottom-0 bg-black/55 p-4 text-center text-xs font-medium text-white backdrop-blur">
                          Click to change image
                        </div>
                      </>
                    ) : (
                      <div className="px-6 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f8e8ed] text-[#b85c78]">
                          <ImageIcon size={22} />
                        </div>

                        <p className="mt-5 text-sm font-semibold">
                          Upload back
                        </p>

                        <p className="mt-2 text-xs leading-5 text-black/40">
                          JPG, PNG or WEBP
                          <br />
                          Maximum 10MB
                        </p>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) =>
                        handleImageUpload(event, "back")
                      }
                    />
                  </label>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-[#f7f4f3] p-4 text-xs leading-5 text-black/50">
                <strong className="text-black/70">
                  Reference tip:
                </strong>{" "}
                Use clear photos where the garment is visible. Front and
                back references help the tailor understand the design more
                accurately.
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={previousStep}
                  className="flex items-center gap-2 rounded-full border border-black/10 px-5 py-3.5 text-sm font-medium"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!canContinueFromStep2}
                  className="flex items-center gap-2 rounded-full bg-[#211b1d] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#b85c78] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Measurements
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="p-6 sm:p-10">
              <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                Step 03
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Your measurements
              </h2>

              <p className="mt-2 text-sm leading-6 text-black/45">
                Enter the measurements needed for your{" "}
                {
                  DRESS_TYPES.find((item) => item.value === dressType)
                    ?.label
                }
                .
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {currentMeasurements.map((item) => {
                  const measurement = measurements[item.key];

                  return (
                    <div
                      key={item.key}
                      className="rounded-3xl border border-black/10 p-5"
                    >
                      <label
                        htmlFor={item.key}
                        className="text-sm font-semibold"
                      >
                        {item.label}
                      </label>

                      <p className="mt-1 text-xs leading-5 text-black/40">
                        {item.help}
                      </p>

                      <div className="mt-4 flex gap-2">
                        <input
                          id={item.key}
                          type="number"
                          min="0"
                          step="0.1"
                          value={measurement?.value || ""}
                          onChange={(event) =>
                            updateMeasurement(
                              item.key,
                              event.target.value
                            )
                          }
                          placeholder="Enter measurement"
                          className="min-w-0 flex-1 rounded-2xl border border-black/10 bg-[#faf8f7] px-4 py-3 text-sm outline-none transition focus:border-[#b85c78] focus:ring-2 focus:ring-[#b85c78]/10"
                        />

                        <select
                          value={measurement?.unit || "cm"}
                          onChange={(event) =>
                            updateUnit(
                              item.key,
                              event.target.value as "cm" | "in"
                            )
                          }
                          className="rounded-2xl border border-black/10 bg-[#faf8f7] px-3 py-3 text-sm outline-none"
                        >
                          <option value="cm">cm</option>
                          <option value="in">in</option>
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl bg-[#f8e8ed] p-4 text-xs leading-5 text-[#8f425d]">
                <strong>Measurement guide:</strong> Take measurements
                without pulling the measuring tape too tightly. If you are
                unsure, leave a note for the tailor and we can confirm the
                measurement with you through WhatsApp.
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={previousStep}
                  className="flex items-center gap-2 rounded-full border border-black/10 px-5 py-3.5 text-sm font-medium"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!canContinueFromStep3}
                  className="flex items-center gap-2 rounded-full bg-[#211b1d] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#b85c78] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Review price
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="p-6 sm:p-10">
              <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                Step 04
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Your estimated cost
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-black/45">
                This is a normal price estimate, not an AI-generated price.
                The exact price will be confirmed by our tailoring team.
              </p>

              <div className="mt-8 overflow-hidden rounded-[2rem] border border-black/10">
                <div className="bg-[#211b1d] p-6 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                    Approximate estimate
                  </p>

                  <p className="mt-3 text-4xl font-semibold">
                    {formatLKR(estimatedTotal.min)} -{" "}
                    {formatLKR(estimatedTotal.max)}
                  </p>

                  <p className="mt-2 text-xs text-white/45">
                    Estimated total including delivery range
                  </p>
                </div>

                <div className="divide-y divide-black/[0.06]">
                  <div className="flex items-center justify-between p-5">
                    <div>
                      <p className="text-sm font-semibold">
                        {currentPricing.label}
                      </p>

                      <p className="mt-1 text-xs text-black/40">
                        Normal tailoring + material estimate
                      </p>
                    </div>

                    <p className="text-sm font-semibold">
                      {formatLKR(currentPricing.min)} -{" "}
                      {formatLKR(currentPricing.max)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-5">
                    <div>
                      <p className="text-sm font-semibold">
                        Delivery
                      </p>

                      <p className="mt-1 text-xs text-black/40">
                        Estimated delivery range
                      </p>
                    </div>

                    <p className="text-sm font-semibold">
                      {formatLKR(DELIVERY_ESTIMATE.min)} -{" "}
                      {formatLKR(DELIVERY_ESTIMATE.max)}
                    </p>
                  </div>

                  <div className="bg-[#fff7f9] p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f8e8ed] text-[#b85c78]">
                        <Sparkles size={16} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          Important
                        </p>

                        <p className="mt-1 text-xs leading-5 text-black/50">
                          The price shown here is only an estimate. Material
                          availability, design details, embroidery, special
                          finishing, size requirements and delivery location
                          can change the final price.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {dressType === "blouse" && (
                <div className="mt-6 rounded-3xl border border-[#e7c4ce] bg-[#fff7f9] p-5">
                  <p className="text-sm font-semibold">
                    Masha blouse price
                  </p>

                  <p className="mt-2 text-xs leading-5 text-black/50">
                    For a normal Masha-fabric blouse, we use a simple
                    estimate of{" "}
                    <strong className="text-black/70">
                      {formatLKR(1900)} - {formatLKR(2500)}
                    </strong>
                    . We do not ask AI to calculate this price.
                  </p>
                </div>
              )}

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={previousStep}
                  className="flex items-center gap-2 rounded-full border border-black/10 px-5 py-3.5 text-sm font-medium"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 rounded-full bg-[#211b1d] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#b85c78]"
                >
                  Continue
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && !orderSent && (
            <form onSubmit={submitOrder} className="p-6 sm:p-10">
              <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                Step 05
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Your contact details
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-black/45">
                Give us your details so our tailoring team can contact you
                through WhatsApp and confirm the exact price.
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="customerName"
                    className="text-sm font-semibold"
                  >
                    Full name *
                  </label>

                  <div className="relative mt-2">
                    <User
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                    />

                    <input
                      id="customerName"
                      type="text"
                      value={customerName}
                      onChange={(event) =>
                        setCustomerName(event.target.value)
                      }
                      placeholder="Your name"
                      className="w-full rounded-2xl border border-black/10 bg-[#faf8f7] py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#b85c78]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="whatsapp"
                    className="text-sm font-semibold"
                  >
                    WhatsApp number *
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
                      placeholder="07X XXX XXXX"
                      className="w-full rounded-2xl border border-black/10 bg-[#faf8f7] py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#b85c78]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="city" className="text-sm font-semibold">
                    City *
                  </label>

                  <div className="relative mt-2">
                    <MapPin
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                    />

                    <input
                      id="city"
                      type="text"
                      value={city}
                      onChange={(event) => setCity(event.target.value)}
                      placeholder="Colombo"
                      className="w-full rounded-2xl border border-black/10 bg-[#faf8f7] py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#b85c78]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="text-sm font-semibold"
                  >
                    Delivery address *
                  </label>

                  <div className="relative mt-2">
                    <MapPin
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                    />

                    <input
                      id="address"
                      type="text"
                      value={address}
                      onChange={(event) =>
                        setAddress(event.target.value)
                      }
                      placeholder="Your delivery address"
                      className="w-full rounded-2xl border border-black/10 bg-[#faf8f7] py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#b85c78]"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="notes"
                    className="text-sm font-semibold"
                  >
                    Additional notes
                  </label>

                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Any special request, fabric preference, sleeve style, neckline, etc."
                    rows={5}
                    className="mt-2 w-full resize-none rounded-2xl border border-black/10 bg-[#faf8f7] px-4 py-3.5 text-sm outline-none transition focus:border-[#b85c78]"
                  />
                </div>
              </div>

              {/* FINAL PRICE SUMMARY */}
              <div className="mt-8 rounded-[2rem] bg-[#211b1d] p-6 text-white">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                      Your estimate
                    </p>

                    <p className="mt-2 text-2xl font-semibold">
                      {formatLKR(estimatedTotal.min)} -{" "}
                      {formatLKR(estimatedTotal.max)}
                    </p>

                    <p className="mt-2 max-w-xl text-xs leading-5 text-white/45">
                      This is an estimate only. We will contact you through
                      WhatsApp with the exact price and further information.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#211b1d] transition hover:bg-[#f0c5d1] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Place order request
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-8 flex justify-start">
                <button
                  type="button"
                  onClick={previousStep}
                  className="flex items-center gap-2 rounded-full border border-black/10 px-5 py-3.5 text-sm font-medium"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
              </div>
            </form>
          )}

          {/* SUCCESS */}
          {step === 5 && orderSent && (
            <div className="p-8 text-center sm:p-14">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e9f7ee] text-[#2e8b57]">
                <Check size={30} />
              </div>

              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-[#b85c78]">
                Order request ready
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Thank you, {customerName}.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-black/50">
                Your custom tailoring information has been prepared. Please
                contact us through WhatsApp so we can check your reference,
                measurements, material and delivery details.
              </p>

              <div className="mx-auto mt-8 max-w-xl rounded-3xl bg-[#f8e8ed] p-6 text-left">
                <p className="text-sm font-semibold">
                  Estimated price
                </p>

                <p className="mt-2 text-2xl font-semibold text-[#b85c78]">
                  {formatLKR(estimatedTotal.min)} -{" "}
                  {formatLKR(estimatedTotal.max)}
                </p>

                <p className="mt-3 text-xs leading-5 text-black/50">
                  This is not the final price. The exact price and any
                  additional requirements will be confirmed through WhatsApp.
                </p>
              </div>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#211b1d] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#b85c78]"
                >
                  <MessageCircle size={18} />
                  Contact us on WhatsApp
                </button>

                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 rounded-full border border-black/10 px-7 py-4 text-sm font-medium"
                >
                  Back to website
                </Link>
              </div>

              <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-black/[0.06] bg-[#faf8f7] p-5 text-left">
                <p className="text-sm font-semibold">
                  What happens next?
                </p>

                <div className="mt-4 space-y-3">
                  <div className="flex gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#211b1d] text-[10px] text-white">
                      1
                    </div>

                    <p className="text-xs leading-5 text-black/50">
                      We review your front and back reference images and
                      measurements.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#211b1d] text-[10px] text-white">
                      2
                    </div>

                    <p className="text-xs leading-5 text-black/50">
                      We contact you through WhatsApp for any questions.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#211b1d] text-[10px] text-white">
                      3
                    </div>

                    <p className="text-xs leading-5 text-black/50">
                      We provide the exact price and other important
                      information.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#211b1d] text-[10px] text-white">
                      4
                    </div>

                    <p className="text-xs leading-5 text-black/50">
                      Once everything is confirmed, we proceed with your
                      custom order.
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-8 text-xs text-black/35">
                Thanks for choosing Atelier AI. We will provide you with
                the exact price and further information through WhatsApp.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}