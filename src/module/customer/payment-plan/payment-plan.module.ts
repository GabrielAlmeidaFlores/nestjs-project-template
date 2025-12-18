import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { PaymentGatewayModule } from '@infra/payment-gateway/payment-gateway.module';
import { PaymentPlanController } from '@module/customer/payment-plan/payment-plan.controller';
import { CancelPaymentPlanUseCase } from '@module/customer/payment-plan/use-case/cancel-payment-plan.use-case';
import { GetOrganizationPaymentPlanStatusUseCase } from '@module/customer/payment-plan/use-case/get-organization-payment-plan-status.use-case';
import { ListPaymentPlansUseCase } from '@module/customer/payment-plan/use-case/list-payment-plans.use-case';
import { SubscribeToMonthlyRecurringPaymentPlanUseCase } from '@module/customer/payment-plan/use-case/subscribe-to-monthly-recurring-payment-plan.use-case';
import { ValidateOrganizationPaymentPlanStatusUseCase } from '@module/customer/payment-plan/use-case/validate-organization-payment-plan-status.use-case';
import { BankModule } from '@module/generic/bank/bank.module';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    BankModule,
    DatabaseModule,
    OrganizationSessionModule,
    PaymentGatewayModule,
  ],
  controllers: [PaymentPlanController],
  providers: [
    SubscribeToMonthlyRecurringPaymentPlanUseCase,
    ListPaymentPlansUseCase,
    CancelPaymentPlanUseCase,
    ValidateOrganizationPaymentPlanStatusUseCase,
    GetOrganizationPaymentPlanStatusUseCase,
  ],
})
export class PaymentPlanModule {
  protected readonly _type = PaymentPlanModule.name;
}
