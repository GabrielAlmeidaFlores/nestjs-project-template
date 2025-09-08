import { Module } from '@nestjs/common';
import Redis from 'ioredis';

import { RedisService } from '@infra/cache-storage/implementation/redis/redis.service';
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
  providers: [redisProvider, RedisService],
  exports: [redisProvider, RedisService],
})
export class RedisModule {
  protected readonly _type = RedisModule.name;
}
