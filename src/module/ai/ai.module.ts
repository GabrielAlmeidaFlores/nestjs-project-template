import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GeminiModule } from '@infra/generative-ia/implementation/gemini/gemini.module';
import { AiController } from '@module/ai/ai.controller';
import { GeminiModule as AiGeminiModule } from '@module/ai/gemini/gemini.module';
import { McpModule } from '@module/ai/mcp/mcp.module';
import { ChatMessagesToConversationUseCase } from '@module/ai/use-case/chat-messages-to-conversation.use-case';
import { HistoryConversationUseCase } from '@module/ai/use-case/history-conversation.use-case';
import { SendMessageToConversationUseCase } from '@module/ai/use-case/send-message-to-conversation.use-case';
import { StartChatUseCase } from '@module/ai/use-case/start-chat.use-case';
import { OrganizationSessionModule } from '@module/customer/account/lib/organization-session/organization-session.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    OrganizationSessionModule,
    AiGeminiModule,
    McpModule,
    GeminiModule,
  ],
  controllers: [AiController],
  providers: [
    StartChatUseCase,
    SendMessageToConversationUseCase,
    ChatMessagesToConversationUseCase,
    HistoryConversationUseCase,
  ],
})
export class AiModule {
  protected readonly _type = AiModule.name;
}
