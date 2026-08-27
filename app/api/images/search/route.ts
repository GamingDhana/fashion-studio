import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const query = body?.query;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Image search query is required.",
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.SERPER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "SERPER_API_KEY is missing.",
        },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://google.serper.dev/images",
      {
        method: "POST",
        headers: {
          "X-API-KEY": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: query,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      images: data.images || [],
    });
  } catch (error) {
    console.error("IMAGE SEARCH ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Image search failed.",
      },
      { status: 500 }
    );
  }
}