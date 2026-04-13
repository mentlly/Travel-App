'use server';
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not set" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const { message } = await req.json();

    const model = await genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });
    const prompt = `
      Provide travel details for: ${message}. 
      Return JSON with these keys: "name", "location", "description", "top_attractions" (as an array), "best_time_to_visit", "image_url_google".
    `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiReply = response.text();
    console.log(aiReply);
    return NextResponse.json(JSON.parse(aiReply));
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
