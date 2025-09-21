import { createPartFromUri, createUserContent, GoogleGenAI } from "@google/genai";
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
        const {prompt, files = [] } = basicPromptDto;
        
        const images = await Promise.all(
            files.map( (file) => {
                const image = ai.files.upload({
                file: new Blob([new Uint8Array(file.buffer)], {
                    type: file.mimetype.includes('image') ? file.mimetype : 'image/jpg'
                }),
            });
            return image;
            }

        ));

        const {
            model = "gemini-2.5-flash",
            systemInstruction = `
            Responde únicamente en español, en formato Markdown
            Usa negritas de esta forma __
            Y usando el sistema métrico decimal`,
    } = options ?? {};
    const response = await ai.models.generateContentStream({
        model: model,
        // contents: basicPromptDto.prompt,
        contents: [
            createUserContent([
                prompt,
                // createPartFromUri(image.uri ?? '', image.mimeType ?? ''),
                ...images.map((image)=> createPartFromUri(image.uri ?? '', image.mimeType ?? '')
                ),
            ])
        ],
        config: {
            systemInstruction: systemInstruction
        }
    });
    return response;
}