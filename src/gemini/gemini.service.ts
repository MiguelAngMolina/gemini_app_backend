import { Injectable } from '@nestjs/common';
import { BasicPromptDto } from './dtos/basic-prompt.dto';
import { Content, GoogleGenAI } from "@google/genai";
import { basicPrompUseCase } from './use-cases/basic_prompt.use-case';
import { basicPrompStreamUseCase } from './use-cases/basic_prompt-stream.use-case';
import { ChatPromptDto } from './dtos/chat-prompt.dto';
import { chatPrompStreamUseCase } from './use-cases/chat-prompt-stream.use-case';


@Injectable()
export class GeminiService {
    private ai = new GoogleGenAI({ apiKey: process.env.GEMINI_APPI_KEY });

    private chatHistory = new Map<string, Content[]>();
    

    async basicPrompt(basicPromptDto: BasicPromptDto) {
        return basicPrompUseCase(this.ai, basicPromptDto)
    }

    async basicPromptStream(basicPromptDto: BasicPromptDto) {
        return  basicPrompStreamUseCase(this.ai, basicPromptDto);
    }

    async chatStream(chatPromptDto: ChatPromptDto){
        const chatHistory  = this.getChatHistory(chatPromptDto.chatId)
        return chatPrompStreamUseCase(this.ai, chatPromptDto, {
            history: chatHistory
        });
    }


    saveMessage(chatId: string, message:  Content){
        const  messages  = this.getChatHistory(chatId);

        messages.push(message);
        this.chatHistory.set(chatId, messages);
        console.log(this.chatHistory);

    }

    getChatHistory(chatId: string){
        return structuredClone (this.chatHistory.get(chatId) ?? []);
    }
}