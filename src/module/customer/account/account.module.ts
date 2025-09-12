import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AccountController } from '@module/customer/account/account.controller';
import { CustomerSignUpUseCase } from '@module/customer/account/use-case/customer-sign-up.use-case';
import { AuthIdentityModule } from '@module/generic/auth-identity/auth-identity.module';

@Module({
  imports: [DatabaseModule, AuthIdentityModule],
  controllers: [AccountController],
  providers: [CustomerSignUpUseCase],
})
export class AccountModule {
  protected readonly _type = AccountModule.name;
}
