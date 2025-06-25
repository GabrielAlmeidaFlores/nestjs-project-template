import { Module } from '@nestjs/common';

import { CacheStorageGateway } from '@infra/cache-storage/cache-storage.gateway';
import { RedisModule } from '@infra/cache-storage/implementation/redis/redis.module';
import { RedisService } from '@infra/cache-storage/implementation/redis/redis.service';

@Module({
  imports: [RedisModule],
  providers: [
    {
      provide: CacheStorageGateway,
      useClass: RedisService,
    },
    RedisService,
  ],
  exports: [CacheStorageGateway],
})
export class CacheStorageModule {
  protected readonly _type = CacheStorageModule.name;
}
