import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function generateWithRetry(prompt) {
  const models = ["gemini-3.7-flash", "gemini-2.5-flash-lite"];

  let lastError = null;

  for (const model of models) {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        console.log(
          `Gemini itinerary request: ${model}, attempt ${attempt + 1}`
        );

        return await ai.models.generateContent({
          model,
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
                        required: ["activity", "description"],
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
                        required: ["activity", "description"],
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
                        required: ["activity", "description"],
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
              required: ["title", "summary", "days"],
            },
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

  throw lastError || new Error("Gemini itinerary request failed.");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed.",
    });
  }

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
`;

    const response = await generateWithRetry(prompt);

    const itinerary = JSON.parse(response.text);

    return res.status(200).json({
      success: true,
      itinerary,
    });
  } catch (error) {
    console.error("Itinerary API error:", error);

    return res.status(500).json({
      success: false,
      error:
        "The itinerary service is temporarily unavailable. Please try again.",
    });
  }
}