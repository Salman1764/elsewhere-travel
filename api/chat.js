import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function generateWithRetry(message) {
  const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];

  let lastError = null;

  for (const model of models) {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        console.log(
          `Gemini chat request: ${model}, attempt ${attempt + 1}`
        );

        return await ai.models.generateContent({
          model,
          contents: message,
          config: {
            systemInstruction:
              "You are Elsewhere's friendly AI travel assistant. Help users with destinations, travel ideas, famous places, trip planning, packing suggestions, and practical travel advice. Keep answers useful, concise, and easy to read. Never pretend to have real-time information unless it is provided by the application.",
          },
        });
      } catch (error) {
        lastError = error;

        console.error(
          `Gemini ${model} attempt ${attempt + 1} failed:`,
          error?.message || error
        );

        if (attempt < 2) {
          await sleep(1500 * (attempt + 1));
        }
      }
    }
  }

  throw lastError || new Error("Gemini request failed.");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed.",
    });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        success: false,
        error: "Please provide a message.",
      });
    }

    const response = await generateWithRetry(message);

    return res.status(200).json({
      success: true,
      reply: response.text,
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return res.status(500).json({
      success: false,
      error:
        "The AI assistant is temporarily unavailable. Please try again.",
    });
  }
}