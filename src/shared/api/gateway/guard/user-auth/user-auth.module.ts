import { Module } from '@nestjs/common';

import { UserSessionModule } from '@lib/user-session/user-session.module';
import { UserAuthGuard } from '@shared/api/gateway/guard/user-auth/user-auth.guard';

@Module({
  imports: [UserSessionModule],
  providers: [UserAuthGuard],
  exports: [UserAuthGuard],
})
export class UserAuthModule {
  protected readonly _type = UserAuthModule.name;
}
