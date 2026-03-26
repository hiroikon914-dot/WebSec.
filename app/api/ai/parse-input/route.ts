import { NextResponse } from "next/server";
import { parseInputWithAI } from "@/services/ai-service";

export async function POST(request: Request) {
  const body = (await request.json()) as { text?: string };
  if (!body.text) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }

  try {
    const result = await parseInputWithAI(body.text);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to parse input", detail: error instanceof Error ? error.message : "unknown" },
      { status: 500 }
    );
  }
}
