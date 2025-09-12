import { Module } from '@nestjs/common';

import { AuthIdentityModule } from '@module/generic/auth-identity/auth-identity.module';

@Module({
  imports: [AuthIdentityModule],
  controllers: [],
  providers: [],
})
export class GenericModule {
  protected readonly _type = GenericModule.name;
}
