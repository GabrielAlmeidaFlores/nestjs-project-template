import { Module } from '@nestjs/common';

import { CacheStorageModule } from '@infra/cache-storage/cache-storage.module';
import { RedisModule } from '@infra/cache-storage/implementation/redis/redis.module';
import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { AiConversationController } from '@module/customer/ai-conversation/ai-conversation.controller';
import { McpToolsModule } from '@module/customer/ai-conversation/lib/mcp-tools/mcp-tools.module';
import { AccountModule } from '@module/customer/account/account.module';
import { ConversationCacheRepository } from '@module/customer/ai-conversation/repository/conversation-cache.repository';
import { CreateConversationUseCase } from '@module/customer/ai-conversation/use-case/create-conversation.use-case';
import { GetMessagesUseCase } from '@module/customer/ai-conversation/use-case/get-messages.use-case';
import { SendMessageUseCase } from '@module/customer/ai-conversation/use-case/send-message.use-case';
import { AuthIdentityModule } from '@module/generic/auth-identity/auth-identity.module';

@Module({
  imports: [
    AccountModule,
    AuthIdentityModule,
    CacheStorageModule,
    DatabaseModule,
    GenerativeIaModule,
    McpToolsModule,
    RedisModule,
  ],
  controllers: [AiConversationController],
  providers: [
    ConversationCacheRepository,
    CreateConversationUseCase,
    SendMessageUseCase,
    GetMessagesUseCase,
  ],
  exports: [],
})
export class AiConversationModule {
  protected readonly _type = AiConversationModule.name;
}
