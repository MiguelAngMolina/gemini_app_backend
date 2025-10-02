import { createPartFromUri, GoogleGenAI } from "@google/genai";
import { ChatPromptDto } from "../dtos/chat-prompt.dto";


interface Options{
    model?: string,
    systemInstruction?: string
}
export const chatPrompStreamUseCase = async (
    ai: GoogleGenAI, 
    chatPromptDto: ChatPromptDto,
    options?: Options,
    ) => {
        const {prompt, files = [] } = chatPromptDto;
        //TODO: Refactorizar
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
    
    const chat = ai.chats.create({
    model: model,
    config: {
        systemInstruction: systemInstruction
    },
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Que pasa cracks" }],
      },
    ],
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