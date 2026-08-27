import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const idea = body?.idea;

    if (!idea || typeof idea !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Fashion design idea is required.",
        },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "OPENAI_API_KEY is missing.",
        },
        { status: 500 }
      );
    }

    console.log("========== OPENAI DESIGN REQUEST ==========");

    const response = await openai.responses.create({
      model: "gpt-5",
      input: `
You are a professional high-fashion clothing designer.

Create a detailed fashion design concept from this customer request:

${idea}

Return exactly these sections:

1. Garment
2. Overall Appearance
3. Neckline
4. Sleeves
5. Fabric
6. Color
7. Length
8. Fit
9. Details
10. Accessories
11. Tailoring Notes
12. Improvements
13. Recommended Matching Items

Make the design realistic, stylish, commercially wearable and suitable
for a professional fashion website.

Return only the design description.
`,
    });

    const design = response.output_text?.trim();

    if (!design) {
      return NextResponse.json(
        {
          success: false,
          error: "OpenAI returned no design text.",
        },
        { status: 502 }
      );
    }

    console.log("========== OPENAI DESIGN SUCCESS ==========");
    console.log(design);

    return NextResponse.json({
      success: true,
      design,
    });
  } catch (error) {
    console.error("========== AI DESIGN ERROR ==========");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unexpected server error.",
      },
      { status: 500 }
    );
  }
}