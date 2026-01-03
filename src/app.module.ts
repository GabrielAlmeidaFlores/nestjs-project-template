import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { minutes, ThrottlerModule } from '@nestjs/throttler';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

import { AdminModule } from '@module/admin/admin.module';
import { AiModule } from '@module/ai/ai.module';
import { CustomerModule } from '@module/customer/customer.module';
import { GenericModule } from '@module/generic/generic.module';
import { CacheStorageApplicationVariable } from '@shared/system/constant/application-variable/source/cache-storage.application-variable';
import { FrameworkApplicationVariable } from '@shared/system/constant/application-variable/source/framework.application-variable';

@Module({
  imports: [
    GenericModule,
    CustomerModule,
    AdminModule,
    AiModule,
    NestjsFormDataModule.config({
      isGlobal: true,
      storage: MemoryStoredFile,
    }),
    JwtModule.register({
      global: true,
      secret: FrameworkApplicationVariable.FRAMEWORK_JWT_SECRET,
      signOptions: {
        expiresIn: FrameworkApplicationVariable.FRAMEWORK_JWT_EXPIRATION,
      },
    }),
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
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  protected readonly _type = AppModule.name;
}
