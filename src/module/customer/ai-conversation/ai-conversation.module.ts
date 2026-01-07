import { Module } from '@nestjs/common';

import { BucketModule } from '@infra/bucket/bucket.module';
import { CacheStorageModule } from '@infra/cache-storage/cache-storage.module';
import { RedisModule } from '@infra/cache-storage/implementation/redis/redis.module';
import { DatabaseModule } from '@infra/database/database.module';
import { GenerativeIaModule } from '@infra/generative-ia/generative-ia.module';
import { AccountModule } from '@module/customer/account/account.module';
import { AiConversationController } from '@module/customer/ai-conversation/ai-conversation.controller';
import { ConversationCacheModule } from '@module/customer/ai-conversation/conversation-cache/conversation-cache.module';
import { MarkdownConverterModule } from '@module/customer/ai-conversation/lib/markdown-converter/markdown-converter.module';
import { McpToolsModule } from '@module/customer/ai-conversation/lib/mcp-tools/mcp-tools.module';
import { CalculateMessageCreditCostUseCase } from '@module/customer/ai-conversation/use-case/calculate-message-credit-cost.use-case';
import { CreateConversationUseCase } from '@module/customer/ai-conversation/use-case/create-conversation.use-case';
import { GetMessagesUseCase } from '@module/customer/ai-conversation/use-case/get-messages.use-case';
import { ListConversationsUseCase } from '@module/customer/ai-conversation/use-case/list-conversations.use-case';
import { SendMessageUseCase } from '@module/customer/ai-conversation/use-case/send-message.use-case';
import { OrganizationCreditModule } from '@module/customer/organization-credit/organization-credit.module';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthIdentityModule } from '@module/generic/auth-identity/auth-identity.module';

@Module({
  imports: [
    AccountModule,
    AuthIdentityModule,
    BucketModule,
    CacheStorageModule,
    ConversationCacheModule,
    DatabaseModule,
    GenerativeIaModule,
    MarkdownConverterModule,
    McpToolsModule,
    OrganizationCreditModule,
    PaymentPlanModule,
    RedisModule,
  ],
  controllers: [AiConversationController],
  providers: [
    CreateConversationUseCase,
    SendMessageUseCase,
    GetMessagesUseCase,
    ListConversationsUseCase,
    CalculateMessageCreditCostUseCase,
  ],
  exports: [],
})
export class AiConversationModule {
  protected readonly _type = AiConversationModule.name;
}
