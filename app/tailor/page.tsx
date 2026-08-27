"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Ruler,
  Upload,
  X,
  Image as ImageIcon,
  Check,
  ChevronDown,
  Scissors,
  Shirt,
  Sparkles,
  Send,
  Loader2,
  Camera,
  FileText,
  CircleCheck,
} from "lucide-react";

/* ============================================================
   TYPES
============================================================ */

type Unit = "cm" | "inches";

type DressType =
  | "dress"
  | "shirt"
  | "blouse"
  | "skirt"
  | "pants"
  | "jacket"
  | "coat"
  | "jumpsuit"
  | "saree"
  | "traditional";

type Measurement = {
  id: string;
  label: string;
  description?: string;
  required?: boolean;
};

/* ============================================================
   DRESS TYPES
============================================================ */

const dressTypes: {
  id: DressType;
  name: string;
  description: string;
}[] = [
  {
    id: "dress",
    name: "Dress",
    description: "Dresses, gowns and frocks",
  },
  {
    id: "shirt",
    name: "Shirt",
    description: "Formal or casual shirts",
  },
  {
    id: "blouse",
    name: "Blouse",
    description: "Blouses and tops",
  },
  {
    id: "skirt",
    name: "Skirt",
    description: "Mini, midi or maxi skirts",
  },
  {
    id: "pants",
    name: "Pants / Trousers",
    description: "Trousers and pants",
  },
  {
    id: "jacket",
    name: "Jacket",
    description: "Jackets and blazers",
  },
  {
    id: "coat",
    name: "Coat",
    description: "Coats and outerwear",
  },
  {
    id: "jumpsuit",
    name: "Jumpsuit",
    description: "One-piece jumpsuits",
  },
  {
    id: "saree",
    name: "Saree",
    description: "Saree blouse and related measurements",
  },
  {
    id: "traditional",
    name: "Traditional",
    description: "Traditional outfits",
  },
];

/* ============================================================
   MEASUREMENTS
============================================================ */

