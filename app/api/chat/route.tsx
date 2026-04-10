'use server';
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not set" }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
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
