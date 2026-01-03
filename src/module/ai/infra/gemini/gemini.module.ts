import { Module } from '@nestjs/common';

import { GeminiClient } from '@module/ai/infra/gemini/gemini.service';
import { GeminiOrchestratorUseCase } from '@module/ai/infra/gemini/use-case/orchestrator-use-case';
import { McpModule } from '@module/ai/infra/mcp/mcp.module';

@Module({
  imports: [McpModule],
  providers: [GeminiClient, GeminiOrchestratorUseCase],
  exports: [GeminiClient],
})
export class GeminiModule {
  protected readonly _type = GeminiModule.name;
}