const measurementSets: Record<DressType, Measurement[]> = {
  dress: [
    {
      id: "bust",
      label: "Bust",
      description: "Around the fullest part of the bust",
      required: true,
    },
    {
      id: "waist",
      label: "Waist",
      description: "Around the natural waist",
      required: true,
    },
    {
      id: "hip",
      label: "Hip",
      description: "Around the fullest part of the hip",
      required: true,
    },
    {
      id: "shoulder",
      label: "Shoulder",
      description: "Shoulder point to shoulder point",
      required: true,
    },
    {
      id: "sleeveLength",
      label: "Sleeve Length",
      description: "Shoulder to desired sleeve end",
      required: true,
    },
    {
      id: "dressLength",
      label: "Dress Length",
      description: "Shoulder to desired dress hem",
      required: true,
    },
  ],

  shirt: [
    {
      id: "chest",
      label: "Chest",
      description: "Around the fullest part of the chest",
      required: true,
    },
    {
      id: "waist",
      label: "Waist",
      description: "Around the waist",
      required: true,
    },
    {
      id: "shoulder",
      label: "Shoulder",
      description: "Shoulder to shoulder",
      required: true,
    },
    {
      id: "neck",
      label: "Neck",
      description: "Around the base of the neck",
      required: true,
    },
    {
      id: "sleeveLength",
      label: "Sleeve Length",
      description: "Shoulder to sleeve end",
      required: true,
    },
    {
      id: "shirtLength",
      label: "Shirt Length",
      description: "Shoulder to desired shirt length",
      required: true,
    },
  ],

  blouse: [
    {
      id: "bust",
      label: "Bust",
      description: "Around the fullest part of the bust",
      required: true,
    },
    {
      id: "waist",
      label: "Waist",
      description: "Around the natural waist",
      required: true,
    },
    {
      id: "shoulder",
      label: "Shoulder",
      description: "Shoulder to shoulder",
      required: true,
    },
    {
      id: "neck",
      label: "Neck",
      description: "Around the base of the neck",
      required: true,
    },
    {
      id: "sleeveLength",
      label: "Sleeve Length",
      description: "Shoulder to sleeve end",
      required: true,
    },
    {
      id: "blouseLength",
      label: "Blouse Length",
      description: "Shoulder to desired blouse length",
      required: true,
    },
  ],

  skirt: [
    {
      id: "waist",
      label: "Waist",
      description: "Around the natural waist",
      required: true,
    },
    {
      id: "hip",
      label: "Hip",
      description: "Around the fullest part of the hip",
      required: true,
    },
    {
      id: "skirtLength",
      label: "Skirt Length",
      description: "Waist to desired skirt hem",
      required: true,
    },
  ],

  pants: [
    {
      id: "waist",
      label: "Waist",
      description: "Around the waist",
      required: true,
    },
    {
      id: "hip",
      label: "Hip",
      description: "Around the fullest part of the hip",
      required: true,
    },
    {
      id: "thigh",
      label: "Thigh",
      description: "Around the fullest part of the thigh",
      required: true,
    },
    {
      id: "inseam",
      label: "Inseam",
      description: "Crotch to ankle",
      required: true,
    },
    {
      id: "outseam",
      label: "Outseam",
      description: "Waist to ankle",
      required: true,
    },
    {
      id: "pantLength",
      label: "Pant Length",
      description: "Waist to desired pant hem",
      required: true,
    },
  ],

  jacket: [
    {
      id: "chest",
      label: "Chest",
      description: "Around the chest",
      required: true,
    },
    {
      id: "waist",
      label: "Waist",
      description: "Around the waist",
      required: true,
    },
    {
      id: "shoulder",
      label: "Shoulder",
      description: "Shoulder to shoulder",
      required: true,
    },
    {
      id: "sleeveLength",
      label: "Sleeve Length",
      description: "Shoulder to sleeve end",
      required: true,
    },
    {
      id: "jacketLength",
      label: "Jacket Length",
      description: "Shoulder to jacket hem",
      required: true,
    },
  ],

  coat: [
    {
      id: "chest",
      label: "Chest",
      description: "Around the chest",
      required: true,
    },
    {
      id: "waist",
      label: "Waist",
      description: "Around the waist",
      required: true,
    },
    {
      id: "hip",
      label: "Hip",
      description: "Around the fullest part of the hip",
      required: true,
    },
    {
      id: "shoulder",
      label: "Shoulder",
      description: "Shoulder to shoulder",
      required: true,
    },
    {
      id: "sleeveLength",
      label: "Sleeve Length",
      description: "Shoulder to sleeve end",
      required: true,
    },
    {
      id: "coatLength",
      label: "Coat Length",
      description: "Shoulder to coat hem",
      required: true,
    },
  ],

  jumpsuit: [
    {
      id: "bust",
      label: "Bust",
      description: "Around the fullest part of the bust",
      required: true,
    },
    {
      id: "waist",
      label: "Waist",
      description: "Around the natural waist",
      required: true,
    },
    {
      id: "hip",
      label: "Hip",
      description: "Around the fullest part of the hip",
      required: true,
    },
    {
      id: "shoulder",
      label: "Shoulder",
      description: "Shoulder to shoulder",
      required: true,
    },
    {
      id: "sleeveLength",
      label: "Sleeve Length",
      description: "Shoulder to sleeve end",
      required: true,
    },
    {
      id: "fullLength",
      label: "Full Length",
      description: "Shoulder to desired bottom",
      required: true,
    },
  ],

  saree: [
    {
      id: "bust",
      label: "Bust",
      description: "Around the fullest part of the bust",
      required: true,
    },
    {
      id: "underBust",
      label: "Under Bust",
      description: "Around the ribcage below the bust",
      required: true,
    },
    {
      id: "waist",
      label: "Waist",
      description: "Around the natural waist",
      required: true,
    },
    {
      id: "shoulder",
      label: "Shoulder",
      description: "Shoulder to shoulder",
      required: true,
    },
    {
      id: "blouseLength",
      label: "Blouse Length",
      description: "Shoulder to blouse hem",
      required: true,
    },
    {
      id: "sleeveLength",
      label: "Sleeve Length",
      description: "Shoulder to sleeve end",
      required: true,
    },
  ],

  traditional: [
    {
      id: "bust",
      label: "Bust",
      description: "Around the fullest part of the bust",
      required: true,
    },
    {
      id: "waist",
      label: "Waist",
      description: "Around the natural waist",
      required: true,
    },
    {
      id: "hip",
      label: "Hip",
      description: "Around the fullest part of the hip",
      required: true,
    },
    {
      id: "shoulder",
      label: "Shoulder",
      description: "Shoulder to shoulder",
      required: true,
    },
    {
      id: "sleeveLength",
      label: "Sleeve Length",
      description: "Shoulder to sleeve end",
      required: true,
    },
    {
      id: "garmentLength",
      label: "Garment Length",
      description: "Shoulder to desired hem",
      required: true,
    },
  ],
};

