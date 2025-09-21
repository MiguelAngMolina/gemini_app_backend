import { Injectable } from '@nestjs/common';
import { BasicPromptDto } from './dtos/basic-prompt.dto';
import { GoogleGenAI } from "@google/genai";
import { basicPrompUseCase } from './use-cases/basic_prompt.use-case';
import { basicPrompStreamUseCase } from './use-cases/basic_prompt-stream.use-case';


@Injectable()
export class GeminiService {
    private ai = new GoogleGenAI({ apiKey: process.env.GEMINI_APPI_KEY });

    async basicPrompt(basicPromptDto: BasicPromptDto) {
        return basicPrompUseCase(this.ai, basicPromptDto)
    }

    async basicPromptStream(basicPromptDto: BasicPromptDto) {
        return  basicPrompStreamUseCase(this.ai, basicPromptDto);
    }
}