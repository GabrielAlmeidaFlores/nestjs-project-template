import { Module } from '@nestjs/common';

import { AccountModule } from '@module/support/account/account.module';
import { ServiceDeskModule } from '@module/support/service-desk/service-desk.module';

@Module({
  imports: [AccountModule, ServiceDeskModule],
})
export class SupportModule {
  protected readonly _type = SupportModule.name;
}
