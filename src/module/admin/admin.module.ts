import { Module } from '@nestjs/common';

import { AccountModule } from '@module/admin/account/account.module';

@Module({
  imports: [AccountModule],
  controllers: [],
  providers: [],
})
export class AdminModule {
  protected readonly _type = AdminModule.name;
}
