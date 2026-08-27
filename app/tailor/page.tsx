"use client";

import { ChangeEvent, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Image as ImageIcon,
  Ruler,
  Sparkles,
  Upload,
  X,
} from "lucide-react";

type DressType =
  | "dress"
  | "blouse"
  | "shirt"
  | "skirt"
  | "trousers"
  | "saree"
  | "kurta";

type MeasurementField = {
  key: string;
  label: string;
  description: string;
  unit: string;
};

type GeneratedImage = {
  url: string;
};

const MEASUREMENTS: Record<DressType, MeasurementField[]> = {
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
      description: "Measure from one shoulder point to the other.",
      unit: "cm",
    },
    {
      key: "dressLength",
      label: "Dress Length",
      description: "Measure from your shoulder to the desired hem.",
      unit: "cm",
    },
    {
      key: "sleeveLength",
      label: "Sleeve Length",
      description: "Measure from shoulder to the desired sleeve end.",
      unit: "cm",
    },
  ],

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
      description: "Measure around your natural waist.",
      unit: "cm",
    },
    {
      key: "shoulder",
      label: "Shoulder",
      description: "Measure across your shoulders.",
      unit: "cm",
    },
    {
      key: "blouseLength",
      label: "Blouse Length",
      description: "Measure from shoulder to the desired bottom.",
      unit: "cm",
    },
    {
      key: "sleeveLength",
      label: "Sleeve Length",
      description: "Measure from shoulder to sleeve end.",
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
      description: "Measure across your shoulders.",
      unit: "cm",
    },
    {
      key: "shirtLength",
      label: "Shirt Length",
      description: "Measure from shoulder to the desired bottom.",
      unit: "cm",
    },
    {
      key: "sleeveLength",
      label: "Sleeve Length",
      description: "Measure from shoulder to sleeve end.",
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
      description: "Measure from waist to desired hem.",
      unit: "cm",
    },
  ],

  trousers: [
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
      description: "Measure from the crotch to the ankle.",
      unit: "cm",
    },
    {
      key: "trouserLength",
      label: "Trouser Length",
      description: "Measure from waist to desired bottom.",
      unit: "cm",
    },
  ],

  saree: [
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
      key: "blouseBust",
      label: "Blouse Bust",
      description: "Measure around the fullest part of your bust.",
      unit: "cm",
    },
    {
      key: "blouseLength",
      label: "Blouse Length",
      description: "Measure from shoulder to blouse bottom.",
      unit: "cm",
    },
  ],

  kurta: [
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
      description: "Measure across your shoulders.",
      unit: "cm",
    },
    {
      key: "kurtaLength",
      label: "Kurta Length",
      description: "Measure from shoulder to desired hem.",
      unit: "cm",
    },
    {
      key: "sleeveLength",
      label: "Sleeve Length",
      description: "Measure from shoulder to sleeve end.",
      unit: "cm",
    },
  ],
};

const DRESS_NAMES: Record<DressType, string> = {
  dress: "Dress",
  blouse: "Blouse",
  shirt: "Shirt",
  skirt: "Skirt",
  trousers: "Trousers",
  saree: "Saree",
  kurta: "Kurta",
};

function getPuter(): any {
  if (typeof window === "undefined") {
    return null;
  }

  const win = window as any;

  if (!win.puter) {
    return null;
  }

  return win.puter;
}

function getImageUrl(result: any): string | null {
  if (!result) {
    return null;
  }

  if (typeof result === "string") {
    return result;
  }

  if (typeof result.url === "string") {
    return result.url;
  }

  if (typeof result.src === "string") {
    return result.src;
  }

  if (typeof result.imageUrl === "string") {
    return result.imageUrl;
  }

  if (typeof result.data?.url === "string") {
    return result.data.url;
  }

  if (typeof result.image?.url === "string") {
    return result.image.url;
  }

  if (typeof result.image?.src === "string") {
    return result.image.src;
  }

  return null;
}

