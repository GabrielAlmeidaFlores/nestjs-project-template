import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { UserTempDataModule } from '@lib/user-temp-data/user-temp-data.module';
import { AccountController } from '@module/customer/account/account.controller';
import { CustomerSignInUseCase } from '@module/customer/account/use-case/customer-sign-in.use-case';
import { CustomerSignUpUseCase } from '@module/customer/account/use-case/customer-sign-up.use-case';

@Module({
  imports: [DatabaseModule, UserTempDataModule],
  controllers: [AccountController],
  providers: [CustomerSignUpUseCase, CustomerSignInUseCase],
})
export class AccountModule {
  protected readonly _type = AccountModule.name;
}
