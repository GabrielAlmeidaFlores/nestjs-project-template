import { Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { PaymentPlanNotFoundError } from '@module/admin/payment-plan/error/payment-plan-not-found.error';
import { PaymentPlanCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/command/payment-plan.command.repository,gateway';
import { PaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/query/payment-plan.query.repository.gateway';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';

export class DeletePaymentPlanUseCase {
  protected readonly _type = DeletePaymentPlanUseCase.name;

  public constructor(
    @Inject(PaymentPlanCommandRepositoryGateway)
    private readonly paymentPlanCommandRepositoryGateway: PaymentPlanCommandRepositoryGateway,
    @Inject(PaymentPlanQueryRepositoryGateway)
    private readonly paymentPlanQueryRepositoryGateway: PaymentPlanQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(id: PaymentPlanId): Promise<void> {
    await this.paymentPlanQueryRepositoryGateway.findOnePaymentPlanByIdOrFail(
      id,
      PaymentPlanNotFoundError,
    );

    const deleteTransaction =
      this.paymentPlanCommandRepositoryGateway.deletePaymentPlan(id);

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      deleteTransaction,
    ]);

    await transaction.commit();
  }
}
