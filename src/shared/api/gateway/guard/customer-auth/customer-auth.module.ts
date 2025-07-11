import { Module } from '@nestjs/common';

import { UserSessionModule } from '@lib/user-session/user-session.module';
import { CustomerAuthGuard } from '@shared/api/gateway/guard/customer-auth/customer-auth.guard';

@Module({
  imports: [UserSessionModule],
  providers: [CustomerAuthGuard],
  exports: [CustomerAuthGuard],
})
export class CustomerAuthModule {
  protected readonly _type = CustomerAuthModule.name;
}
