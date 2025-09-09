import { Module } from '@nestjs/common';

import { LocalCacheStorageModule } from '@lib/user-temp-data/implementation/local-cache-storage/local-cache-storage.module';
import { LocalCacheStorageService } from '@lib/user-temp-data/implementation/local-cache-storage/local-cache-storage.service';
import { UserTempDataGateway } from '@lib/user-temp-data/user-temp-data.gateway';

@Module({
  imports: [LocalCacheStorageModule],
  providers: [
    {
      provide: UserTempDataGateway,
      useClass: LocalCacheStorageService,
    },
    LocalCacheStorageService,
  ],
  exports: [UserTempDataGateway],
})
export class UserTempDataModule {
  protected readonly _type = UserTempDataModule.name;
}
