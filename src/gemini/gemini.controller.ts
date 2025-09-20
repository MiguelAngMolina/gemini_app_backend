import { Controller, Get } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { get } from 'http';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}


  @Get()
  getHelloWord(){
    const apiKey =  process.env.GEMINI_APPI_KEY;
    return {apiKey};
  }

}
