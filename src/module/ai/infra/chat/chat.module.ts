import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { ChatController } from '@module/ai/infra/chat/chat.controller';
import { ChatMessagesToConversationUseCase } from '@module/ai/infra/chat/use-case/chat-messages-to-conversation.use-case';
import { SendMessageToConversationUseCase } from '@module/ai/infra/chat/use-case/send-message-to-conversation.use-case';
import { StartChatUseCase } from '@module/ai/infra/chat/use-case/start-chat.use-case';
import { GeminiModule } from '@module/ai/infra/gemini/gemini.module';
import { McpModule } from '@module/ai/infra/mcp/mcp.module';
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
  ],
})
export class ChatModule {
  protected readonly _type = ChatModule.name;
}
