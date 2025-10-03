// src/app/controller.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateRecipes(ingredients: string): Promise<string> {
  // Check if API key is available
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "API key not found. Please check your environment variables."
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `You are a helpful assistant for creating recipes. Only using the following ingredients: ${ingredients}, suggest up to three unique and creative recipes. Format your response as a numbered list with the recipe name and recipe with detailed steps. Avoid repeating content or using placeholder phrases.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating recipes:", error);
    throw error;
  }
}
