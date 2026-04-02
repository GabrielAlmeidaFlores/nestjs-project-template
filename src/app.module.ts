import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { minutes, ThrottlerModule } from '@nestjs/throttler';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

import { DatabaseModule } from '@infra/database/database.module';
import { AdminModule } from '@module/admin/admin.module';
import { CustomerModule } from '@module/customer/customer.module';
import { GenericModule } from '@module/generic/generic.module';
import { SupportModule } from '@module/support/support.module';
import { SystemLogInterceptor } from '@shared/api/gateway/interceptor/system-log/system-log.interceptor';
import { CacheStorageApplicationVariable } from '@shared/system/constant/application-variable/source/cache-storage.application-variable';
import { FrameworkApplicationVariable } from '@shared/system/constant/application-variable/source/framework.application-variable';
import { ObservabilityModule } from '@shared/system/observability/observability.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ObservabilityModule,
    DatabaseModule,
    AdminModule,
    GenericModule,
    CustomerModule,
    SupportModule,
    AdminModule,
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
  providers: [SystemLogInterceptor],
})
export class AppModule {
  protected readonly _type = AppModule.name;
}
