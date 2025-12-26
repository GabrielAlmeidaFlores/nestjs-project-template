import { Module } from '@nestjs/common';

import { AccountModule } from '@module/admin/account/account.module';
import { PaymentPlanModule } from '@module/admin/payment-plan/payment-plan.module';

@Module({
  imports: [PaymentPlanModule, AccountModule],
})
export class AdminModule {
  protected readonly _type = AdminModule.name;
}
