import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { PaymentPlanController } from '@module/admin/payment-plan/payment-plan.controller';
import { CreatePaymentPlanUseCase } from '@module/admin/payment-plan/use-case/create-payment-plan.use-case';
import { DeletePaymentPlanUseCase } from '@module/admin/payment-plan/use-case/delete-payment-plan.use-case';
import { GetPaymentPlanUseCase } from '@module/admin/payment-plan/use-case/get-payment-plan.use-case';
import { ListPaymentPlanPaidResourcesUseCase } from '@module/admin/payment-plan/use-case/list-payment-plan-paid-resources.use-case';
import { ListPaymentPlansUseCase } from '@module/admin/payment-plan/use-case/list-payment-plans.use-case';
import { UpdatePaymentPlanUseCase } from '@module/admin/payment-plan/use-case/update-payment-plan.use-case';
import { AuthModule } from '@shared/api/gateway/guard/auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [PaymentPlanController],
  providers: [
    CreatePaymentPlanUseCase,
    UpdatePaymentPlanUseCase,
    DeletePaymentPlanUseCase,
    GetPaymentPlanUseCase,
    ListPaymentPlansUseCase,
    ListPaymentPlanPaidResourcesUseCase,
  ],
})
export class PaymentPlanModule {
  protected readonly _type = PaymentPlanModule.name;
}
