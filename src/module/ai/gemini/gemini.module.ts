import { Module } from '@nestjs/common';

import { GeminiClient } from '@module/ai/gemini/gemini.service';
import { McpModule } from '@module/ai/mcp/mcp.module';

@Module({
  imports: [McpModule],
  providers: [GeminiClient],
  exports: [GeminiClient],
})
export class GeminiModule {
  protected readonly _type = GeminiModule.name;
}
