import { Module } from '@nestjs/common';

import { CacheStorageModule } from '@infra/cache-storage/cache-storage.module';
import { AuthIdentitySessionGateway } from '@module/generic/auth-identity/lib/auth-identity-session/auth-identity-session.gateway';
import { AuthIdentitySessionService } from '@module/generic/auth-identity/lib/auth-identity-session/auth-identity-session.service';

@Module({
  imports: [CacheStorageModule],
  providers: [
    AuthIdentitySessionService,
    {
      provide: AuthIdentitySessionGateway,
      useClass: AuthIdentitySessionService,
    },
  ],
  exports: [AuthIdentitySessionGateway],
})
export class AuthIdentitySessionModule {
  protected readonly _type = AuthIdentitySessionModule.name;
}
