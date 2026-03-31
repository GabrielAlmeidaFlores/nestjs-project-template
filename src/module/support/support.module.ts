import { Module } from '@nestjs/common';

import { AccountModule } from '@module/support/account/account.module';

@Module({
  imports: [AccountModule],
})
export class SupportModule {
  protected readonly _type = SupportModule.name;
}
