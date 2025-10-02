import { Body, Controller, HttpStatus, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import express from 'express';
import { GeminiService } from './gemini.service';
import { BasicPromptDto } from './dtos/basic-prompt.dto';
import {FilesInterceptor } from '@nestjs/platform-express';
import { ChatPromptDto } from './dtos/chat-prompt.dto';
import { GenerateContentResponse } from '@google/genai';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}


  async outputStreamResponse(
    res: express.Response, 
    stream: AsyncGenerator<GenerateContentResponse, any, any>){
    // res.setHeader('Content-type', 'application/json');
    res.setHeader('Content-type', 'text/plain');
    res.status(HttpStatus.OK);

    let resultText = '';
    for await (const chunk of stream){
      const piece = chunk.text;
      resultText+= piece;
      res.write(piece);
    }
    res.end();
    return resultText
    }


  @Post('basic-prompt')
   basicPrompt(@Body() basicPromptDto:BasicPromptDto){
    return this.geminiService.basicPrompt(basicPromptDto);
  }
  
  @Post('basic-prompt-stream')
  @UseInterceptors(FilesInterceptor('files'))

   async basicPromptStream(
    @Body() basicPromptDto:BasicPromptDto,
    @Res() res: express.Response,
    @UploadedFiles() files: Array<Express.Multer.File>
  ){
    
    basicPromptDto.files = files ?? [];

    const stream = await this.geminiService.basicPromptStream(basicPromptDto);
    void this.outputStreamResponse(res,stream);
  }



  @Post('chat-stream')
  @UseInterceptors(FilesInterceptor('files'))
   async chatStream(
    @Body() chatPromptDto: ChatPromptDto,
    @Res() res: express.Response,
    @UploadedFiles() files: Array<Express.Multer.File>
  ){
    
    chatPromptDto.files = files ?? [];

    const stream = await this.geminiService.chatStream(chatPromptDto);

    const data = await this.outputStreamResponse(res, stream);

    console.log({data});

    
  }
}
