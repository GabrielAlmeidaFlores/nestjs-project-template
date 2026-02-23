import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { CustomerManagementController } from '@module/admin/customer-management/customer-management.controller';
import { DeactivateCustomerAuthIdentityUseCase } from '@module/admin/customer-management/use-case/deactivate-customer-auth-identity.use-case';
import { ListCustomersUseCase } from '@module/admin/customer-management/use-case/list-customers.use-case';
import { PaymentPlanModule } from '@module/customer/payment-plan/payment-plan.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule, PaymentPlanModule],
  controllers: [CustomerManagementController],
  providers: [ListCustomersUseCase, DeactivateCustomerAuthIdentityUseCase],
})
export class CustomerManagementModule {
  protected readonly _type = CustomerManagementModule.name;
}
