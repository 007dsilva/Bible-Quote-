
import { GoogleGenAI, Type } from "@google/genai";
import { ContentType, DailyInspiration } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateInspiration = async (preferredType?: ContentType): Promise<DailyInspiration> => {
  const prompt = `Select a profound ${preferredType === ContentType.BIBLE_VERSE ? 'Bible verse from the King James Version (KJV)' : preferredType === ContentType.INSPIRATIONAL_QUOTE ? 'timeless inspirational quote' : 'Bible verse (KJV) or inspirational quote'}. 
  The selection should be suitable for sharing on X (Twitter).
  Return a structured response including the text, its source, a 1-sentence reflection for social media, and 2-3 relevant hashtags.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          content: {
            type: Type.STRING,
            description: "The text of the verse or quote.",
          },
          reference: {
            type: Type.STRING,
            description: "The Bible reference (e.g. John 3:16) or author name.",
          },
          type: {
            type: Type.STRING,
            description: "Must be 'bible_verse' or 'inspirational_quote'.",
          },
          reflection: {
            type: Type.STRING,
            description: "A short reflection or caption for X/Twitter.",
          },
          tags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Hashtags without the # symbol.",
          },
        },
        required: ["content", "reference", "type", "reflection", "tags"],
      },
    },
  });

  try {
    const data = JSON.parse(response.text || '{}');
    return data as DailyInspiration;
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    throw new Error("Received invalid data format from AI.");
  }
};
