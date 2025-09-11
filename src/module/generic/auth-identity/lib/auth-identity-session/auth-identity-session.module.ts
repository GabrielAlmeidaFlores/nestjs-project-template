import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { CacheStorageModule } from '@infra/cache-storage/cache-storage.module';
import { AuthIdentitySessionGateway } from '@module/generic/auth-identity/lib/auth-identity-session/auth-identity-session.gateway';
import { AuthIdentitySessionService } from '@module/generic/auth-identity/lib/auth-identity-session/auth-identity-session.service';
import { FrameworkApplicationVariable } from '@shared/system/constant/application-variable/source/framework.application-variable';

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
