import { GoogleGenAI } from "@google/genai";
import { BasicPromptDto } from "../dtos/basic-prompt.dto";


interface Options{
    model?: string,
    systemInstruction?: string
}
export const basicPrompStreamUseCase = async (
    ai: GoogleGenAI, 
    basicPromptDto: BasicPromptDto,
    options?: Options,
    ) => {
        const {
            model = "gemini-2.5-flash",
            systemInstruction = `
            Responde únicamente en español, en formato Markdown
            Usa negritas de esta forma __
            Y usando el sistema métrico decimal`,
    } = options ?? {};
    const response = await ai.models.generateContentStream({
        model: model,
        contents: basicPromptDto.prompt,
        config: {
            systemInstruction: systemInstruction
        }
    });
    return response;
}