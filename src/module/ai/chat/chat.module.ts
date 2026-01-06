import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { ChatController } from '@module/ai/chat/chat.controller';
import { ChatMessagesToConversationUseCase } from '@module/ai/chat/use-case/chat-messages-to-conversation.use-case';
import { HistoryConversationUseCase } from '@module/ai/chat/use-case/history-conversation.use-case';
import { SendMessageToConversationUseCase } from '@module/ai/chat/use-case/send-message-to-conversation.use-case';
import { StartChatUseCase } from '@module/ai/chat/use-case/start-chat.use-case';
import { GeminiModule } from '@module/ai/gemini/gemini.module';
import { McpModule } from '@module/ai/mcp/mcp.module';
import { OrganizationSessionModule } from '@module/customer/account/lib/organization-session/organization-session.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    OrganizationSessionModule,
    GeminiModule,
    McpModule,
  ],
  controllers: [ChatController],
  providers: [
    StartChatUseCase,
    SendMessageToConversationUseCase,
    ChatMessagesToConversationUseCase,
    HistoryConversationUseCase,
  ],
})
export class ChatModule {
  protected readonly _type = ChatModule.name;
}
