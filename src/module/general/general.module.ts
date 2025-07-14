import { Module } from '@nestjs/common';

import { AuthModule } from '@module/general/auth/auth.module';
import { UserAuthModule } from '@shared/api/gateway/guard/user-auth/user-auth.module';

@Module({
  imports: [UserAuthModule, AuthModule],
  controllers: [],
  providers: [],
})
export class GeneralModule {
  protected readonly _type = GeneralModule.name;
}
