import { Controller, Body, Post } from '@nestjs/common';

import { GeminiChatRequestDto } from '@module/ai/gemini/dto/request/gemini-chat.request.dto';
import {
  AiResponseInterface,
  GeminiOrchestratorUseCase,
} from '@module/ai/gemini/use-case/orchestrator-use-case';

@Controller('ai')
export class GeminiController {
  protected readonly _type = GeminiController.name;

  public constructor(
    private readonly orchestratorUseCase: GeminiOrchestratorUseCase,
  ) {}

  @Post('gemini-chat')
  public async chat(
    @Body() dto: GeminiChatRequestDto,
  ): Promise<AiResponseInterface> {
    return await this.orchestratorUseCase.execute(dto);
  }
}
