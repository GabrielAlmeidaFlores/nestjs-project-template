import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CacheStorageModule } from '@infra/cache-storage/cache-storage.module';
import { LocalCacheStorageService } from '@lib/user-session/implementation/local-cache-storage/local-cache-storage.service';
import { FrameworkApplicationVariable } from '@shared/system/constant/application-variable/framework.application-variable';

@Module({
  imports: [
    JwtModule.register({
      secret: FrameworkApplicationVariable.FRAMEWORK_JWT_SECRET,
      signOptions: {
        expiresIn: FrameworkApplicationVariable.FRAMEWORK_JWT_EXPIRATION,
      },
    }),
    CacheStorageModule,
  ],
  providers: [LocalCacheStorageService],
  exports: [JwtModule, CacheStorageModule, LocalCacheStorageService],
})
export class LocalCacheStorageModule {
  protected readonly _type = LocalCacheStorageModule.name;
}
