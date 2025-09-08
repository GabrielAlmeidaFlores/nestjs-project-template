import { Module } from '@nestjs/common';

import { AccountController } from '@module/customer/account/account.controller';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [],
})
export class AccountModule {
  protected readonly _type = AccountModule.name;
}
