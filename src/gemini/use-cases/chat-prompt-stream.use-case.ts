import { Content, createPartFromUri, GoogleGenAI } from "@google/genai";
import { ChatPromptDto } from "../dtos/chat-prompt.dto";
import {geminiUploadFiles } from "../helpers/gemini-upload-file";


interface Options{
    model?: string,
    systemInstruction?: string;
    history: Content[];
}
export const chatPrompStreamUseCase = async (
    ai: GoogleGenAI, 
    chatPromptDto: ChatPromptDto,
    options?: Options,
    ) => {
        const {prompt, files = [] } = chatPromptDto;
        const images = await geminiUploadFiles(ai, files);

        const {
            model = "gemini-2.5-flash",
            history = [],
            systemInstruction = `
            Responde únicamente en español, en formato Markdown
            Usa negritas de esta forma __
            Y usando el sistema métrico decimal`,
    } = options ?? {};
    
    const chat = ai.chats.create({
    model: model,
    config: {
        systemInstruction: systemInstruction
    },
    history: history,
  });

  return chat.sendMessageStream({
    message: [
        prompt,
        ...images.map(file=> createPartFromUri(
            file.uri ?? '', file.mimeType ?? ''
        ))
    ]
  })
}