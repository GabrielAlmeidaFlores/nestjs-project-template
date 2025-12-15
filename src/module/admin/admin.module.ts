import { Module } from '@nestjs/common';

import { PaymentPlanModule } from '@module/admin/payment-plan/payment-plan.module';

@Module({
  imports: [PaymentPlanModule],
})
export class AdminModule {
  protected readonly _type = AdminModule.name;
}
