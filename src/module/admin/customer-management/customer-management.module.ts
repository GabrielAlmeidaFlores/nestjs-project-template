import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { CustomerManagementController } from '@module/admin/customer-management/customer-management.controller';
import { GetCustomerBankPaymentsUseCase } from '@module/admin/customer-management/use-case/get-customer-bank-payments.use-case';
import { GetCustomerProfileUseCase } from '@module/admin/customer-management/use-case/get-customer-profile.use-case';
import { ListCustomersUseCase } from '@module/admin/customer-management/use-case/list-customers.use-case';
import { ToggleCustomerActiveStatusUseCase } from '@module/admin/customer-management/use-case/toggle-customer-active-status.use-case';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule, PaymentPlanModule],
  controllers: [CustomerManagementController],
  providers: [
    ListCustomersUseCase,
    ToggleCustomerActiveStatusUseCase,
    GetCustomerProfileUseCase,
    GetCustomerBankPaymentsUseCase,
  ],
})
export class CustomerManagementModule {
  protected readonly _type = CustomerManagementModule.name;
}
