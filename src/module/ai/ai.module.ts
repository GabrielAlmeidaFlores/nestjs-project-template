import { Module } from '@nestjs/common';

import { GeminiModule } from '@infra/generative-ia/implementation/gemini/gemini.module';
import { ChatModule } from '@module/ai/infra/chat/chat.module';
import { McpModule } from '@module/ai/infra/mcp/mcp.module';

@Module({
  imports: [McpModule, GeminiModule, ChatModule],
})
export class AiModule {
  protected readonly _type = AiModule.name;
}
