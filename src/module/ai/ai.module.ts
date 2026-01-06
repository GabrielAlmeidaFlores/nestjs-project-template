import { Module } from '@nestjs/common';

import { GeminiModule } from '@infra/generative-ia/implementation/gemini/gemini.module';
import { ChatModule } from '@module/ai/chat/chat.module';
import { McpModule } from '@module/ai/mcp/mcp.module';

@Module({
  imports: [McpModule, GeminiModule, ChatModule],
})
export class AiModule {
  protected readonly _type = AiModule.name;
}