/* ============================================================
   COMPONENT
============================================================ */

export default function TailorPage() {
  const frontInputRef = useRef<HTMLInputElement | null>(null);
  const backInputRef = useRef<HTMLInputElement | null>(null);

  const [dressType, setDressType] =
    useState<DressType | null>(null);

  const [unit, setUnit] = useState<Unit>("cm");

  const [frontImage, setFrontImage] = useState("");
  const [backImage, setBackImage] = useState("");

  const [frontFileName, setFrontFileName] = useState("");
  const [backFileName, setBackFileName] = useState("");

  const [measurements, setMeasurements] =
    useState<Record<string, string>>({});

  const [notes, setNotes] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* ============================================================
     IMAGE READER
  ============================================================ */

  function readImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Unable to read image."));
        }
      };

      reader.onerror = () => {
        reject(new Error("Unable to read image."));
      };

      reader.readAsDataURL(file);
    });
  }

  /* ============================================================
     IMAGE VALIDATION
  ============================================================ */

  async function handleImageUpload(
    file: File | undefined,
    side: "front" | "back"
  ) {
    if (!file) return;

    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be smaller than 10MB.");
      return;
    }

    try {
      const image = await readImage(file);

      if (side === "front") {
        setFrontImage(image);
        setFrontFileName(file.name);
      } else {
        setBackImage(image);
        setBackFileName(file.name);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to upload image."
      );
    }
  }

  /* ============================================================
     REMOVE IMAGE
  ============================================================ */

  function removeImage(side: "front" | "back") {
    if (side === "front") {
      setFrontImage("");
      setFrontFileName("");

      if (frontInputRef.current) {
        frontInputRef.current.value = "";
      }
    } else {
      setBackImage("");
      setBackFileName("");

      if (backInputRef.current) {
        backInputRef.current.value = "";
      }
    }
  }

  /* ============================================================
     DRESS TYPE CHANGE
  ============================================================ */

  function changeDressType(type: DressType) {
    setDressType(type);

    // Clear measurements from previous dress type
    setMeasurements({});

    setError("");
    setSuccess(false);
  }

  /* ============================================================
     MEASUREMENT CHANGE
  ============================================================ */

  function updateMeasurement(
    id: string,
    value: string
  ) {
    // Only allow numbers and decimal point
    if (!/^\d*\.?\d*$/.test(value)) {
      return;
    }

    setMeasurements((previous) => ({
      ...previous,
      [id]: value,
    }));
  }

  /* ============================================================
     SUBMIT
  ============================================================ */

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess(false);

    if (!dressType) {
      setError("Please select a dress type.");
      return;
    }

    if (!frontImage) {
      setError("Please upload the front image.");
      return;
    }

    if (!backImage) {
      setError("Please upload the back image.");
      return;
    }

    const requiredMeasurements =
      measurementSets[dressType];

    const missingMeasurements =
      requiredMeasurements.filter(
        (measurement) =>
          measurement.required &&
          !measurements[measurement.id]?.trim()
      );

    if (missingMeasurements.length > 0) {
      setError(
        `Please enter: ${missingMeasurements
          .map((item) => item.label)
          .join(", ")}`
      );
      return;
    }

    try {
      setSubmitting(true);

      /*
       * Currently this creates the customer request
       * on the browser only.
       *
       * Later you can connect this to:
       * /api/tailor
       * WhatsApp
       * email
       * database
       */

      const orderData = {
        dressType,
        unit,
        frontImage,
        backImage,
        measurements,
        notes,
      };

      console.log(
        "TAILOR ORDER:",
        orderData
      );

      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      setSuccess(true);
    } catch (err) {
      console.error(err);

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  /* ============================================================
     CURRENT MEASUREMENTS
  ============================================================ */

  const currentMeasurements = dressType
    ? measurementSets[dressType]
    : [];

  const selectedDress = dressTypes.find(
    (item) => item.id === dressType
  );

  /* ============================================================
     PAGE
  ============================================================ */

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f4ef] text-[#111]">
      {/* ========================================================
          HEADER
      ======================================================== */}

      <header className="sticky top-0 z-50 border-b border-black/[0.07] bg-[#f6f4ef]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[70px] max-w-[1450px] items-center justify-between px-5 sm:px-7 lg:px-10">
          <Link
            href="/"
            className="group flex items-center gap-2.5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white transition-all group-hover:-translate-x-0.5 group-hover:bg-black group-hover:text-white">
              <ArrowLeft size={15} />
            </span>

            <span className="hidden text-sm font-semibold sm:block">
              Back
            </span>
          </Link>

          <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">
              <Scissors size={16} />
            </div>

            <span className="text-sm font-bold">
              Custom Tailoring
            </span>
          </div>

          <Link
            href="/shop"
            className="rounded-full border border-black/10 bg-white px-4 py-2.5 text-xs font-semibold transition hover:bg-black hover:text-white sm:px-5 sm:text-sm"
          >
            Shop
          </Link>
        </div>
      </header>

      {/* ========================================================
          HERO
      ======================================================== */}

      <section className="mx-auto max-w-[1450px] px-5 pb-10 pt-12 sm:px-7 sm:pt-16 lg:px-10 lg:pb-14 lg:pt-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] shadow-sm">
            <Sparkles size={12} />
            Custom Tailoring
          </div>

          <h1 className="mt-6 text-[42px] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-[72px]">
            Your dress.
            <br />
            <span className="text-black/40">
              Your measurements.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-black/50 sm:text-base lg:text-lg">
            Select your garment type, upload the front
            and back reference images, and enter only
            the measurements needed for your garment.
          </p>
        </div>
      </section>

      {/* ========================================================
          ERROR
      ======================================================== */}

      {error && (
        <div className="mx-auto max-w-[1450px] px-5 sm:px-7 lg:px-10">
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            <X
              size={17}
              className="mt-0.5 shrink-0"
            />

            <span>{error}</span>
          </div>
        </div>
      )}

      {/* ========================================================
          SUCCESS
      ======================================================== */}

      {success && (
        <div className="mx-auto max-w-[1450px] px-5 sm:px-7 lg:px-10">
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-700">
            <CircleCheck
              size={18}
              className="mt-0.5 shrink-0"
            />

            <div>
              <p className="font-bold">
                Tailoring request ready!
              </p>

              <p className="mt-1 text-xs">
                Your dress type, images and measurements
                have been collected successfully.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MAIN
      ======================================================== */}

      <form
        onSubmit={handleSubmit}
        className="mx-auto grid max-w-[1450px] items-start gap-6 px-5 pb-24 sm:px-7 lg:grid-cols-[430px_minmax(0,1fr)] lg:gap-7 lg:px-10"
      >
        {/* ======================================================
            LEFT
        ====================================================== */}

        <aside className="space-y-5">
          {/* ====================================================
              DRESS TYPE
          ==================================================== */}

          <section className="rounded-[28px] border border-black/[0.07] bg-white p-5 shadow-[0_18px_60px_rgba(0,0,0,0.035)] sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                <Shirt size={17} />
              </div>

              <div>
                <h2 className="text-sm font-bold">
                  01. Dress Type
                </h2>

                <p className="mt-1 text-[11px] text-black/40">
                  Choose what you want tailored
                </p>
              </div>
            </div>

            <div className="relative mt-5">
              <select
                value={dressType || ""}
                onChange={(event) =>
                  changeDressType(
                    event.target.value as DressType
                  )
                }
                className="w-full appearance-none rounded-2xl border border-black/[0.09] bg-[#faf9f6] px-4 py-4 pr-11 text-sm font-semibold outline-none transition focus:border-black/30 focus:bg-white focus:ring-4 focus:ring-black/[0.035]"
              >
                <option value="">
                  Select dress type
                </option>

                {dressTypes.map((type) => (
                  <option
                    key={type.id}
                    value={type.id}
                  >
                    {type.name}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/35"
              />
            </div>

            {selectedDress && (
              <div className="mt-4 rounded-2xl bg-[#faf9f6] p-4">
                <p className="text-sm font-bold">
                  {selectedDress.name}
                </p>

                <p className="mt-1 text-xs leading-5 text-black/40">
                  {selectedDress.description}
                </p>
              </div>
            )}
          </section>

          {/* ====================================================
              UNIT
          ==================================================== */}

          <section className="rounded-[28px] border border-black/[0.07] bg-white p-5 shadow-[0_18px_60px_rgba(0,0,0,0.035)] sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                  <Ruler size={17} />
                </div>

                <div>
                  <h2 className="text-sm font-bold">
                    Measurement Unit
                  </h2>

                  <p className="mt-1 text-[11px] text-black/40">
                    Choose your preferred unit
                  </p>
                </div>
              </div>

              <div className="flex rounded-full bg-[#f4f1eb] p-1">
                <button
                  type="button"
                  onClick={() => setUnit("cm")}
                  className={`rounded-full px-4 py-2 text-[10px] font-bold transition ${
                    unit === "cm"
                      ? "bg-black text-white"
                      : "text-black/40"
                  }`}
                >
                  CM
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setUnit("inches")
                  }
                  className={`rounded-full px-4 py-2 text-[10px] font-bold transition ${
                    unit === "inches"
                      ? "bg-black text-white"
                      : "text-black/40"
                  }`}
                >
                  IN
                </button>
              </div>
            </div>
          </section>

          {/* ====================================================
              MEASUREMENTS
          ==================================================== */}

          <section
            className={`rounded-[28px] border border-black/[0.07] bg-white shadow-[0_18px_60px_rgba(0,0,0,0.035)] ${
              !dressType ? "opacity-70" : ""
            }`}
          >
            <div className="border-b border-black/[0.06] p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                  <Ruler size={17} />
                </div>

                <div>
                  <h2 className="text-sm font-bold">
                    03. Measurements
                  </h2>

                  <p className="mt-1 text-[11px] text-black/40">
                    Only required measurements are shown
                  </p>
                </div>
              </div>
            </div>

            {!dressType ? (
              <div className="p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f3f0ea]">
                  <Ruler size={19} />
                </div>

                <p className="mt-4 text-sm font-bold">
                  Select a dress type
                </p>

                <p className="mx-auto mt-2 max-w-xs text-[11px] leading-5 text-black/40">
                  We will automatically show only
                  the measurements needed for that
                  garment.
                </p>
              </div>
            ) : (
              <div className="space-y-5 p-5 sm:p-6">
                {currentMeasurements.map(
                  (measurement) => (
                    <div key={measurement.id}>
                      <div className="flex items-center justify-between gap-3">
                        <label
                          htmlFor={measurement.id}
                          className="text-xs font-bold"
                        >
                          {measurement.label}

                          {measurement.required && (
                            <span className="ml-1 text-black/30">
                              *
                            </span>
                          )}
                        </label>

                        <span className="text-[9px] font-bold uppercase tracking-wider text-black/30">
                          {unit}
                        </span>
                      </div>

                      <div className="relative mt-2.5">
                        <input
                          id={measurement.id}
                          type="text"
                          inputMode="decimal"
                          value={
                            measurements[
                              measurement.id
                            ] || ""
                          }
                          onChange={(event) =>
                            updateMeasurement(
                              measurement.id,
                              event.target.value
                            )
                          }
                          placeholder="Enter measurement"
                          className="w-full rounded-2xl border border-black/[0.09] bg-[#faf9f6] px-4 py-3.5 pr-16 text-sm font-medium outline-none transition focus:border-black/30 focus:bg-white focus:ring-4 focus:ring-black/[0.035]"
                        />

                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase text-black/30">
                          {unit}
                        </span>
                      </div>

                      {measurement.description && (
                        <p className="mt-1.5 text-[10px] leading-5 text-black/35">
                          {measurement.description}
                        </p>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </section>

          {/* ====================================================
              NOTES
          ==================================================== */}

          {dressType && (
            <section className="rounded-[28px] border border-black/[0.07] bg-white p-5 shadow-[0_18px_60px_rgba(0,0,0,0.035)] sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                  <FileText size={16} />
                </div>

                <div>
                  <h2 className="text-sm font-bold">
                    Additional Notes
                  </h2>

                  <p className="mt-1 text-[11px] text-black/40">
                    Optional instructions
                  </p>
                </div>
              </div>

              <textarea
                value={notes}
                onChange={(event) =>
                  setNotes(event.target.value)
                }
                placeholder="Example: Please make the waist slightly loose..."
                className="mt-5 min-h-[120px] w-full resize-none rounded-2xl border border-black/[0.09] bg-[#faf9f6] p-4 text-sm leading-6 outline-none transition focus:border-black/25 focus:bg-white focus:ring-4 focus:ring-black/[0.035]"
              />
            </section>
          )}
        </aside>

        {/* ======================================================
            RIGHT WORKSPACE
        ====================================================== */}

        <section className="min-w-0">
          <div className="overflow-hidden rounded-[32px] border border-black/[0.07] bg-[#e9e5de] shadow-[0_25px_90px_rgba(0,0,0,0.055)]">
            {/* ==================================================
                WORKSPACE HEADER
            ================================================== */}

            <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-5 sm:px-7">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-black" />

                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-black/35">
                    Tailor Workspace
                  </p>
                </div>

                <h2 className="mt-1.5 text-lg font-bold tracking-tight">
                  Reference Images
                </h2>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
                <Camera size={15} />
              </div>
            </div>

            {/* ==================================================
                IMAGE AREA
            ================================================== */}

            <div className="grid gap-5 p-4 sm:p-7 lg:grid-cols-2">
              {/* FRONT */}
              <ImageUploadCard
                title="Front Image"
                description="Upload the front view of the dress"
                image={frontImage}
                fileName={frontFileName}
                inputRef={frontInputRef}
                onUpload={(file) =>
                  handleImageUpload(file, "front")
                }
                onRemove={() =>
                  removeImage("front")
                }
              />

              {/* BACK */}
              <ImageUploadCard
                title="Back Image"
                description="Upload the back view of the dress"
                image={backImage}
                fileName={backFileName}
                inputRef={backInputRef}
                onUpload={(file) =>
                  handleImageUpload(file, "back")
                }
                onRemove={() =>
                  removeImage("back")
                }
              />
            </div>

            {/* ==================================================
                ORDER SUMMARY
            ================================================== */}

            <div className="border-t border-black/[0.06] p-5 sm:p-7">
              <div className="rounded-[26px] bg-white p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                    <Check size={17} />
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/30">
                      Order Summary
                    </p>

                    <h3 className="mt-1 text-sm font-bold">
                      {selectedDress
                        ? selectedDress.name
                        : "No dress selected"}
                    </h3>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <SummaryItem
                    label="Dress"
                    value={
                      selectedDress?.name ||
                      "Not selected"
                    }
                  />

                  <SummaryItem
                    label="Front Image"
                    value={
                      frontImage
                        ? "Uploaded"
                        : "Not uploaded"
                    }
                  />

                  <SummaryItem
                    label="Back Image"
                    value={
                      backImage
                        ? "Uploaded"
                        : "Not uploaded"
                    }
                  />
                </div>

                {dressType && (
                  <div className="mt-4 rounded-2xl bg-[#faf9f6] p-4">
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-black/30">
                      Measurements
                    </p>

                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {currentMeasurements.map(
                        (measurement) => (
                          <div
                            key={measurement.id}
                            className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5"
                          >
                            <span className="text-[11px] font-medium text-black/50">
                              {measurement.label}
                            </span>

                            <span className="text-xs font-bold">
                              {measurements[
                                measurement.id
                              ]
                                ? `${measurements[
                                    measurement.id
                                  ]} ${unit}`
                                : "—"}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* ==================================================
                    SUBMIT
                ================================================== */}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-black py-4 text-sm font-bold text-white shadow-[0_15px_40px_rgba(0,0,0,0.16)] transition-all hover:-translate-y-0.5 hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  {submitting ? (
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                  ) : (
                    <Send size={17} />
                  )}

                  {submitting
                    ? "Preparing Request..."
                    : "Submit Tailoring Request"}
                </button>

                <p className="mt-4 text-center text-[10px] leading-5 text-black/35">
                  Please check your measurements and
                  images before submitting.
                </p>
              </div>
            </div>
          </div>
        </section>
      </form>

      {/* ========================================================
          FOOTER INFO
      ======================================================== */}

      <section className="mx-auto max-w-[1450px] px-5 pb-20 sm:px-7 lg:px-10">
        <div className="grid gap-4 md:grid-cols-3">
          <InfoCard
            number="01"
            title="Choose your garment"
            text="Select the type of dress you want tailored."
          />

          <InfoCard
            number="02"
            title="Upload both views"
            text="Provide clear front and back images of the reference garment."
          />

          <InfoCard
            number="03"
            title="Enter measurements"
            text="Only measurements relevant to your selected garment are requested."
          />
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   IMAGE UPLOAD CARD
============================================================ */

function ImageUploadCard({
  title,
  description,
  image,
  fileName,
  inputRef,
  onUpload,
  onRemove,
}: {
  title: string;
  description: string;
  image: string;
  fileName: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onUpload: (file: File | undefined) => void;
  onRemove: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-[26px] border border-black/[0.07] bg-[#faf9f6]">
      <div className="border-b border-black/[0.06] px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold">
              {title}
            </p>

            <p className="mt-1 text-[10px] text-black/40">
              {description}
            </p>
          </div>

          {image && (
            <span className="flex items-center gap-1.5 rounded-full bg-black px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white">
              <Check size={10} />
              Ready
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(event) =>
            onUpload(event.target.files?.[0])
          }
        />

        {image ? (
          <div className="relative overflow-hidden rounded-[22px] bg-white">
            <img
              src={image}
              alt={title}
              className="h-[430px] w-full object-contain"
            />

            <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/70 bg-white/90 px-3 py-2 text-[9px] font-bold uppercase tracking-wider shadow-sm backdrop-blur">
              <CircleCheck size={11} />
              {title}
            </div>

            <button
              type="button"
              onClick={onRemove}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black text-white shadow-lg transition hover:scale-105"
              aria-label={`Remove ${title}`}
            >
              <X size={15} />
            </button>

            <div className="absolute bottom-3 left-3 right-3 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 backdrop-blur-xl">
              <p className="truncate text-xs font-semibold">
                {fileName}
              </p>

              <button
                type="button"
                onClick={() =>
                  inputRef.current?.click()
                }
                className="mt-1 text-[10px] font-bold text-black/40 transition hover:text-black"
              >
                Change image
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() =>
              inputRef.current?.click()
            }
            className="group flex h-[430px] w-full flex-col items-center justify-center rounded-[22px] border border-dashed border-black/15 bg-white px-5 transition hover:border-black/30 hover:shadow-inner"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#f4f1eb] transition group-hover:-translate-y-1 group-hover:bg-black group-hover:text-white">
              <Upload size={22} />
            </span>

            <span className="mt-5 text-sm font-bold">
              Upload {title}
            </span>

            <span className="mt-2 max-w-xs text-center text-[11px] leading-5 text-black/40">
              PNG, JPG or WebP
              <br />
              Maximum 10MB
            </span>

            <span className="mt-5 rounded-full bg-black px-5 py-2.5 text-[10px] font-bold text-white">
              Choose Image
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   SUMMARY ITEM
============================================================ */

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-[#faf9f6] p-4">
      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-black/30">
        {label}
      </p>

      <p className="mt-2 text-xs font-bold">
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   INFO CARD
============================================================ */

function InfoCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[26px] border border-black/[0.07] bg-white p-6 shadow-[0_15px_50px_rgba(0,0,0,0.025)]">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f4f1eb]">
          <Ruler size={18} />
        </div>

        <span className="text-[10px] font-bold tracking-wider text-black/20">
          {number}
        </span>
      </div>

      <h3 className="mt-6 text-sm font-bold">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-6 text-black/40">
        {text}
      </p>
    </div>
  );
}