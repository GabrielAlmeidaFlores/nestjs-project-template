import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { UserSessionModule } from '@lib/user-session/user-session.module';
import { AccountController } from '@module/customer/account/account.controller';
import { CustomerSignUpUseCase } from '@module/customer/account/use-case/customer-sign-up.use-case';

@Module({
  imports: [DatabaseModule, UserSessionModule],
  controllers: [AccountController],
  providers: [CustomerSignUpUseCase],
})
export class AccountModule {
  protected readonly _type = AccountModule.name;
}
