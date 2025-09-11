import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { Module } from '@nestjs/common';
import { minutes, ThrottlerModule } from '@nestjs/throttler';

import { CustomerModule } from '@module/customer/customer.module';
import { GenericModule } from '@module/generic/generic.module';
import { CacheStorageApplicationVariable } from '@shared/system/constant/application-variable/source/cache-storage.application-variable';

@Module({
  imports: [
    GenericModule,
    CustomerModule,
    ThrottlerModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => {
        const fiveMinutes = 5;

        return {
          throttlers: [
            {
              ttl: minutes(fiveMinutes),
              limit: 10,
            },
          ],
          storage: new ThrottlerStorageRedisService({
            host: CacheStorageApplicationVariable.CACHE_STORAGE_HOST,
            password: CacheStorageApplicationVariable.CACHE_STORAGE_PASSWORD,
            port: CacheStorageApplicationVariable.CACHE_STORAGE_PORT,
          }),
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  protected readonly _type = AppModule.name;
}
