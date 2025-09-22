import { Module } from '@nestjs/common';

import { AuthIdentityModule } from '@module/generic/auth-identity/auth-identity.module';

@Module({
  imports: [AuthIdentityModule],
  controllers: [],
  providers: [],
  exports: [AuthIdentityModule],
})
export class AuthModule {
  protected readonly _type = AuthModule.name;
}
