import { Module } from '@nestjs/common';

import { AccountModule } from '@module/admin/account/account.module';
import { AffiliateCustomerAdminModule } from '@module/admin/affiliate-customer/affiliate-customer.module';
import { CustomerManagementModule } from '@module/admin/customer-management/customer-management.module';
import { DashboardMetricsModule } from '@module/admin/dashboard-metrics/dashboard-metrics.module';
import { PaymentPlanModule } from '@module/admin/payment-plan/payment-plan.module';
import { AdminTutorialModule } from '@module/admin/tutorial/tutorial.module';

@Module({
  imports: [
    AccountModule,
    AffiliateCustomerAdminModule,
    CustomerManagementModule,
    DashboardMetricsModule,
    PaymentPlanModule,
    AdminTutorialModule,
  ],
})
export class AdminModule {
  protected readonly _type = AdminModule.name;
}
