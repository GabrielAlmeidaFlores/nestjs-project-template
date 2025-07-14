import { Module } from '@nestjs/common';

import { AuthModule } from '@module/generic/auth/auth.module';
import { UserAuthModule } from '@shared/api/gateway/guard/user-auth/user-auth.module';

@Module({
  imports: [UserAuthModule, AuthModule],
  controllers: [],
  providers: [],
})
export class GenericModule {
  protected readonly _type = GenericModule.name;
}
