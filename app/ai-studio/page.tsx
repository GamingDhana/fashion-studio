"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  WandSparkles,
  Upload,
  X,
  Image as ImageIcon,
  Check,
  ScanSearch,
  RefreshCw,
  Lock,
  ChevronDown,
  Shirt,
  Palette,
  Ruler,
  Scissors,
  Eye,
  Loader2,
  Download,
  ShieldCheck,
  Layers3,
  Camera,
  CircleCheck,
} from "lucide-react";

import { puter } from "@heyputer/puter.js";

/* ============================================================
   TYPES
============================================================ */

type GarmentType =
  | "dress"
  | "shirt"
  | "blouse"
  | "skirt"
  | "pants"
  | "jacket"
  | "coat"
  | "jumpsuit"
  | "traditional"
  | "unknown";

type AIResult = any;

type ImageOptions = {
  provider?: string;
  model?: string;
  quality?: string;
  ratio?: {
    w: number;
    h: number;
  };
  input_images?: string[];
};

/* ============================================================
   SUGGESTIONS
============================================================ */

const suggestions = [
  "Keep the reference exactly and make it premium",
  "Create a modern version of this garment",
  "Make this suitable for a luxury fashion collection",
  "Keep the design but improve the fabric appearance",
];

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function AIStudio() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* ==========================================================
     BASIC STATE
  ========================================================== */

  const [idea, setIdea] = useState("");

  const [referenceImage, setReferenceImage] = useState("");
  const [referenceFileName, setReferenceFileName] = useState("");

  const [referenceAnalysis, setReferenceAnalysis] = useState("");

  const [garmentType, setGarmentType] =
    useState<GarmentType>("unknown");

  const [garmentName, setGarmentName] = useState("");

  const [analyzingReference, setAnalyzingReference] =
    useState(false);

  const [analysisComplete, setAnalysisComplete] =
    useState(false);

  /* ==========================================================
     DESIGN
  ========================================================== */

  const [design, setDesign] = useState("");
  const [designImage, setDesignImage] = useState("");

  const [designLoading, setDesignLoading] = useState(false);

  /* ==========================================================
     MOCKUP
  ========================================================== */

  const [mockup, setMockup] = useState("");

  const [mockupLoading, setMockupLoading] = useState(false);

  /* ==========================================================
     GENERAL
  ========================================================== */

  const [error, setError] = useState("");
  const [loadingText, setLoadingText] = useState("");

  /* ==========================================================
     CUSTOMIZATION
  ========================================================== */

  const [neckline, setNeckline] = useState("Keep Reference");
  const [collar, setCollar] = useState("Keep Reference");
  const [sleeves, setSleeves] = useState("Keep Reference");
  const [fabric, setFabric] = useState("Keep Reference");
  const [color, setColor] = useState("Keep Reference");
  const [length, setLength] = useState("Keep Reference");
  const [fit, setFit] = useState("Keep Reference");
  const [details, setDetails] = useState("Keep Reference");

  /* ==========================================================
     PUTER.JS
  ========================================================== */

  const ai: any = puter.ai as any;

  /* ==========================================================
     SAFE TEXT EXTRACTION
  ========================================================== */

  function getAIText(result: AIResult): string {
    if (!result) return "";

    if (typeof result === "string") {
      return result;
    }

    if (typeof result.text === "string") {
      return result.text;
    }

    if (typeof result.content === "string") {
      return result.content;
    }

    if (
      result.message &&
      typeof result.message.content === "string"
    ) {
      return result.message.content;
    }

    if (Array.isArray(result.message?.content)) {
      return result.message.content
        .map((item: any) => {
          if (typeof item === "string") return item;

          if (typeof item?.text === "string") {
            return item.text;
          }

          return "";
        })
        .filter(Boolean)
        .join("\n");
    }

    return "";
  }

  /* ==========================================================
     SAFE IMAGE EXTRACTION
  ========================================================== */

  function getAIImage(result: AIResult): string {
    if (!result) return "";

    if (typeof result === "string") {
      if (
        result.startsWith("data:image") ||
        result.startsWith("http")
      ) {
        return result;
      }
    }

    if (
      typeof HTMLImageElement !== "undefined" &&
      result instanceof HTMLImageElement
    ) {
      return result.src;
    }

    if (typeof result.src === "string") {
      return result.src;
    }

    if (typeof result.url === "string") {
      return result.url;
    }

    if (
      Array.isArray(result.images) &&
      result.images.length > 0
    ) {
      const first = result.images[0];

      if (typeof first === "string") {
        return first;
      }

      if (typeof first?.src === "string") {
        return first.src;
      }

      if (typeof first?.url === "string") {
        return first.url;
      }
    }

    if (
      Array.isArray(result.message?.images) &&
      result.message.images.length > 0
    ) {
      const first = result.message.images[0];

      if (typeof first?.src === "string") {
        return first.src;
      }

      if (typeof first?.url === "string") {
        return first.url;
      }
    }

    return "";
  }

  /* ==========================================================
     READ FILE
  ========================================================== */

  function readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(
            new Error("Unable to read image.")
          );
        }
      };

      reader.onerror = () => {
        reject(
          new Error("Unable to read image.")
        );
      };

      reader.readAsDataURL(file);
    });
  }

  /* ==========================================================
     DETECT GARMENT TYPE
  ========================================================== */

  function detectGarmentType(
    text: string
  ): GarmentType {
    const lower = text.toLowerCase();

    if (
      lower.includes("dress") ||
      lower.includes("gown")
    ) {
      return "dress";
    }

    if (lower.includes("blouse")) {
      return "blouse";
    }

    if (lower.includes("shirt")) {
      return "shirt";
    }

    if (lower.includes("skirt")) {
      return "skirt";
    }

    if (
      lower.includes("pants") ||
      lower.includes("trousers")
    ) {
      return "pants";
    }

    if (
      lower.includes("jacket") ||
      lower.includes("blazer")
    ) {
      return "jacket";
    }

    if (lower.includes("coat")) {
      return "coat";
    }

    if (lower.includes("jumpsuit")) {
      return "jumpsuit";
    }

    if (
      lower.includes("sari") ||
      lower.includes("saree") ||
      lower.includes("traditional")
    ) {
      return "traditional";
    }

    return "unknown";
  }

  /* ==========================================================
     UPLOAD REFERENCE
  ========================================================== */

  async function handleReferenceUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(
        "Please upload an image smaller than 10MB."
      );
      return;
    }

    try {
      setLoadingText(
        "Preparing your reference..."
      );

      const dataURL =
        await readFileAsDataURL(file);

      setReferenceImage(dataURL);
      setReferenceFileName(file.name);

      setReferenceAnalysis("");
      setAnalysisComplete(false);

      setDesign("");
      setDesignImage("");
      setMockup("");

      setGarmentType("unknown");
      setGarmentName("");

      await analyzeReference(dataURL);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to upload image."
      );
    } finally {
      setLoadingText("");
    }
  }

  /* ==========================================================
     ANALYZE REFERENCE
  ========================================================== */

  async function analyzeReference(
    imageData?: string
  ) {
    const source =
      imageData || referenceImage;

    if (!source) return;

    try {
      setAnalyzingReference(true);
      setAnalysisComplete(false);
      setError("");

      setLoadingText(
        "AI is identifying your garment..."
      );

      const result = await ai.chat(
        `
You are an expert fashion designer,
garment technologist and professional tailor.

Analyze the supplied fashion reference image.

FIRST identify exactly what type of garment
is shown.

Possible categories include:

Dress
Shirt
Blouse
Skirt
Pants
Jacket
Coat
Jumpsuit
Traditional Outfit
Other

Start your response with:

GARMENT TYPE: [type]

Then create a detailed garment blueprint.

Analyze only what is actually visible.

Analyze:

- garment type
- silhouette
- overall shape
- neckline
- collar
- sleeves
- sleeve length
- sleeve construction
- shoulder shape
- waist construction
- skirt/trouser construction
- garment length
- fit
- fabric appearance
- fabric weight
- texture
- color
- secondary colors
- pattern
- prints
- pockets
- buttons
- zippers
- seams
- stitching
- pleats
- ruffles
- folds
- decorative details
- proportions
- important visual characteristics

Do NOT invent details.

If something cannot be determined,
write "not clearly visible".

Finish with:

REFERENCE GARMENT BLUEPRINT

The blueprint must be precise enough for
another image generation model to reproduce
the SAME garment.

The reference garment must remain the
primary visual identity.
        `,
        source,
        {
          model: "gpt-5.6-luna",
        }
      );

      const text = getAIText(result);

      if (!text) {
        throw new Error(
          "AI returned an empty analysis."
        );
      }

      const detected =
        detectGarmentType(text);

      setGarmentType(detected);

      const detectedNames: Record<
        GarmentType,
        string
      > = {
        dress: "Dress",
        shirt: "Shirt",
        blouse: "Blouse",
        skirt: "Skirt",
        pants: "Pants / Trousers",
        jacket: "Jacket",
        coat: "Coat",
        jumpsuit: "Jumpsuit",
        traditional:
          "Traditional Outfit",
        unknown: "Garment",
      };

      setGarmentName(
        detectedNames[detected]
      );

      setReferenceAnalysis(text);
      setAnalysisComplete(true);

      setLoadingText(
        `${detectedNames[detected]} identified`
      );
    } catch (err) {
      console.error(
        "REFERENCE ANALYSIS ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to analyze reference."
      );
    } finally {
      setAnalyzingReference(false);
      setLoadingText("");
    }
  }

  /* ==========================================================
     REMOVE REFERENCE
  ========================================================== */

  function removeReference() {
    setReferenceImage("");
    setReferenceFileName("");
    setReferenceAnalysis("");

    setGarmentType("unknown");
    setGarmentName("");

    setAnalysisComplete(false);

    setDesign("");
    setDesignImage("");
    setMockup("");

    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  /* ==========================================================
     CREATE DESIGN DESCRIPTION
  ========================================================== */

  async function createDesignDescription(
    userPrompt: string
  ) {
    const result = await ai.chat(
      `
You are a professional fashion designer
and garment construction expert.

The user wants to design a garment using
the supplied reference image.

IMPORTANT:

The reference garment is the PRIMARY source.

Do NOT create a completely different garment.

Preserve the reference unless the user
explicitly asks to change a specific part.

REFERENCE GARMENT ANALYSIS:

${referenceAnalysis}

USER IDEA:

${
  userPrompt ||
  "No additional prompt. Use the reference garment exactly as the main design."
}

CUSTOMIZATION:

Neckline:
${neckline}

Collar:
${collar}

Sleeves:
${sleeves}

Fabric:
${fabric}

Color:
${color}

Length:
${length}

Fit:
${fit}

Details:
${details}

Create a practical fashion design.

Only modify explicitly requested parts.

For every option saying "Keep Reference",
preserve the original reference.

If the user provides no prompt,
the reference image itself is the complete
design instruction.

Return:

1. Garment
2. Overall Appearance
3. Silhouette
4. Neckline
5. Collar
6. Sleeves
7. Fabric
8. Color
9. Length
10. Fit
11. Details
12. Tailoring Notes
13. Matching Items
      `,
      {
        model: "gpt-5.6-luna",
      }
    );

    const text = getAIText(result);

    if (!text) {
      throw new Error(
        "AI returned an empty design description."
      );
    }

    return text;
  }

  /* ==========================================================
     CREATE DESIGN IMAGE
  ========================================================== */

  async function createDesignImage(
    prompt: string
  ) {
    const options: ImageOptions = {
      provider:
        "openai-image-generation",
      model: "gpt-image-1",
      quality: "high",
      ratio: {
        w: 1024,
        h: 1280,
      },
    };

    if (referenceImage) {
      options.input_images = [
        referenceImage,
      ];
    }

    const result = await ai.txt2img(
      prompt,
      options
    );

    const generated =
      getAIImage(result);

    if (!generated) {
      throw new Error(
        "AI did not return a design image."
      );
    }

    return generated;
  }

  /* ==========================================================
     GENERATE DESIGN
  ========================================================== */

  async function generateDesign() {
    if (!referenceImage) {
      setError(
        "Upload a reference image first."
      );
      return;
    }

    if (!analysisComplete) {
      setError(
        "Please wait until the reference analysis is complete."
      );
      return;
    }

    try {
      setDesignLoading(true);
      setError("");

      setDesign("");
      setDesignImage("");
      setMockup("");

      setLoadingText(
        "Creating your design..."
      );

      const userPrompt =
        idea.trim() ||
        "REFERENCE ONLY MODE: Use the uploaded reference garment as the complete design instruction. Preserve the garment exactly and create a refined professional version without introducing unrelated changes.";

      const designText =
        await createDesignDescription(
          userPrompt
        );

      setDesign(designText);

      setLoadingText(
        "Creating the visual design..."
      );

      const imagePrompt = `
Create a professional fashion design image.

PRIMARY VISUAL REFERENCE:

The supplied reference image.

REFERENCE GARMENT BLUEPRINT:

${referenceAnalysis}

USER REQUEST:

${userPrompt}

DESIGN DESCRIPTION:

${designText}

GARMENT TYPE:

${garmentName}

CUSTOMIZATION:

Neckline:
${neckline}

Collar:
${collar}

Sleeves:
${sleeves}

Fabric:
${fabric}

Color:
${color}

Length:
${length}

Fit:
${fit}

Details:
${details}

IMPORTANT:

The supplied reference image is the PRIMARY
visual source.

If the user did not provide a prompt,
this is REFERENCE ONLY MODE.

In reference-only mode:

- reproduce the same garment
- preserve the silhouette
- preserve proportions
- preserve construction
- preserve neckline
- preserve collar
- preserve sleeves
- preserve fabric appearance
- preserve color
- preserve pattern
- preserve length
- preserve fit
- preserve visible details

Do not invent a new garment.

Only change something when the user
explicitly requests that change.

"Keep Reference" means preserve that part
as shown in the reference.

Create a clean professional fashion
presentation.

Show the complete garment.

Realistic fabric.

Professional studio lighting.

Neutral background.

No text.

No logo.

No watermark.

No unnecessary accessories.
`;

      const generated =
        await createDesignImage(
          imagePrompt
        );

      setDesignImage(generated);

      setLoadingText(
        "Design ready."
      );
    } catch (err) {
      console.error(
        "DESIGN ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to create design."
      );
    } finally {
      setDesignLoading(false);
      setLoadingText("");
    }
  }

  /* ==========================================================
     FINAL MOCKUP
  ========================================================== */

  async function finalizeMockup() {
    if (!referenceImage) {
      setError(
        "Reference image is required."
      );
      return;
    }

    if (!designImage) {
      setError(
        "Create the design before finalizing the mockup."
      );
      return;
    }

    try {
      setMockupLoading(true);
      setMockup("");
      setError("");

      setLoadingText(
        "Analyzing the approved garment..."
      );

      if (!referenceAnalysis) {
        await analyzeReference(
          referenceImage
        );
      }

      setLoadingText(
        "Matching the reference garment..."
      );

      const finalPrompt = `
CREATE A FINAL REALISTIC FASHION MOCKUP.

This is NOT a new fashion design.

This is a realistic model photograph
of the APPROVED GARMENT.

PRIMARY REFERENCE:

The original uploaded reference image.

SECONDARY REFERENCE:

The approved AI design image.

REFERENCE BLUEPRINT:

${referenceAnalysis}

APPROVED DESIGN:

${design}

CUSTOMER IDEA:

${
  idea ||
  "No additional prompt. Use the reference garment."
}

GARMENT:

${garmentName}

CRITICAL RULE:

The final model must wear the SAME garment.

Do NOT redesign it.

Preserve the original reference's:

- silhouette
- proportions
- neckline
- collar
- sleeves
- sleeve length
- sleeve shape
- shoulder construction
- waist construction
- length
- fit
- fabric appearance
- color
- pattern
- pockets
- buttons
- zippers
- seams
- stitching
- pleats
- ruffles
- decorative details

The garment itself is more important
than the model.

Only convert the garment into a
realistic fashion photograph.

MODEL:

Realistic adult fashion model.

Natural body proportions.

Natural standing pose.

Full body visible.

Garment clearly visible.

PHOTOGRAPHY:

Professional fashion catalog photography.

Realistic skin.

Realistic fabric.

Realistic folds.

Natural shadows.

Luxury studio lighting.

Clean neutral background.

Sharp garment details.

Do NOT add:

- logos
- text
- watermark
- unrelated accessories
- different clothing
- different colors
- different neckline
- different sleeves
- different fabric
- different length
- different pattern

The final image should look like the
reference garment was professionally
photographed on a real fashion model.
`;

      setLoadingText(
        "Creating final fashion mockup..."
      );

      const options: ImageOptions = {
        provider:
          "openai-image-generation",
        model: "gpt-image-1",
        quality: "high",
        ratio: {
          w: 1024,
          h: 1280,
        },
        input_images: [
          referenceImage,
          designImage,
        ],
      };

      const result =
        await ai.txt2img(
          finalPrompt,
          options
        );

      const finalImage =
        getAIImage(result);

      if (!finalImage) {
        throw new Error(
          "AI did not return the final mockup."
        );
      }

      setMockup(finalImage);

      setLoadingText(
        "Final mockup complete."
      );
    } catch (err) {
      console.error(
        "MOCKUP ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to create final mockup."
      );
    } finally {
      setMockupLoading(false);
      setLoadingText("");
    }
  }

  /* ==========================================================
     DOWNLOAD
  ========================================================== */

  function downloadImage(
    src: string,
    filename: string
  ) {
    const link =
      document.createElement("a");

    link.href = src;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }

  /* ==========================================================
     EDITOR VISIBILITY
  ========================================================== */

  const showNeckline = [
    "dress",
    "shirt",
    "blouse",
    "jacket",
    "coat",
    "jumpsuit",
    "traditional",
  ].includes(garmentType);

  const showCollar = [
    "shirt",
    "blouse",
    "jacket",
    "coat",
  ].includes(garmentType);

  const showSleeves = [
    "dress",
    "shirt",
    "blouse",
    "jacket",
    "coat",
    "jumpsuit",
    "traditional",
  ].includes(garmentType);

  const showLength = [
    "dress",
    "shirt",
    "blouse",
    "skirt",
    "pants",
    "jacket",
    "coat",
    "jumpsuit",
    "traditional",
  ].includes(garmentType);

  const showFit = true;

  /* ==========================================================
     SELECT
  ========================================================== */

  function EditorSelect({
    label,
    value,
    onChange,
    options,
    icon,
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: string[];
    icon?: React.ReactNode;
  }) {
    return (
      <div className="group">
        <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-black/40">
          <span className="text-black/55">
            {icon}
          </span>

          {label}
        </label>

        <div className="relative mt-2.5">
          <select
            value={value}
            onChange={(e) =>
              onChange(
                e.target.value
              )
            }
            className="w-full appearance-none rounded-2xl border border-black/[0.09] bg-[#faf9f6] px-4 py-3.5 pr-11 text-sm font-medium outline-none transition-all hover:border-black/20 focus:border-black/30 focus:bg-white focus:ring-4 focus:ring-black/[0.035]"
          >
            {options.map(
              (option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              )
            )}
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/35"
          />
        </div>
      </div>
    );
  }

  /* ==========================================================
     STEP STATUS
  ========================================================== */

  const currentStep = mockup
    ? 4
    : designImage
    ? 3
    : analysisComplete
    ? 2
    : referenceImage
    ? 1
    : 0;

  /* ==========================================================
     PAGE
  ========================================================== */

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f4ef] text-[#111111] selection:bg-black selection:text-white">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-50 border-b border-black/[0.07] bg-[#f6f4ef]/85 backdrop-blur-2xl">

        <div className="mx-auto flex h-[70px] max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-10">

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

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white shadow-lg shadow-black/10">
              <Sparkles size={16} />
            </div>

            <span className="text-sm font-bold tracking-tight">
              AI Studio
            </span>

          </div>

          <Link
            href="/shop"
            className="rounded-full border border-black/10 bg-white px-4 py-2.5 text-xs font-semibold transition-all hover:bg-black hover:text-white sm:px-5 sm:text-sm"
          >
            Shop
          </Link>

        </div>
      </header>

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="relative mx-auto max-w-[1500px] px-5 pb-10 pt-12 sm:px-6 sm:pt-16 lg:px-10 lg:pb-14 lg:pt-20">

        <div className="pointer-events-none absolute -right-40 top-0 h-80 w-80 rounded-full bg-white/70 blur-3xl" />

        <div className="relative max-w-4xl">

          <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] shadow-sm">
            <Sparkles size={12} />
            AI Fashion Design Studio
          </div>

          <h1 className="mt-6 text-[42px] font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-[76px]">
            Turn your reference
            <br />
            into a{" "}
            <span className="text-black/40">
              real design.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-black/50 sm:text-base lg:text-lg">
            Upload a garment reference,
            let AI understand every detail,
            optionally describe what you want,
            and finish with a realistic
            fashion mockup.
          </p>

          {/* STEPS */}

          <div className="mt-8 flex flex-wrap gap-2">

            {[
              ["01", "Reference"],
              ["02", "Analyze"],
              ["03", "Customize"],
              ["04", "Mockup"],
            ].map(
              ([number, label], index) => {
                const active =
                  currentStep >= index;

                return (
                  <div
                    key={number}
                    className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all ${
                      active
                        ? "bg-black text-white shadow-md shadow-black/10"
                        : "bg-white text-black/35"
                    }`}
                  >
                    {active ? (
                      <Check size={11} />
                    ) : (
                      <span>
                        {number}
                      </span>
                    )}

                    {label}
                  </div>
                );
              }
            )}

          </div>

        </div>
      </section>

      {/* ======================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="mx-auto max-w-[1500px] px-5 sm:px-6 lg:px-10">

          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 shadow-sm">

            <X
              size={17}
              className="mt-0.5 shrink-0"
            />

            <span>{error}</span>

          </div>

        </div>
      )}

      {/* ======================================================
          MAIN
      ====================================================== */}

      <div className="mx-auto grid max-w-[1500px] items-start gap-6 px-5 pb-20 sm:px-6 lg:grid-cols-[420px_minmax(0,1fr)] lg:gap-7 lg:px-10">

        {/* ====================================================
            SIDEBAR
        ==================================================== */}

        <aside className="space-y-5">

          {/* ==================================================
              REFERENCE
          ================================================== */}

          <section className="overflow-hidden rounded-[28px] border border-black/[0.07] bg-white shadow-[0_18px_60px_rgba(0,0,0,0.035)]">

            <div className="border-b border-black/[0.06] p-5 sm:p-6">

              <div className="flex items-center justify-between gap-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
                    <ImageIcon size={16} />
                  </div>

                  <div>
                    <h2 className="text-sm font-bold">
                      Reference
                    </h2>

                    <p className="mt-1 text-[11px] text-black/40">
                      Your primary garment source
                    </p>
                  </div>

                </div>

                {analysisComplete && (
                  <span className="flex items-center gap-1.5 rounded-full bg-black px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white">
                    <Check size={10} />
                    Ready
                  </span>
                )}

              </div>

            </div>

            <div className="p-5 sm:p-6">

              {referenceImage ? (

                <div className="relative overflow-hidden rounded-[22px] bg-[#f5f2ec]">

                  <img
                    src={referenceImage}
                    alt="Reference garment"
                    className="max-h-[440px] w-full object-contain"
                  />

                  <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-2 text-[9px] font-bold uppercase tracking-wider shadow-sm backdrop-blur">
                    <CircleCheck size={11} />
                    Reference
                  </div>

                  <button
                    type="button"
                    onClick={
                      removeReference
                    }
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black text-white shadow-lg transition-all hover:scale-105 hover:bg-black/80"
                    aria-label="Remove reference"
                  >
                    <X size={15} />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 backdrop-blur-xl">

                    <p className="truncate text-xs font-semibold">
                      {referenceFileName}
                    </p>

                    <div className="mt-1 flex items-center gap-1.5 text-[10px] text-black/45">
                      <Check size={10} />
                      Image selected successfully
                    </div>

                  </div>

                </div>

              ) : (

                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={
                      handleReferenceUpload
                    }
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    className="group flex min-h-[300px] w-full flex-col items-center justify-center rounded-[22px] border border-dashed border-black/15 bg-[#faf9f6] px-5 transition-all hover:border-black/30 hover:bg-white hover:shadow-inner"
                  >

                    <span className="flex h-16 w-16 items-center justify-center rounded-[20px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all group-hover:-translate-y-1 group-hover:scale-105">
                      <Upload size={22} />
                    </span>

                    <span className="mt-5 text-sm font-bold">
                      Upload reference
                    </span>

                    <span className="mt-2 text-center text-[11px] leading-5 text-black/40">
                      PNG, JPG or WebP
                      <br />
                      Maximum 10MB
                    </span>

                    <span className="mt-5 rounded-full bg-black px-4 py-2 text-[10px] font-bold text-white transition group-hover:bg-black/80">
                      Choose Image
                    </span>

                  </button>
                </>

              )}

            </div>

          </section>

          {/* ==================================================
              ANALYSIS
          ================================================== */}

          {referenceImage && (
            <section className="overflow-hidden rounded-[28px] border border-black/[0.07] bg-white shadow-[0_18px_60px_rgba(0,0,0,0.035)]">

              <div className="p-5 sm:p-6">

                <div className="flex items-center gap-3">

                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                      analysisComplete
                        ? "bg-black text-white shadow-lg shadow-black/10"
                        : "bg-[#f2eee7]"
                    }`}
                  >

                    {analyzingReference ? (
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                    ) : analysisComplete ? (
                      <Check size={18} />
                    ) : (
                      <ScanSearch size={18} />
                    )}

                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="text-sm font-bold">
                      {analyzingReference
                        ? "Analyzing garment"
                        : analysisComplete
                        ? "Reference analyzed"
                        : "Waiting for analysis"}
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-black/40">
                      {analyzingReference
                        ? "AI is studying the visible garment details."
                        : analysisComplete
                        ? "Your customization controls are ready."
                        : "AI will identify the garment first."}
                    </p>

                  </div>

                </div>

                {analysisComplete && (
                  <div className="mt-5 rounded-2xl border border-black/[0.05] bg-[#faf9f6] p-4">

                    <div className="flex items-center justify-between">

                      <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-black/35">
                        Detected garment
                      </span>

                      <Shirt
                        size={15}
                        className="text-black/30"
                      />

                    </div>

                    <div className="mt-2 flex items-center justify-between gap-3">

                      <p className="text-lg font-bold">
                        {garmentName ||
                          "Garment"}
                      </p>

                      <span className="rounded-full bg-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider shadow-sm">
                        AI detected
                      </span>

                    </div>

                  </div>
                )}

                {referenceAnalysis &&
                  analysisComplete && (
                    <details className="group mt-4">

                      <summary className="flex cursor-pointer list-none items-center justify-between rounded-2xl border border-black/[0.05] bg-[#faf9f6] px-4 py-3.5 text-xs font-semibold">

                        <span className="flex items-center gap-2">
                          <Layers3 size={14} />
                          View garment blueprint
                        </span>

                        <ChevronDown
                          size={15}
                          className="transition group-open:rotate-180"
                        />

                      </summary>

                      <div className="mt-2 max-h-64 overflow-y-auto rounded-2xl bg-[#faf9f6] p-4">

                        <p className="whitespace-pre-wrap text-[11px] leading-6 text-black/55">
                          {referenceAnalysis}
                        </p>

                      </div>

                    </details>
                  )}

                {analysisComplete && (
                  <button
                    type="button"
                    onClick={() =>
                      analyzeReference()
                    }
                    disabled={
                      analyzingReference
                    }
                    className="mt-4 flex items-center gap-2 text-[11px] font-bold text-black/45 transition hover:text-black disabled:opacity-40"
                  >
                    <RefreshCw size={12} />
                    Analyze again
                  </button>
                )}

              </div>

            </section>
          )}

          {/* ==================================================
              OPTIONAL PROMPT
          ================================================== */}

          {analysisComplete && (
            <section className="rounded-[28px] border border-black/[0.07] bg-white p-5 shadow-[0_18px_60px_rgba(0,0,0,0.035)] sm:p-6">

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-white">
                  <WandSparkles size={16} />
                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex flex-wrap items-center gap-2">

                    <h2 className="text-sm font-bold">
                      Describe your design
                    </h2>

                    <span className="rounded-full bg-[#f3f0ea] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-black/45">
                      Optional
                    </span>

                  </div>

                  <p className="mt-1 text-[11px] leading-5 text-black/40">
                    Type what you want to change,
                    or leave this empty to generate
                    using the reference.
                  </p>

                </div>

              </div>

              {/* PROMPT INPUT */}

              <div className="relative mt-5">

                <textarea
                  value={idea}
                  onChange={(e) =>
                    setIdea(e.target.value)
                  }
                  placeholder="Optional: e.g. Keep this exact dress but change the color to dark blue..."
                  className="min-h-[140px] w-full resize-none rounded-2xl border border-black/[0.09] bg-[#faf9f6] p-4 pr-12 text-sm leading-6 outline-none transition-all placeholder:text-black/25 focus:border-black/25 focus:bg-white focus:ring-4 focus:ring-black/[0.035]"
                />

                {idea.trim() && (
                  <button
                    type="button"
                    onClick={() =>
                      setIdea("")
                    }
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black/40 shadow-sm transition hover:bg-black hover:text-white"
                    aria-label="Clear prompt"
                  >
                    <X size={14} />
                  </button>
                )}

              </div>

              {/* QUICK PROMPTS */}

              <div className="mt-4">

                <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.16em] text-black/30">
                  Quick ideas
                </p>

                <div className="flex flex-wrap gap-2">

                  {suggestions.map(
                    (suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() =>
                          setIdea(
                            suggestion
                          )
                        }
                        className="rounded-full border border-black/[0.09] bg-white px-3 py-2 text-[9px] font-semibold text-black/50 transition-all hover:border-black hover:bg-black hover:text-white"
                      >
                        {suggestion}
                      </button>
                    )
                  )}

                </div>

              </div>

              {/* REFERENCE ONLY MESSAGE */}

              {!idea.trim() && (
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-black/[0.06] bg-[#faf9f6] p-4">

                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
                    <ImageIcon size={14} />
                  </div>

                  <div>

                    <p className="text-xs font-bold">
                      Reference-only mode
                    </p>

                    <p className="mt-1 text-[10px] leading-5 text-black/40">
                      No prompt is required.
                      AI will use your uploaded
                      reference as the primary
                      design and preserve its
                      visible details.
                    </p>

                  </div>

                </div>
              )}

            </section>
          )}

          {/* ==================================================
              CUSTOMIZE
          ================================================== */}

          <section
            className={`overflow-hidden rounded-[28px] border border-black/[0.07] bg-white shadow-[0_18px_60px_rgba(0,0,0,0.035)] ${
              !analysisComplete
                ? "opacity-80"
                : ""
            }`}
          >

            <div className="border-b border-black/[0.06] p-5 sm:p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">

                  {analysisComplete ? (
                    <Scissors size={16} />
                  ) : (
                    <Lock size={16} />
                  )}

                </div>

                <div>

                  <h2 className="text-sm font-bold">
                    Customize
                  </h2>

                  <p className="mt-1 text-[11px] text-black/40">
                    {analysisComplete
                      ? "Modify only the parts you want."
                      : "Upload and analyze a reference first."}
                  </p>

                </div>

              </div>

            </div>

            {!analysisComplete ? (

              <div className="p-8 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f3f0ea]">
                  <Lock size={19} />
                </div>

                <p className="mt-4 text-sm font-bold">
                  Customization locked
                </p>

                <p className="mx-auto mt-2 max-w-xs text-[11px] leading-5 text-black/40">
                  AI needs to identify the garment
                  before showing relevant controls.
                </p>

              </div>

            ) : (

              <div className="space-y-5 p-5 sm:p-6">

                {showNeckline && (
                  <EditorSelect
                    label="Neckline"
                    value={neckline}
                    onChange={setNeckline}
                    icon={
                      <Ruler size={12} />
                    }
                    options={[
                      "Keep Reference",
                      "Round",
                      "V-Neck",
                      "Square",
                      "Boat Neck",
                      "Sweetheart",
                      "Halter",
                      "High Neck",
                      "Off Shoulder",
                    ]}
                  />
                )}

                {showCollar && (
                  <EditorSelect
                    label="Collar"
                    value={collar}
                    onChange={setCollar}
                    icon={
                      <Shirt size={12} />
                    }
                    options={[
                      "Keep Reference",
                      "No Collar",
                      "Classic Collar",
                      "Mandarin Collar",
                      "Peter Pan Collar",
                      "Stand Collar",
                      "Spread Collar",
                    ]}
                  />
                )}

                {showSleeves && (
                  <EditorSelect
                    label="Sleeves"
                    value={sleeves}
                    onChange={setSleeves}
                    icon={
                      <Scissors size={12} />
                    }
                    options={[
                      "Keep Reference",
                      "Sleeveless",
                      "Cap Sleeves",
                      "Short Sleeves",
                      "3/4 Sleeves",
                      "Long Sleeves",
                      "Puff Sleeves",
                      "Balloon Sleeves",
                      "Bell Sleeves",
                      "Off Shoulder Sleeves",
                    ]}
                  />
                )}

                <EditorSelect
                  label="Fabric"
                  value={fabric}
                  onChange={setFabric}
                  icon={
                    <Palette size={12} />
                  }
                  options={[
                    "Keep Reference",
                    "Denim",
                    "Cotton",
                    "Linen",
                    "Silk",
                    "Satin",
                    "Chiffon",
                    "Velvet",
                    "Lace",
                    "Wool",
                  ]}
                />

                <EditorSelect
                  label="Color"
                  value={color}
                  onChange={setColor}
                  icon={
                    <Palette size={12} />
                  }
                  options={[
                    "Keep Reference",
                    "Black",
                    "White",
                    "Red",
                    "Pink",
                    "Blue",
                    "Green",
                    "Beige",
                    "Brown",
                    "Purple",
                  ]}
                />

                {showLength && (
                  <EditorSelect
                    label="Length"
                    value={length}
                    onChange={setLength}
                    icon={
                      <Ruler size={12} />
                    }
                    options={[
                      "Keep Reference",
                      "Mini",
                      "Above Knee",
                      "Knee Length",
                      "Midi",
                      "Maxi",
                    ]}
                  />
                )}

                {showFit && (
                  <EditorSelect
                    label="Fit"
                    value={fit}
                    onChange={setFit}
                    icon={
                      <Ruler size={12} />
                    }
                    options={[
                      "Keep Reference",
                      "Fitted",
                      "Regular",
                      "Relaxed",
                      "Oversized",
                      "Bodycon",
                      "A-Line",
                    ]}
                  />
                )}

                <EditorSelect
                  label="Details"
                  value={details}
                  onChange={setDetails}
                  icon={
                    <Sparkles size={12} />
                  }
                  options={[
                    "Keep Reference",
                    "Keep all details",
                    "Minimal details",
                    "Luxury details",
                    "Modern details",
                    "Traditional details",
                  ]}
                />

              </div>

            )}

          </section>

          {/* ==================================================
              GENERATE BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={generateDesign}
            disabled={
              !analysisComplete ||
              designLoading
            }
            className="group flex w-full items-center justify-center gap-3 rounded-full bg-black py-4 text-sm font-bold text-white shadow-[0_15px_40px_rgba(0,0,0,0.16)] transition-all hover:-translate-y-0.5 hover:bg-black/85 hover:shadow-[0_18px_45px_rgba(0,0,0,0.2)] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0"
          >

            {designLoading ? (
              <Loader2
                size={18}
                className="animate-spin"
              />
            ) : (
              <Sparkles size={18} />
            )}

            {designLoading
              ? "Creating Design..."
              : idea.trim()
              ? "Create Design with AI"
              : "Generate from Reference"}

          </button>

          {loadingText && (
            <div className="flex items-center justify-center gap-2 text-center text-[10px] font-semibold text-black/40">

              {(designLoading ||
                mockupLoading ||
                analyzingReference) && (
                <Loader2
                  size={12}
                  className="animate-spin"
                />
              )}

              {loadingText}

            </div>
          )}

        </aside>

        {/* ====================================================
            WORKSPACE
        ==================================================== */}

        <section className="min-w-0">

          <div className="lg:sticky lg:top-[90px]">

            <div className="overflow-hidden rounded-[32px] border border-black/[0.07] bg-[#e9e5de] shadow-[0_25px_90px_rgba(0,0,0,0.055)]">

              {/* WORKSPACE HEADER */}

              <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-5 sm:px-7">

                <div>

                  <div className="flex items-center gap-2">

                    <span className="h-1.5 w-1.5 rounded-full bg-black" />

                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-black/35">
                      AI Workspace
                    </p>

                  </div>

                  <h2 className="mt-1.5 text-lg font-bold tracking-tight">
                    {mockup
                      ? "Final Mockup"
                      : designImage
                      ? "Approved Design"
                      : "Design Preview"}
                  </h2>

                </div>

                <div className="flex items-center gap-2">

                  {analysisComplete && (
                    <span className="hidden items-center gap-1.5 rounded-full bg-white px-3 py-2 text-[9px] font-bold sm:flex">
                      <Check size={10} />
                      Reference analyzed
                    </span>
                  )}

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
                    <Eye size={15} />
                  </span>

                </div>

              </div>

              {/* PREVIEW */}

              <div className="p-4 sm:p-7">

                <div className="relative min-h-[620px] overflow-hidden rounded-[26px] bg-white shadow-inner sm:min-h-[680px]">

                  {/* LOADING */}

                  {(designLoading ||
                    mockupLoading) && (

                    <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/95 backdrop-blur-xl">

                      <div className="max-w-sm px-8 text-center">

                        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black text-white shadow-[0_15px_45px_rgba(0,0,0,0.18)]">

                          <div className="absolute inset-0 rounded-full border border-black/10 animate-ping opacity-20" />

                          <Sparkles
                            size={28}
                            className="animate-pulse"
                          />

                        </div>

                        <h3 className="mt-7 text-xl font-bold">
                          {loadingText ||
                            "AI is working..."}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-black/40">
                          AI is preserving the
                          reference garment while
                          creating your design.
                        </p>

                        <div className="mx-auto mt-7 h-1.5 max-w-xs overflow-hidden rounded-full bg-black/[0.08]">

                          <div className="h-full w-1/2 animate-[pulse_1.5s_ease-in-out_infinite] rounded-full bg-black" />

                        </div>

                      </div>

                    </div>
                  )}

                  {/* FINAL MOCKUP */}

                  {mockup ? (

                    <div className="relative min-h-[620px] w-full sm:min-h-[680px]">

                      <img
                        src={mockup}
                        alt="Final fashion mockup"
                        className="mx-auto max-h-[780px] w-full object-contain"
                      />

                      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-4 py-2.5 text-[10px] font-bold shadow-sm backdrop-blur-xl">

                        <Check size={13} />
                        Final Mockup

                      </div>

                    </div>

                  ) : designImage ? (

                    <div className="w-full">

                      <div className="relative overflow-hidden bg-[#faf9f7]">

                        <img
                          src={designImage}
                          alt="Approved AI fashion design"
                          className="mx-auto max-h-[720px] w-full object-contain"
                        />

                        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-4 py-2.5 text-[10px] font-bold shadow-sm backdrop-blur-xl">

                          <Check size={13} />
                          Design Ready

                        </div>

                      </div>

                    </div>

                  ) : referenceImage ? (

                    <div className="flex min-h-[620px] items-center justify-center p-5 sm:min-h-[680px] sm:p-8">

                      <div className="w-full max-w-md">

                        <div className="relative overflow-hidden rounded-[28px] bg-[#f7f4ee] shadow-sm">

                          <img
                            src={referenceImage}
                            alt="Reference"
                            className="mx-auto max-h-[560px] w-full object-contain"
                          />

                          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-[10px] font-bold shadow-sm backdrop-blur-xl">

                            <ImageIcon size={12} />
                            Your Reference

                          </div>

                        </div>

                        <div className="mt-7 text-center">

                          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-black/30">
                            Reference Ready
                          </p>

                          <h3 className="mt-2 text-2xl font-bold tracking-tight">
                            {analysisComplete
                              ? `${garmentName} identified`
                              : "Analyzing your garment"}
                          </h3>

                          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-black/40">
                            {analysisComplete
                              ? "Your reference is ready. Add an optional prompt, customize it, or generate directly from the reference."
                              : "AI is studying the garment before unlocking customization."}
                          </p>

                        </div>

                      </div>

                    </div>

                  ) : (

                    <div className="flex min-h-[620px] items-center justify-center px-7 sm:min-h-[680px]">

                      <div className="max-w-md text-center">

                        <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] bg-black text-white shadow-[0_20px_55px_rgba(0,0,0,0.18)]">

                          <div className="absolute -inset-2 rounded-[32px] border border-black/5" />

                          <Sparkles size={32} />

                        </div>

                        <p className="mt-8 text-[9px] font-bold uppercase tracking-[0.25em] text-black/30">
                          Your Canvas
                        </p>

                        <h3 className="mt-3 text-3xl font-bold tracking-[-0.04em]">
                          Start with a reference.
                        </h3>

                        <p className="mt-4 text-sm leading-7 text-black/40">
                          Upload the garment you want
                          to recreate. AI will analyze
                          its structure before allowing
                          you to customize it.
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            fileInputRef.current?.click()
                          }
                          className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-bold text-white transition hover:bg-black/80"
                        >
                          <Upload size={14} />
                          Upload Reference
                        </button>

                      </div>

                    </div>

                  )}

                </div>

                {/* DESIGN DESCRIPTION */}

                {design && (
                  <div className="mt-6 rounded-2xl border border-black/[0.06] bg-white p-5 sm:p-6">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">
                        <WandSparkles size={15} />
                      </div>

                      <div>

                        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/30">
                          AI Design
                        </p>

                        <h3 className="mt-0.5 text-sm font-bold">
                          Design blueprint
                        </h3>

                      </div>

                    </div>

                    <div className="mt-4 max-h-56 overflow-y-auto rounded-2xl bg-[#faf9f6] p-4">

                      <p className="whitespace-pre-wrap text-xs leading-6 text-black/55">
                        {design}
                      </p>

                    </div>

                  </div>
                )}

                {/* FINALIZE */}

                {designImage &&
                  !mockup && (
                    <div className="mt-6 rounded-2xl border border-black/[0.08] bg-white p-5 sm:p-6">

                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                          <div className="flex items-center gap-2">

                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
                              <Check size={13} />
                            </span>

                            <p className="text-sm font-bold">
                              Design approved
                            </p>

                          </div>

                          <p className="mt-2 max-w-xl text-xs leading-5 text-black/40">
                            AI will use the original
                            reference as the primary
                            garment reference and place
                            the approved design on a
                            realistic model.
                          </p>

                        </div>

                        <button
                          type="button"
                          onClick={
                            finalizeMockup
                          }
                          disabled={
                            mockupLoading
                          }
                          className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-xs font-bold text-white transition-all hover:bg-black/80 disabled:opacity-40"
                        >

                          {mockupLoading ? (
                            <Loader2
                              size={15}
                              className="animate-spin"
                            />
                          ) : (
                            <Camera
                              size={15}
                            />
                          )}

                          Create Final Mockup

                        </button>

                      </div>

                    </div>
                  )}

                {/* FINAL RESULT */}

                {mockup && (
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">

                    <button
                      type="button"
                      onClick={() =>
                        downloadImage(
                          mockup,
                          "fashion-mockup.png"
                        )
                      }
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-black py-3.5 text-xs font-bold text-white transition-all hover:bg-black/80"
                    >
                      <Download
                        size={15}
                      />
                      Save Mockup
                    </button>

                    <button
                      type="button"
                      onClick={
                        finalizeMockup
                      }
                      disabled={
                        mockupLoading
                      }
                      className="flex flex-1 items-center justify-center gap-2 rounded-full border border-black/10 bg-white py-3.5 text-xs font-bold transition-all hover:bg-black/5 disabled:opacity-40"
                    >
                      <RefreshCw
                        size={15}
                      />
                      Regenerate
                    </button>

                  </div>
                )}

              </div>

            </div>

          </div>

        </section>

      </div>

      {/* ======================================================
          TRUST / FEATURES
      ====================================================== */}

      <section className="mx-auto max-w-[1500px] px-5 pb-24 sm:px-6 lg:px-10">

        <div className="mb-6 flex items-end justify-between">

          <div>

            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-black/30">
              Built for fashion
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              From reference to runway.
            </h2>

          </div>

          <div className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-[9px] font-bold uppercase tracking-wider text-black/40 sm:flex">

            <ShieldCheck size={13} />
            AI assisted workflow

          </div>

        </div>

        <div className="grid gap-4 md:grid-cols-3">

          <FeatureCard
            number="01"
            icon={
              <ScanSearch size={18} />
            }
            title="AI understands your reference"
            text="The garment is analyzed first so the editor knows which controls are relevant."
          />

          <FeatureCard
            number="02"
            icon={
              <Scissors size={18} />
            }
            title="Customize without losing the design"
            text="Parts set to Keep Reference remain unchanged while you modify only what you want."
          />

          <FeatureCard
            number="03"
            icon={
              <WandSparkles size={18} />
            }
            title="Generate with or without a prompt"
            text="Describe your idea if you want changes, or leave the prompt empty and generate directly from your reference."
          />

        </div>

      </section>

    </main>
  );
}

/* ============================================================
   FEATURE CARD
============================================================ */

function FeatureCard({
  number,
  icon,
  title,
  text,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="group rounded-[26px] border border-black/[0.07] bg-white p-6 shadow-[0_15px_50px_rgba(0,0,0,0.025)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)]">

      <div className="flex items-center justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f4f1eb] transition-all group-hover:bg-black group-hover:text-white">
          {icon}
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