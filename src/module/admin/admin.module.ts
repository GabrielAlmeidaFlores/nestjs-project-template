import { Module } from '@nestjs/common';

import { AccountModule } from '@module/admin/account/account.module';
import { CustomerManagementModule } from '@module/admin/customer-management/customer-management.module';
import { DashboardMetricsModule } from '@module/admin/dashboard-metrics/dashboard-metrics.module';
import { PaymentPlanModule } from '@module/admin/payment-plan/payment-plan.module';

@Module({
  imports: [
    AccountModule,
    CustomerManagementModule,
    DashboardMetricsModule,
    PaymentPlanModule,
  ],
})
export class AdminModule {
  protected readonly _type = AdminModule.name;
}
