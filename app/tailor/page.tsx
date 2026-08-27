"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";

type DressType =
  | "blouse"
  | "dress"
  | "skirt"
  | "pants"
  | "shirt"
  | "saree_blouse";

type MeasurementField = {
  key: string;
  label: string;
  description: string;
  unit: string;
};

type Measurements = Record<string, string>;

type OrderForm = {
  name: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  notes: string;
};

const dressTypes: {
  value: DressType;
  label: string;
  description: string;
}[] = [
  {
    value: "blouse",
    label: "Blouse",
    description: "Custom blouse / top",
  },
  {
    value: "dress",
    label: "Dress",
    description: "One-piece dress",
  },
  {
    value: "skirt",
    label: "Skirt",
    description: "Custom skirt",
  },
  {
    value: "pants",
    label: "Pants",
    description: "Trousers / pants",
  },
  {
    value: "shirt",
    label: "Shirt",
    description: "Custom shirt",
  },
  {
    value: "saree_blouse",
    label: "Saree Blouse",
    description: "Traditional blouse",
  },
];

const measurementGuide: Record<DressType, MeasurementField[]> = {
  blouse: [
    {
      key: "bust",
      label: "Bust",
      description: "Measure around the fullest part of your bust.",
      unit: "cm",
    },
    {
      key: "waist",
      label: "Waist",
      description: "Measure around the narrowest part of your waist.",
      unit: "cm",
    },
    {
      key: "shoulder",
      label: "Shoulder",
      description: "Measure from one shoulder point to the other.",
      unit: "cm",
    },
    {
      key: "blouseLength",
      label: "Blouse Length",
      description: "Measure from the shoulder down to your desired blouse length.",
      unit: "cm",
    },
    {
      key: "sleeveLength",
      label: "Sleeve Length",
      description: "Measure from the shoulder to the desired sleeve end.",
      unit: "cm",
    },
    {
      key: "upperArm",
      label: "Upper Arm",
      description: "Measure around the fullest part of your upper arm.",
      unit: "cm",
    },
    {
      key: "armhole",
      label: "Armhole",
      description: "Measure around the armhole area.",
      unit: "cm",
    },
    {
      key: "neck",
      label: "Neck",
      description: "Measure around the base of your neck.",
      unit: "cm",
    },
  ],

  dress: [
    {
      key: "bust",
      label: "Bust",
      description: "Measure around the fullest part of your bust.",
      unit: "cm",
    },
    {
      key: "waist",
      label: "Waist",
      description: "Measure around your natural waist.",
      unit: "cm",
    },
    {
      key: "hip",
      label: "Hip",
      description: "Measure around the fullest part of your hips.",
      unit: "cm",
    },
    {
      key: "shoulder",
      label: "Shoulder",
      description: "Measure from shoulder point to shoulder point.",
      unit: "cm",
    },
    {
      key: "dressLength",
      label: "Dress Length",
      description: "Measure from shoulder to your desired dress length.",
      unit: "cm",
    },
    {
      key: "sleeveLength",
      label: "Sleeve Length",
      description: "Measure from shoulder to sleeve end.",
      unit: "cm",
    },
    {
      key: "upperArm",
      label: "Upper Arm",
      description: "Measure around your upper arm.",
      unit: "cm",
    },
    {
      key: "neck",
      label: "Neck",
      description: "Measure around the base of your neck.",
      unit: "cm",
    },
  ],

  skirt: [
    {
      key: "waist",
      label: "Waist",
      description: "Measure around your natural waist.",
      unit: "cm",
    },
    {
      key: "hip",
      label: "Hip",
      description: "Measure around the fullest part of your hips.",
      unit: "cm",
    },
    {
      key: "skirtLength",
      label: "Skirt Length",
      description: "Measure from your waist to your desired skirt length.",
      unit: "cm",
    },
    {
      key: "thigh",
      label: "Thigh",
      description: "Measure around the fullest part of your thigh.",
      unit: "cm",
    },
  ],

  pants: [
    {
      key: "waist",
      label: "Waist",
      description: "Measure around your natural waist.",
      unit: "cm",
    },
    {
      key: "hip",
      label: "Hip",
      description: "Measure around the fullest part of your hips.",
      unit: "cm",
    },
    {
      key: "inseam",
      label: "Inseam",
      description: "Measure from the crotch to the desired trouser length.",
      unit: "cm",
    },
    {
      key: "outseam",
      label: "Outseam",
      description: "Measure from waist to the bottom of the trousers.",
      unit: "cm",
    },
    {
      key: "thigh",
      label: "Thigh",
      description: "Measure around the fullest part of your thigh.",
      unit: "cm",
    },
    {
      key: "bottom",
      label: "Bottom",
      description: "Measure around the desired ankle/bottom opening.",
      unit: "cm",
    },
  ],

  shirt: [
    {
      key: "chest",
      label: "Chest",
      description: "Measure around the fullest part of your chest.",
      unit: "cm",
    },
    {
      key: "waist",
      label: "Waist",
      description: "Measure around your natural waist.",
      unit: "cm",
    },
    {
      key: "shoulder",
      label: "Shoulder",
      description: "Measure from shoulder point to shoulder point.",
      unit: "cm",
    },
    {
      key: "shirtLength",
      label: "Shirt Length",
      description: "Measure from shoulder to your desired shirt length.",
      unit: "cm",
    },
    {
      key: "sleeveLength",
      label: "Sleeve Length",
      description: "Measure from shoulder to sleeve end.",
      unit: "cm",
    },
    {
      key: "neck",
      label: "Neck",
      description: "Measure around the base of your neck.",
      unit: "cm",
    },
  ],

  saree_blouse: [
    {
      key: "bust",
      label: "Bust",
      description: "Measure around the fullest part of your bust.",
      unit: "cm",
    },
    {
      key: "underBust",
      label: "Under Bust",
      description: "Measure directly below the bust.",
      unit: "cm",
    },
    {
      key: "waist",
      label: "Waist",
      description: "Measure around your natural waist.",
      unit: "cm",
    },
    {
      key: "shoulder",
      label: "Shoulder",
      description: "Measure from one shoulder point to the other.",
      unit: "cm",
    },
    {
      key: "blouseLength",
      label: "Blouse Length",
      description: "Measure from shoulder to desired blouse length.",
      unit: "cm",
    },
    {
      key: "sleeveLength",
      label: "Sleeve Length",
      description: "Measure from shoulder to sleeve end.",
      unit: "cm",
    },
    {
      key: "upperArm",
      label: "Upper Arm",
      description: "Measure around the fullest part of your upper arm.",
      unit: "cm",
    },
    {
      key: "neck",
      label: "Neck",
      description: "Measure around the base of your neck.",
      unit: "cm",
    },
  ],
};