export default function TailorPage() {
  const [dressType, setDressType] = useState<DressType>("dress");

  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);

  const [measurements, setMeasurements] = useState<
    Record<string, string>
  >({});

  const [prompt, setPrompt] = useState("");

  const [activeGuide, setActiveGuide] = useState<string | null>(null);

  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>(
    []
  );

  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fields = useMemo(() => {
    return MEASUREMENTS[dressType];
  }, [dressType]);

  function handleDressChange(type: DressType) {
    setDressType(type);
    setMeasurements({});
    setGeneratedImages([]);
    setError("");
    setMessage("");
  }

  function handleImageUpload(
    event: ChangeEvent<HTMLInputElement>,
    side: "front" | "back"
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be smaller than 10MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== "string") {
        setError("Unable to read the image.");
        return;
      }

      if (side === "front") {
        setFrontImage(result);
      } else {
        setBackImage(result);
      }

      setError("");
    };

    reader.readAsDataURL(file);
  }

  function removeImage(side: "front" | "back") {
    if (side === "front") {
      setFrontImage(null);
    } else {
      setBackImage(null);
    }
  }

  function updateMeasurement(key: string, value: string) {
    setMeasurements((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  function validateMeasurements() {
    for (const field of fields) {
      const value = measurements[field.key];

      if (!value || Number(value) <= 0) {
        return `Please enter your ${field.label}.`;
      }
    }

    return null;
  }

  async function generateDesign() {
    setError("");
    setMessage("");
    setGeneratedImages([]);

    if (!frontImage && !backImage && !prompt.trim()) {
      setError(
        "Upload a front/back reference image or enter a design prompt."
      );
      return;
    }

    const measurementError = validateMeasurements();

    if (measurementError) {
      setError(measurementError);
      return;
    }

    const puter = getPuter();

    if (!puter?.ai?.txt2img) {
      setError(
        "Puter.js is not available. Please make sure the Puter.js script is loaded in your layout."
      );
      return;
    }

    const measurementText = fields
      .map((field) => {
        const value = measurements[field.key];

        return `${field.label}: ${value}${field.unit}`;
      })
      .join(", ");

    const referenceText =
      frontImage || backImage
        ? "Use the uploaded front and back reference images as the main garment reference. Preserve the important garment structure, silhouette, neckline, sleeves, proportions, fabric appearance and design details."
        : "Create the garment from the user's written design description.";

    const userPrompt = prompt.trim()
      ? `User design instructions: ${prompt.trim()}`
      : "Create a professional fashion mockup based on the reference.";

    const finalPrompt = `
Create a professional fashion design mockup.

Garment type: ${DRESS_NAMES[dressType]}.

${referenceText}

${userPrompt}

Measurements:
${measurementText}

Important:
- Create a realistic garment design.
- Keep the garment type correct.
- Respect the provided measurements and proportions.
- Preserve the reference design when reference images are provided.
- Do not randomly change the garment structure.
- Show a clean professional fashion presentation.
- The output should look like a real clothing design/mockup.
- Do not place measurement numbers or technical text over the garment.
`;

    setGenerating(true);

    try {
      const options = {
        width: 1024,
        height: 1024,
      };

      let result: any;

      /*
       * Puter.js API.
       *
       * Different Puter.js versions can return different image objects,
       * therefore the result is handled through getImageUrl().
       */
      result = await puter.ai.txt2img(finalPrompt, options);

      const imageUrl = getImageUrl(result);

      if (!imageUrl) {
        console.error("Unexpected Puter image result:", result);

        setError(
          "Puter generated an image, but the returned image URL could not be found."
        );

        return;
      }

      setGeneratedImages([
        {
          url: imageUrl,
        },
      ]);

      setMessage("Your fashion mockup has been generated.");
    } catch (generationError) {
      console.error("PUTER IMAGE GENERATION ERROR:", generationError);

      setError(
        generationError instanceof Error
          ? generationError.message
          : "Image generation failed."
      );
    } finally {
      setGenerating(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fffaf9] text-[#211b1d]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#fffaf9]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#211b1d] text-white">
              <Sparkles size={18} />
            </div>

            <div>
              <p className="text-lg font-semibold">
                Atelier AI
              </p>

              <p className="text-[10px] uppercase tracking-[0.25em] text-black/40">
                Tailor Studio
              </p>
            </div>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-black hover:text-white"
          >
            <ArrowLeft size={15} />
            Home
          </Link>
        </div>
      </header>

      {/* INTRO */}
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-12 lg:px-8 lg:pt-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#dca5b7]/40 bg-[#f8e8ed] px-4 py-2 text-xs font-medium text-[#8f425d]">
            <Ruler size={14} />
            Custom fashion design
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
            Design your perfect garment.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-black/50">
            Choose your garment, upload front and back references, enter only
            the measurements that matter, and describe anything you want to
            customize.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* DRESS TYPE */}
            <div className="rounded-[2rem] border border-black/[0.07] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                    Step 01
                  </p>

                  <h2 className="mt-2 text-xl font-semibold">
                    Choose garment
                  </h2>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8e8ed] text-[#b85c78]">
                  <Sparkles size={17} />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {(Object.keys(DRESS_NAMES) as DressType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleDressChange(type)}
                    className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                      dressType === type
                        ? "border-[#b85c78] bg-[#f8e8ed] text-[#8f425d]"
                        : "border-black/10 hover:border-black/20"
                    }`}
                  >
                    {DRESS_NAMES[type]}
                  </button>
                ))}
              </div>
            </div>

            {/* REFERENCES */}
            <div className="rounded-[2rem] border border-black/[0.07] bg-white p-6 shadow-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                  Step 02
                </p>

                <h2 className="mt-2 text-xl font-semibold">
                  Reference images
                </h2>

                <p className="mt-2 text-sm leading-6 text-black/45">
                  Upload the front and back of the garment. You can also create
                  a design using only your written prompt.
                </p>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {/* FRONT */}
                <ReferenceUpload
                  title="Front reference"
                  image={frontImage}
                  onUpload={(event) =>
                    handleImageUpload(event, "front")
                  }
                  onRemove={() => removeImage("front")}
                />

                {/* BACK */}
                <ReferenceUpload
                  title="Back reference"
                  image={backImage}
                  onUpload={(event) =>
                    handleImageUpload(event, "back")
                  }
                  onRemove={() => removeImage("back")}
                />
              </div>
            </div>

            {/* MEASUREMENTS */}
            <div className="rounded-[2rem] border border-black/[0.07] bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                    Step 03
                  </p>

                  <h2 className="mt-2 text-xl font-semibold">
                    Your measurements
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-black/45">
                    Only measurements required for{" "}
                    {DRESS_NAMES[dressType].toLowerCase()} are shown.
                  </p>
                </div>

                <Ruler className="mt-1 text-[#b85c78]" size={21} />
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {fields.map((field) => (
                  <div key={field.key}>
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor={field.key}
                        className="text-sm font-medium"
                      >
                        {field.label}
                      </label>

                      <button
                        type="button"
                        onClick={() =>
                          setActiveGuide(
                            activeGuide === field.key
                              ? null
                              : field.key
                          )
                        }
                        className="text-xs font-medium text-[#b85c78] hover:underline"
                      >
                        How to measure
                      </button>
                    </div>

                    <div className="relative">
                      <input
                        id={field.key}
                        type="number"
                        min="0"
                        step="0.1"
                        value={measurements[field.key] || ""}
                        onChange={(event) =>
                          updateMeasurement(
                            field.key,
                            event.target.value
                          )
                        }
                        placeholder="Enter measurement"
                        className="w-full rounded-2xl border border-black/10 bg-[#fffaf9] px-4 py-3 pr-14 text-sm outline-none transition focus:border-[#b85c78] focus:ring-2 focus:ring-[#b85c78]/10"
                      />

                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-black/35">
                        {field.unit}
                      </span>
                    </div>

                    {activeGuide === field.key && (
                      <div className="mt-2 rounded-2xl bg-[#f8e8ed] p-4 text-xs leading-5 text-[#6f3a4b]">
                        <div className="flex gap-2">
                          <Ruler
                            size={15}
                            className="mt-0.5 shrink-0"
                          />

                          <span>{field.description}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* PROMPT */}
            <div className="rounded-[2rem] border border-black/[0.07] bg-white p-6 shadow-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                  Step 04
                </p>

                <h2 className="mt-2 text-xl font-semibold">
                  Describe your design
                </h2>

                <p className="mt-2 text-sm leading-6 text-black/45">
                  Tell the AI what you want. For example: change the fabric,
                  color, sleeve style, neckline or embroidery.
                </p>
              </div>

              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Example: Keep the same shape but make it deep emerald green with long puff sleeves and subtle gold embroidery..."
                rows={6}
                className="mt-5 w-full resize-none rounded-2xl border border-black/10 bg-[#fffaf9] p-4 text-sm leading-6 outline-none transition focus:border-[#b85c78] focus:ring-2 focus:ring-[#b85c78]/10"
              />
            </div>

            {/* GENERATE */}
            <div className="rounded-[2rem] bg-[#211b1d] p-6 text-white shadow-xl">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f0c5d1] text-[#211b1d]">
                  <Sparkles size={19} />
                </div>

                <div>
                  <h2 className="font-semibold">
                    Ready to create?
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-white/45">
                    Puter.js will generate your fashion mockup using your
                    references, measurements and prompt.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={generateDesign}
                disabled={generating}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-semibold text-[#211b1d] transition hover:-translate-y-0.5 hover:bg-[#f0c5d1] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {generating ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={17} />
                    Generate fashion mockup
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {message && (
              <div className="flex items-center gap-2 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                <Check size={17} />
                {message}
              </div>
            )}
          </div>

          {/* RIGHT / PREVIEW */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[2.5rem] border border-black/[0.07] bg-white shadow-sm">
              <div className="border-b border-black/[0.06] p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-black/35">
                  Design preview
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  {DRESS_NAMES[dressType]} mockup
                </h2>
              </div>

              {generatedImages.length > 0 ? (
                <div className="p-4">
                  {generatedImages.map((image, index) => (
                    <div
                      key={`${image.url}-${index}`}
                      className="overflow-hidden rounded-[2rem] bg-[#f5eeec]"
                    >
                      <img
                        src={image.url}
                        alt={`${DRESS_NAMES[dressType]} generated mockup`}
                        className="w-full object-cover"
                      />
                    </div>
                  ))}

                  <div className="mt-4 rounded-2xl bg-[#f8e8ed] p-4">
                    <p className="text-xs font-semibold text-[#8f425d]">
                      Generated design
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#6f3a4b]">
                      Your reference, measurements and design instructions were
                      used to create this mockup.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="flex min-h-[600px] flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-black/10 bg-[#fffaf9] px-8 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f8e8ed] text-[#b85c78]">
                      <ImageIcon size={27} />
                    </div>

                    <h3 className="mt-6 text-lg font-semibold">
                      Your design will appear here
                    </h3>

                    <p className="mt-3 max-w-sm text-sm leading-6 text-black/40">
                      Upload references, add your measurements and describe
                      your idea. Your generated fashion mockup will appear in
                      this area.
                    </p>

                    <div className="mt-7 grid w-full max-w-sm gap-3">
                      <PreviewStatus
                        active={Boolean(frontImage)}
                        text="Front reference"
                      />

                      <PreviewStatus
                        active={Boolean(backImage)}
                        text="Back reference"
                      />

                      <PreviewStatus
                        active={
                          fields.length > 0 &&
                          fields.every(
                            (field) =>
                              Boolean(measurements[field.key])
                          )
                        }
                        text="Required measurements"
                      />

                      <PreviewStatus
                        active={Boolean(prompt.trim())}
                        text="Design instructions"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ReferenceUpload({
  title,
  image,
  onUpload,
  onRemove,
}: {
  title: string;
  image: string | null;
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}) {
  return (
    <div className="relative">
      {image ? (
        <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-[#f5eeec]">
          <img
            src={image}
            alt={title}
            className="aspect-[4/5] w-full object-cover"
          />

          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${title}`}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow-lg backdrop-blur transition hover:bg-black hover:text-white"
          >
            <X size={15} />
          </button>

          <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-2 text-xs font-medium shadow backdrop-blur">
            {title}
          </div>
        </div>
      ) : (
        <label className="flex aspect-[4/5] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-black/10 bg-[#fffaf9] p-6 text-center transition hover:border-[#b85c78] hover:bg-[#f8e8ed]/40">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onUpload}
          />

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f8e8ed] text-[#b85c78]">
            <Upload size={19} />
          </div>

          <p className="mt-4 text-sm font-semibold">
            {title}
          </p>

          <p className="mt-2 text-xs leading-5 text-black/40">
            Click to upload
            <br />
            JPG, PNG or WEBP
          </p>
        </label>
      )}
    </div>
  );
}

function PreviewStatus({
  active,
  text,
}: {
  active: boolean;
  text: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border p-3 text-left ${
        active
          ? "border-green-200 bg-green-50"
          : "border-black/10 bg-white"
      }`}
    >
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full ${
          active
            ? "bg-green-500 text-white"
            : "bg-black/5 text-black/30"
        }`}
      >
        {active ? <Check size={14} /> : <Camera size={14} />}
      </div>

      <span
        className={`text-xs font-medium ${
          active ? "text-green-700" : "text-black/45"
        }`}
      >
        {text}
      </span>
    </div>
  );
}