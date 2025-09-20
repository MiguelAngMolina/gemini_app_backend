import { GoogleGenAI } from "@google/genai";
import { BasicPromptDto } from "../dtos/basic-prompt.dto";

export const basicPrompUseCase = async (
    ai: GoogleGenAI, 
    basicPromptDto: BasicPromptDto
    ) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: basicPromptDto.prompt,
        config: {
            systemInstruction: `
            Responde únicamente en español, en formato Markdown
            Y usando el sistema métrico decimal`
        }
    });
    return response.text;
}