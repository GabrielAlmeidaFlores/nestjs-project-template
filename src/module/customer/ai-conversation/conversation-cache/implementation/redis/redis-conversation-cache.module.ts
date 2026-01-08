import { Module } from '@nestjs/common';
import Redis from 'ioredis';

import { RedisConversationCacheService } from '@module/customer/ai-conversation/conversation-cache/implementation/redis/redis-conversation-cache.service';
import { CacheStorageApplicationVariable } from '@shared/system/constant/application-variable/source/cache-storage.application-variable';

const redisProvider = {
  provide: 'REDIS_CLIENT',
  useFactory: (): Redis => {
    const client = new Redis({
      host: CacheStorageApplicationVariable.CACHE_STORAGE_HOST,
      port: CacheStorageApplicationVariable.CACHE_STORAGE_PORT,
      password: CacheStorageApplicationVariable.CACHE_STORAGE_PASSWORD,
    });

    client.on('error', (err) => {
      throw err;
    });

    return client;
  },
};

@Module({
  providers: [redisProvider, RedisConversationCacheService],
  exports: [redisProvider, RedisConversationCacheService],
})
export class RedisConversationCacheModule {
  protected readonly _type = RedisConversationCacheModule.name;
}
