import { Module } from '@nestjs/common';

import { CacheStorageModule } from '@infra/cache-storage/cache-storage.module';
import { LocalCacheStorageModule } from '@lib/user-session/implementation/local-cache-storage/local-cache-storage.module';
import { LocalCacheStorageService } from '@lib/user-session/implementation/local-cache-storage/local-cache-storage.service';
import { UserSessionGateway } from '@lib/user-session/user-session.gateway';

@Module({
  imports: [LocalCacheStorageModule, CacheStorageModule],
  providers: [
    {
      provide: UserSessionGateway,
      useClass: LocalCacheStorageService,
    },
    LocalCacheStorageService,
  ],
  exports: [UserSessionGateway],
})
export class UserSessionModule {
  protected readonly _type = UserSessionModule.name;
}
