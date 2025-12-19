import { Module } from '@nestjs/common';

import { GeminiController } from '@module/ai/gemini/gemini.controller';
import { GeminiClient } from '@module/ai/gemini/gemini.service';
import { GeminiOrchestratorUseCase } from '@module/ai/gemini/use-case/orchestrator-use-case';
import { McpModule } from '@module/ai/mcp/mcp.module';

@Module({
  imports: [McpModule],
  providers: [GeminiClient, GeminiOrchestratorUseCase],
  controllers: [GeminiController],
  exports: [GeminiClient],
})
export class GeminiModule {
  protected readonly _type = GeminiModule.name;
}
