import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { PaymentGatewayModule } from '@infra/payment-gateway/payment-gateway.module';
import { PaymentPlanController } from '@module/customer/payment-plan/payment-plan.controller';
import { ListPaymentPlansUseCase } from '@module/customer/payment-plan/use-case/list-payment-plans.use-case';
import { SubscribePaymentPlanUseCase } from '@module/customer/payment-plan/use-case/subscribe-payment-plan.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';
import { OrganizationSessionModule } from '@shared/api/gateway/guard/organization-session/organization-session.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    OrganizationSessionModule,
    PaymentGatewayModule,
  ],
  controllers: [PaymentPlanController],
  providers: [SubscribePaymentPlanUseCase, ListPaymentPlansUseCase],
})
export class PaymentPlanModule {
  protected readonly _type = PaymentPlanModule.name;
}