const basePrices: Record<DressType, number> = {
  blouse: 3500,
  dress: 6500,
  skirt: 4000,
  pants: 4500,
  shirt: 4500,
  saree_blouse: 4000,
};

const materialPrices: Record<DressType, number> = {
  blouse: 3500,
  dress: 5000,
  skirt: 3000,
  pants: 3200,
  shirt: 3200,
  saree_blouse: 4000,
};

const sourcingCosts: Record<DressType, number> = {
  blouse: 1000,
  dress: 1500,
  skirt: 1000,
  pants: 1000,
  shirt: 1000,
  saree_blouse: 1200,
};

function formatLKR(value: number): string {
  return `LKR ${Math.round(value).toLocaleString("en-LK")}`;
}

function getFilePreview(file: File | null): string {
  if (!file) {
    return "";
  }

  return URL.createObjectURL(file);
}

export default function TailorPage() {
  const [dressType, setDressType] = useState<DressType>("blouse");

  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);

  const [frontPreview, setFrontPreview] = useState("");
  const [backPreview, setBackPreview] = useState("");

  const [measurements, setMeasurements] = useState<Measurements>({});

  const [activeGuide, setActiveGuide] = useState<string>("bust");

  const [orderForm, setOrderForm] = useState<OrderForm>({
    name: "",
    whatsapp: "",
    email: "",
    address: "",
    city: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const currentMeasurements = measurementGuide[dressType];

  const completedMeasurements = useMemo(() => {
    return currentMeasurements.filter(
      (field) =>
        measurements[field.key] &&
        measurements[field.key].trim() !== ""
    ).length;
  }, [currentMeasurements, measurements]);

  const estimatedPrice = useMemo(() => {
    const base = basePrices[dressType];
    const material = materialPrices[dressType];
    const sourcing = sourcingCosts[dressType];

    const measurementCount = completedMeasurements;

    const measurementAdjustment =
      measurementCount >= currentMeasurements.length
        ? 0
        : 500;

    const delivery = 700;

    return base + material + sourcing + delivery + measurementAdjustment;
  }, [dressType, completedMeasurements, currentMeasurements.length]);

  function handleDressTypeChange(value: DressType) {
    setDressType(value);
    setMeasurements({});
    setActiveGuide(measurementGuide[value][0]?.key || "");
    setSubmitted(false);
    setErrorMessage("");
  }

  function handleMeasurementChange(
    key: string,
    value: string
  ) {
    const cleaned = value.replace(/[^0-9.]/g, "");

    setMeasurements((previous) => ({
      ...previous,
      [key]: cleaned,
    }));
  }

  function handleImageChange(
    event: ChangeEvent<HTMLInputElement>,
    side: "front" | "back"
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please upload an image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("Please choose an image smaller than 10 MB.");
      return;
    }

    setErrorMessage("");

    if (side === "front") {
      setFrontImage(file);

      const preview = getFilePreview(file);
      setFrontPreview(preview);
    } else {
      setBackImage(file);

      const preview = getFilePreview(file);
      setBackPreview(preview);
    }
  }

  function handleCustomerChange(
    field: keyof OrderForm,
    value: string
  ) {
    setOrderForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");

    if (!frontImage || !backImage) {
      setErrorMessage(
        "Please upload both the front and back reference images."
      );
      return;
    }

    if (completedMeasurements !== currentMeasurements.length) {
      setErrorMessage(
        "Please complete all required measurements for the selected dress type."
      );
      return;
    }

    if (!orderForm.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!orderForm.whatsapp.trim()) {
      setErrorMessage("Please enter your WhatsApp number.");
      return;
    }

    if (!orderForm.address.trim()) {
      setErrorMessage("Please enter your delivery address.");
      return;
    }

    if (!orderForm.city.trim()) {
      setErrorMessage("Please enter your city.");
      return;
    }

    setSubmitted(true);
  }

  function resetOrder() {
    setSubmitted(false);
    setErrorMessage("");
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#fffaf9] px-5 py-12 text-[#211b1d]">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[2rem] border border-black/10 bg-white p-8 text-center shadow-xl sm:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f8e8ed] text-4xl">
              ✓
            </div>

            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-[#b85c78]">
              Request received
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Thank you, {orderForm.name}
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-black/55">
              We have received your custom tailoring request and your
              reference images and measurements.
            </p>

            <div className="mx-auto mt-8 max-w-md rounded-2xl bg-[#f8f1f0] p-5 text-left">
              <div className="flex items-center justify-between">
                <span className="text-sm text-black/50">
                  Estimated range
                </span>

                <span className="text-lg font-semibold">
                  {formatLKR(estimatedPrice - 1000)} -{" "}
                  {formatLKR(estimatedPrice + 1500)}
                </span>
              </div>

              <p className="mt-3 text-xs leading-5 text-black/45">
                This is only an approximate estimate. The final price depends
                on the actual fabric, design details, tailoring work and
                delivery.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-[#e4c3cd] bg-[#fff8fa] p-5 text-left">
              <p className="font-semibold">
                We will contact you through WhatsApp
              </p>

              <p className="mt-2 text-sm leading-6 text-black/55">
                We will contact you on WhatsApp for more information,
                confirmation of the design, exact material requirements and
                the final exact price.
              </p>
            </div>

            <p className="mt-6 text-sm text-black/45">
              WhatsApp: {orderForm.whatsapp}
            </p>

            <button
              type="button"
              onClick={resetOrder}
              className="mt-8 rounded-full bg-[#211b1d] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#b85c78]"
            >
              Create another request
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf9] text-[#211b1d]">
      <header className="border-b border-black/[0.06] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <a href="/" className="font-semibold tracking-tight">
            Atelier AI
          </a>

          <a
            href="/ai-studio"
            className="rounded-full border border-black/10 px-4 py-2 text-sm transition hover:bg-black hover:text-white"
          >
            AI Studio
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-20 pt-12 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b85c78]">
            Custom tailoring
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
            Make your reference
            <br />
            <span className="text-[#b85c78]">fit you perfectly.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-black/55">
            Choose your garment, upload the front and back reference images,
            enter the measurements needed for that garment, and request a
            custom-made order.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-8">
            {/* DRESS TYPE */}
            <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                    Step 01
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold">
                    Select your garment
                  </h2>

                  <p className="mt-2 text-sm text-black/45">
                    Measurements will automatically change based on your
                    selection.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {dressTypes.map((type) => {
                  const selected = dressType === type.value;

                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() =>
                        handleDressTypeChange(type.value)
                      }
                      className={`rounded-2xl border p-4 text-left transition ${
                        selected
                          ? "border-[#b85c78] bg-[#fff3f6]"
                          : "border-black/10 bg-white hover:border-black/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">
                          {type.label}
                        </span>

                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                            selected
                              ? "border-[#b85c78] bg-[#b85c78] text-white"
                              : "border-black/20"
                          }`}
                        >
                          {selected ? "✓" : ""}
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-black/45">
                        {type.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* REFERENCES */}
            <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                Step 02
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Add your reference
              </h2>

              <p className="mt-2 text-sm leading-6 text-black/45">
                Upload clear front and back images of the clothing design you
                want us to make.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="group cursor-pointer">
                  <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-black/10 bg-[#faf6f5] transition group-hover:border-[#b85c78]">
                    {frontPreview ? (
                      <img
                        src={frontPreview}
                        alt="Front reference preview"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <div className="px-6 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                          ↑
                        </div>

                        <p className="mt-4 font-semibold">
                          Front image
                        </p>

                        <p className="mt-2 text-xs leading-5 text-black/40">
                          Upload the front view of your reference.
                        </p>
                      </div>
                    )}

                    {frontPreview && (
                      <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold shadow-lg">
                        Change front image
                      </div>
                    )}
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) =>
                      handleImageChange(event, "front")
                    }
                  />
                </label>

                <label className="group cursor-pointer">
                  <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-black/10 bg-[#faf6f5] transition group-hover:border-[#b85c78]">
                    {backPreview ? (
                      <img
                        src={backPreview}
                        alt="Back reference preview"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <div className="px-6 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                          ↑
                        </div>

                        <p className="mt-4 font-semibold">
                          Back image
                        </p>

                        <p className="mt-2 text-xs leading-5 text-black/40">
                          Upload the back view of your reference.
                        </p>
                      </div>
                    )}

                    {backPreview && (
                      <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold shadow-lg">
                        Change back image
                      </div>
                    )}
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) =>
                      handleImageChange(event, "back")
                    }
                  />
                </label>
              </div>
            </section>

            {/* MEASUREMENTS */}
            <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col justify-between gap-5 sm:flex-row">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                    Step 03
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold">
                    Your measurements
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-black/45">
                    Only the measurements needed for{" "}
                    <strong className="text-black/70">
                      {dressTypes.find(
                        (item) => item.value === dressType
                      )?.label}
                    </strong>{" "}
                    are shown.
                  </p>
                </div>

                <div className="rounded-full bg-[#f8e8ed] px-4 py-2 text-xs font-semibold text-[#8f425d]">
                  {completedMeasurements}/{currentMeasurements.length}{" "}
                  completed
                </div>
              </div>

              <div className="mt-7 grid gap-3">
                {currentMeasurements.map((field) => {
                  const active = activeGuide === field.key;
                  const completed =
                    measurements[field.key]?.trim() !== "";

                  return (
                    <div
                      key={field.key}
                      className={`rounded-2xl border p-4 transition ${
                        active
                          ? "border-[#b85c78] bg-[#fff8fa]"
                          : "border-black/10"
                      }`}
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveGuide(field.key)
                          }
                          className="text-left"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                                completed
                                  ? "bg-[#b85c78] text-white"
                                  : "bg-[#f3eeee] text-black/45"
                              }`}
                            >
                              {completed ? "✓" : "?"}
                            </span>

                            <div>
                              <p className="text-sm font-semibold">
                                {field.label}
                              </p>

                              <p className="mt-1 text-xs text-black/40">
                                {field.description}
                              </p>
                            </div>
                          </div>
                        </button>

                        <div className="relative w-full sm:w-36">
                          <input
                            type="text"
                            inputMode="decimal"
                            value={measurements[field.key] || ""}
                            onChange={(event) =>
                              handleMeasurementChange(
                                field.key,
                                event.target.value
                              )
                            }
                            placeholder="0"
                            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 pr-12 text-sm outline-none transition focus:border-[#b85c78] focus:ring-2 focus:ring-[#b85c78]/10"
                          />

                          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-black/35">
                            {field.unit}
                          </span>
                        </div>
                      </div>

                      {active && (
                        <div className="mt-4 rounded-xl bg-white p-4 text-xs leading-5 text-black/50">
                          <strong className="text-black/70">
                            How to measure:
                          </strong>{" "}
                          {field.description} Keep the measuring tape
                          comfortably fitted without pulling it too tight.
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* MEASUREMENT GUIDE */}
              <div className="mt-6 rounded-3xl bg-[#f7f1ef] p-6">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl">
                    📏
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Measurement guide
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-black/50">
                      Use a soft measuring tape. Stand naturally and keep the
                      tape level around your body. Ask someone to help you for
                      more accurate measurements.
                    </p>

                    <p className="mt-3 text-xs font-medium text-[#8f425d]">
                      Tip: Do not pull the tape too tightly.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CUSTOMER */}
            <section className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                Step 04
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                Your contact details
              </h2>

              <p className="mt-2 text-sm leading-6 text-black/45">
                We need these details so our tailoring team can contact you
                about the order.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <label>
                    <span className="text-xs font-semibold">
                      Full name *
                    </span>

                    <input
                      type="text"
                      value={orderForm.name}
                      onChange={(event) =>
                        handleCustomerChange(
                          "name",
                          event.target.value
                        )
                      }
                      placeholder="Your name"
                      className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#b85c78]"
                    />
                  </label>

                  <label>
                    <span className="text-xs font-semibold">
                      WhatsApp number *
                    </span>

                    <input
                      type="tel"
                      value={orderForm.whatsapp}
                      onChange={(event) =>
                        handleCustomerChange(
                          "whatsapp",
                          event.target.value
                        )
                      }
                      placeholder="+94 7X XXX XXXX"
                      className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#b85c78]"
                    />
                  </label>
                </div>

                <label>
                  <span className="text-xs font-semibold">
                    Email
                  </span>

                  <input
                    type="email"
                    value={orderForm.email}
                    onChange={(event) =>
                      handleCustomerChange(
                        "email",
                        event.target.value
                      )
                    }
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#b85c78]"
                  />
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label>
                    <span className="text-xs font-semibold">
                      City *
                    </span>

                    <input
                      type="text"
                      value={orderForm.city}
                      onChange={(event) =>
                        handleCustomerChange(
                          "city",
                          event.target.value
                        )
                      }
                      placeholder="Colombo"
                      className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#b85c78]"
                    />
                  </label>

                  <label>
                    <span className="text-xs font-semibold">
                      Delivery address *
                    </span>

                    <input
                      type="text"
                      value={orderForm.address}
                      onChange={(event) =>
                        handleCustomerChange(
                          "address",
                          event.target.value
                        )
                      }
                      placeholder="Street / house / area"
                      className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#b85c78]"
                    />
                  </label>
                </div>

                <label>
                  <span className="text-xs font-semibold">
                    Additional notes
                  </span>

                  <textarea
                    value={orderForm.notes}
                    onChange={(event) =>
                      handleCustomerChange(
                        "notes",
                        event.target.value
                      )
                    }
                    placeholder="Any special request, fabric preference, sleeve style, colour, etc."
                    rows={5}
                    className="mt-2 w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#b85c78]"
                  />
                </label>

                {errorMessage && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#211b1d] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#b85c78]"
                >
                  Request custom order
                </button>
              </form>
            </section>
          </div>

          {/* RIGHT SIDE ESTIMATE */}
          <aside className="lg:sticky lg:top-6 lg:h-fit">
            <div className="rounded-[2rem] bg-[#211b1d] p-6 text-white shadow-xl sm:p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                Approximate estimate
              </p>

              <h2 className="mt-3 text-3xl font-semibold">
                {formatLKR(estimatedPrice - 1000)}
                <span className="mx-2 text-white/30">–</span>
                {formatLKR(estimatedPrice + 1500)}
              </h2>

              <p className="mt-4 text-xs leading-5 text-white/50">
                Estimated in Sri Lankan Rupees. This is not the final price.
              </p>

              <div className="mt-7 space-y-4 border-t border-white/10 pt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/55">
                    Garment
                  </span>

                  <span>
                    {
                      dressTypes.find(
                        (item) => item.value === dressType
                      )?.label
                    }
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/55">
                    Measurements
                  </span>

                  <span>
                    {completedMeasurements}/
                    {currentMeasurements.length}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/55">
                    Front reference
                  </span>

                  <span>
                    {frontImage ? "Added" : "Required"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/55">
                    Back reference
                  </span>

                  <span>
                    {backImage ? "Added" : "Required"}
                  </span>
                </div>
              </div>

              <div className="mt-7 rounded-2xl bg-white/[0.07] p-4">
                <p className="text-xs font-semibold">
                  What's included in the estimate?
                </p>

                <p className="mt-2 text-xs leading-5 text-white/45">
                  The estimate considers expected material cost, tailoring
                  work, delivery and the cost involved in sourcing suitable
                  materials.
                </p>
              </div>

              <div className="mt-5 rounded-2xl bg-[#b85c78] p-4">
                <p className="text-xs font-semibold">
                  Final price
                </p>

                <p className="mt-2 text-xs leading-5 text-white/80">
                  We will confirm the exact material, design and final price
                  with you through WhatsApp before production.
                </p>
              </div>
            </div>

            {/* ORDER CHECKLIST */}
            <div className="mt-5 rounded-[2rem] border border-black/10 bg-white p-6">
              <h3 className="font-semibold">
                Before submitting
              </h3>

              <div className="mt-5 space-y-3">
                <ChecklistItem
                  done={Boolean(frontImage)}
                  text="Front reference image"
                />

                <ChecklistItem
                  done={Boolean(backImage)}
                  text="Back reference image"
                />

                <ChecklistItem
                  done={
                    completedMeasurements ===
                    currentMeasurements.length
                  }
                  text="Required measurements"
                />

                <ChecklistItem
                  done={Boolean(orderForm.name.trim())}
                  text="Customer name"
                />

                <ChecklistItem
                  done={Boolean(orderForm.whatsapp.trim())}
                  text="WhatsApp number"
                />

                <ChecklistItem
                  done={
                    Boolean(orderForm.address.trim()) &&
                    Boolean(orderForm.city.trim())
                  }
                  text="Delivery details"
                />
              </div>
            </div>

            <div className="mt-5 rounded-[2rem] bg-[#f5eeec] p-6">
              <p className="text-sm font-semibold">
                Need help with measurements?
              </p>

              <p className="mt-2 text-xs leading-5 text-black/45">
                Select any measurement above to see an explanation of where
                and how to measure it.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function ChecklistItem({
  done,
  text,
}: {
  done: boolean;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
          done
            ? "bg-[#b85c78] text-white"
            : "bg-black/[0.05] text-black/30"
        }`}
      >
        {done ? "✓" : "•"}
      </div>

      <span
        className={`text-sm ${
          done ? "text-black/70" : "text-black/40"
        }`}
      >
        {text}
      </span>
    </div>
  );
}