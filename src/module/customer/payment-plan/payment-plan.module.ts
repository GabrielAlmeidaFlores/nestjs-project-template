import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { EmailModule } from '@infra/email/email.module';
import { PaymentGatewayModule } from '@infra/payment-gateway/payment-gateway.module';
import { ResolveAffiliatePlanDiscountService } from '@module/customer/affiliate-customer/service/resolve-affiliate-plan-discount.service';
import { PaymentPlanController } from '@module/customer/payment-plan/payment-plan.controller';
import { CancelPaymentPlanUseCase } from '@module/customer/payment-plan/use-case/cancel-payment-plan.use-case';
import { DeleteOrganizationPaymentPlanUseCase } from '@module/customer/payment-plan/use-case/delete-organization-payment-plan.use-case';
import { GenerateMonthlyPaymentBillingUseCase } from '@module/customer/payment-plan/use-case/generate-monthly-payment-billing.use-case';
import { GenerateYearlyPaymentBillingUseCase } from '@module/customer/payment-plan/use-case/generate-yearly-payment-billing.use-case';
import { GetBankPaymentDetailsUseCase } from '@module/customer/payment-plan/use-case/get-bank-payment-details.use-case';
import { GetOrganizationPaymentPlanStatusUseCase } from '@module/customer/payment-plan/use-case/get-organization-payment-plan-status.use-case';
import { GetPaymentPlanPaidResourcePromptUseCase } from '@module/customer/payment-plan/use-case/get-payment-plan-paid-resource-prompt.use-case';
import { ListBankPaymentsByOrganizationPaymentPlanUseCase } from '@module/customer/payment-plan/use-case/list-bank-payments-by-organization-payment-plan.use-case';
import { ListPaymentPlanPaidResourcesUseCase } from '@module/customer/payment-plan/use-case/list-payment-plan-paid-resources.use-case';
import { ListPaymentPlansUseCase } from '@module/customer/payment-plan/use-case/list-payment-plans.use-case';
import { PayBillingUseCase } from '@module/customer/payment-plan/use-case/pay-billing.use-case';
import { SubscribeToMonthlyRecurringPaymentPlanUseCase } from '@module/customer/payment-plan/use-case/subscribe-to-monthly-recurring-payment-plan.use-case';
import { ValidateOrganizationPaymentPlanStatusUseCase } from '@module/customer/payment-plan/use-case/validate-organization-payment-plan-status.use-case';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';
import { ValidateOrganizationPaymentPlanStatusUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/validate-organization-payment-plan-status.use-case-gateway';
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
    EmailModule,
  ],
  controllers: [PaymentPlanController],
  providers: [
    SubscribeToMonthlyRecurringPaymentPlanUseCase,
    ListPaymentPlansUseCase,
    ListPaymentPlanPaidResourcesUseCase,
    CancelPaymentPlanUseCase,
    ValidateOrganizationPaymentPlanStatusUseCase,
    GetOrganizationPaymentPlanStatusUseCase,
    GenerateMonthlyPaymentBillingUseCase,
    GenerateYearlyPaymentBillingUseCase,
    PayBillingUseCase,
    DeleteOrganizationPaymentPlanUseCase,
    GetPaymentPlanPaidResourcePromptUseCase,
    ListBankPaymentsByOrganizationPaymentPlanUseCase,
    GetBankPaymentDetailsUseCase,
    ResolveAffiliatePlanDiscountService,
    {
      provide: ValidateOrganizationPaymentPlanStatusUseCaseGateway,
      useClass: ValidateOrganizationPaymentPlanStatusUseCase,
    },
    {
      provide: GetPaymentPlanPaidResourcePromptUseCaseGateway,
      useClass: GetPaymentPlanPaidResourcePromptUseCase,
    },
  ],
  exports: [
    ValidateOrganizationPaymentPlanStatusUseCaseGateway,
    GetPaymentPlanPaidResourcePromptUseCaseGateway,
  ],
})
export class PaymentPlanModule {
  protected readonly _type = PaymentPlanModule.name;
}
