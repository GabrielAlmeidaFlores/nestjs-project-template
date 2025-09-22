import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AccountController } from '@module/customer/account/account.controller';
import { CustomerSignUpUseCase } from '@module/customer/account/use-case/customer-sign-up.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [AccountController],
  providers: [CustomerSignUpUseCase],
})
export class AccountModule {
  protected readonly _type = AccountModule.name;
}
