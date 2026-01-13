import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { TOPPINGS } from "./constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getChefReview(toppingIds: string[]) {
  const selectedToppingNames = toppingIds
    .map(id => TOPPINGS.find(t => t.id === id)?.name)
    .filter(Boolean) as string[];

  const toppingListStr = selectedToppingNames.join(", ");
  
  // Refactor: Use systemInstruction in config as per guidelines for role-playing and constraints
  const systemInstruction = `Act as a friendly, enthusiastic Italian Pizza Chef. 
  Write very short (2-3 sentences), encouraging, and funny reviews of pizzas in simple English suitable for an 8-year-old student. 
  Use some Italian words like 'Mamma Mia!' or 'Bellissimo!'. 
  Keep it positive and rewarding!`;

  const userPrompt = `The student made a pizza with these toppings: ${toppingListStr}. What do you think?`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.8,
        maxOutputTokens: 150,
      },
    });
    // Ensure accessing .text property directly as it is not a method
    return response.text || "Mamma Mia! That looks like a yummy pizza! Great job!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Magnifico! This pizza looks absolutely delicious! You are a master chef!";
  }
}
