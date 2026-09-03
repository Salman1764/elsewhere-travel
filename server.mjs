import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function generateWithRetry(options) {
  const models = ["gemini-3.7-flash", "gemini-3.5-flash-lite"];

  let lastError = null;

  for (const model of models) {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        console.log(
          `Gemini request: ${model}, attempt ${attempt + 1}`
        );

        return await ai.models.generateContent({
          ...options,
          model,
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

    console.log(`Switching from ${model} to fallback model...`);
  }

  throw lastError || new Error("Gemini request failed.");
}

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Gemini server is running.",
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        success: false,
        error: "Please provide a message.",
      });
    }

    const response = await generateWithRetry({
      contents: message,
      config: {
        systemInstruction:
          "You are Elsewhere's friendly AI travel assistant. Help users with destinations, travel ideas, famous places, trip planning, packing suggestions, and practical travel advice. Keep answers useful, concise, and easy to read. Never pretend to have real-time information unless it is provided by the application.",
      },
    });

    res.json({
      success: true,
      reply: response.text,
    });
  } catch (error) {
    console.error("Chat error:", error);

    res.status(500).json({
      success: false,
      error:
        "The AI assistant is temporarily unavailable. Please try again.",
    });
  }
});

app.post("/api/itinerary", async (req, res) => {
  try {
    const { destination, days, travelStyle } = req.body;

    if (!destination || !days) {
      return res.status(400).json({
        success: false,
        error: "Destination and number of days are required.",
      });
    }

    const numberOfDays = Math.min(
      Math.max(Number(days), 1),
      14
    );

    const prompt = `
Create a practical ${numberOfDays}-day travel itinerary for ${destination}.

Travel style: ${travelStyle || "Balanced"}.

Create a realistic first-time visitor itinerary.

For every day include:
- day number
- short day title
- morning activity and description
- afternoon activity and description
- evening activity and description
- one practical travel tip

Also include:
- a short overall trip title
- a short overall summary

Do not include exact opening hours, ticket prices, reservations, or other real-time information.

Return only valid JSON using exactly this structure:

{
  "title": "string",
  "summary": "string",
  "days": [
    {
      "day": 1,
      "title": "string",
      "morning": {
        "activity": "string",
        "description": "string"
      },
      "afternoon": {
        "activity": "string",
        "description": "string"
      },
      "evening": {
        "activity": "string",
        "description": "string"
      },
      "tip": "string"
    }
  ]
}
`;

    const response = await generateWithRetry({
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            summary: {
              type: "string",
            },
            days: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  day: {
                    type: "integer",
                  },
                  title: {
                    type: "string",
                  },
                  morning: {
                    type: "object",
                    properties: {
                      activity: {
                        type: "string",
                      },
                      description: {
                        type: "string",
                      },
                    },
                    required: [
                      "activity",
                      "description",
                    ],
                  },
                  afternoon: {
                    type: "object",
                    properties: {
                      activity: {
                        type: "string",
                      },
                      description: {
                        type: "string",
                      },
                    },
                    required: [
                      "activity",
                      "description",
                    ],
                  },
                  evening: {
                    type: "object",
                    properties: {
                      activity: {
                        type: "string",
                      },
                      description: {
                        type: "string",
                      },
                    },
                    required: [
                      "activity",
                      "description",
                    ],
                  },
                  tip: {
                    type: "string",
                  },
                },
                required: [
                  "day",
                  "title",
                  "morning",
                  "afternoon",
                  "evening",
                  "tip",
                ],
              },
            },
          },
          required: [
            "title",
            "summary",
            "days",
          ],
        },
      },
    });

    const itinerary = JSON.parse(response.text);

    res.json({
      success: true,
      itinerary,
    });
  } catch (error) {
    console.error("Itinerary error:", error);

    res.status(500).json({
      success: false,
      error:
        "The itinerary service is temporarily unavailable. Please try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `Gemini server running at http://localhost:${PORT}`
  );
});