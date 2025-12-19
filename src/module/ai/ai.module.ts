import { Module } from '@nestjs/common';

import { ChatModule } from '@module/ai/chat/chat.module';
import { GeminiModule } from '@module/ai/gemini/gemini.module';
import { McpModule } from '@module/ai/mcp/mcp.module';

@Module({
  imports: [McpModule, GeminiModule, ChatModule],
})
export class AiModule {
  protected readonly _type = AiModule.name;
}
