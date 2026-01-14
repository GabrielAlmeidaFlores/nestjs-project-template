import { Module } from '@nestjs/common';

import { ConversationCacheGateway } from '@module/customer/ai-conversation/conversation-cache/conversation-cache.gateway';
import { RedisConversationCacheModule } from '@module/customer/ai-conversation/conversation-cache/implementation/redis/redis-conversation-cache.module';
import { RedisConversationCacheService } from '@module/customer/ai-conversation/conversation-cache/implementation/redis/redis-conversation-cache.service';

@Module({
  imports: [RedisConversationCacheModule],
  providers: [
    {
      provide: ConversationCacheGateway,
      useClass: RedisConversationCacheService,
    },
  ],
  exports: [ConversationCacheGateway],
})
export class ConversationCacheModule {
  protected readonly _type = ConversationCacheModule.name;
}
