import { Module } from '@nestjs/common';

import { AccountModule } from '@module/customer/account/account.module';

@Module({
  imports: [AccountModule],
  controllers: [],
  providers: [],
  exports: [AccountModule],
})
export class OrganizationSessionModule {
  protected readonly _type = OrganizationSessionModule.name;
}
