import { Content, createPartFromUri, GoogleGenAI } from "@google/genai";
import {geminiUploadFiles } from "../helpers/gemini-upload-file";
import { ImageGenerationDto } from "../dtos/image-generation.dto";
import { text } from "stream/consumers";


interface Options{
    model?: string,
    systemInstruction?: string;
}

export interface ImageGenerationResponse{
    imageUrl: string ;
    text: string;
}
export const imageGenerationUseCase = async (
    ai: GoogleGenAI, 
    imageGenerationDto: ImageGenerationDto,
    options?: Options,
    ): Promise<ImageGenerationResponse> => {
        const {prompt, files = [] } = imageGenerationDto;
        const images = await geminiUploadFiles(ai, files);

        const {
            model = "gemini-2.5-flash",
            systemInstruction = `
            Responde únicamente en español, en formato Markdown
            Usa negritas de esta forma __
            Y usando el sistema métrico decimal`,
    } = options ?? {};

    return {
        imageUrl: 'xxxax',
        text: 'ABC'
    }
}