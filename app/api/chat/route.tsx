import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not set");
}
// comment

const ai = new GoogleGenAI({ apiKey });

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const geminiResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
    });

    const aiReply = geminiResponse.text;

    return NextResponse.json({ reply: aiReply });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
