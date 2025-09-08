import { Module } from '@nestjs/common';

import { AccountModule } from '@module/customer/account/account.module';

@Module({
  imports: [AccountModule],
  controllers: [],
  providers: [],
})
export class CustomerModule {
  protected readonly _type = CustomerModule.name;
}
