import { Module } from '@nestjs/common';

import { CacheStorageModule } from '@infra/cache-storage/cache-storage.module';
import { LocalCacheStorageService } from '@lib/user-session/implementation/local-cache-storage/local-cache-storage.service';

@Module({
  imports: [CacheStorageModule],
  providers: [LocalCacheStorageService],
  exports: [LocalCacheStorageService],
})
export class LocalCacheStorageModule {
  protected readonly _type = LocalCacheStorageModule.name;
}
