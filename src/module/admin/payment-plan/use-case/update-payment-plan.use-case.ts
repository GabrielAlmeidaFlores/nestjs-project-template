import { Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { UpdatePaymentPlanRequestDto } from '@module/admin/payment-plan/dto/request/update-payment-plan.request.dto';
import { GetPaymentPlanResponseDto } from '@module/admin/payment-plan/dto/response/get-payment-plan.response.dto';
import { PaymentPlanNotFoundError } from '@module/admin/payment-plan/error/payment-plan-not-found.error';
import { PaymentPlanCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/command/payment-plan.command.repository,gateway';
import { PaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/query/payment-plan.query.repository.gateway';
import { PaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/payment-plan.entity';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';

export class UpdatePaymentPlanUseCase {
  protected readonly _type = UpdatePaymentPlanUseCase.name;

  public constructor(
    @Inject(PaymentPlanCommandRepositoryGateway)
    private readonly paymentPlanCommandRepositoryGateway: PaymentPlanCommandRepositoryGateway,
    @Inject(PaymentPlanQueryRepositoryGateway)
    private readonly paymentPlanQueryRepositoryGateway: PaymentPlanQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    paymentPlanId: PaymentPlanId,
    dto: UpdatePaymentPlanRequestDto,
  ): Promise<GetPaymentPlanResponseDto> {
    const paymentPlan =
      await this.paymentPlanQueryRepositoryGateway.findOnePaymentPlanByIdOrFail(
        paymentPlanId,
        PaymentPlanNotFoundError,
      );

    const updatedPaymentPlan = new PaymentPlanEntity({
      ...paymentPlan,
      ...dto,
      id: paymentPlan.id,
    });

    const transactions: TransactionType[] = [];

    const updatePaymentPlan =
      this.paymentPlanCommandRepositoryGateway.updatePaymentPlan(
        paymentPlan.id,
        updatedPaymentPlan,
      );

    transactions.push(updatePaymentPlan);

    const execute =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await execute.commit();

    return GetPaymentPlanResponseDto.build({
      ...updatedPaymentPlan,
    });
  }
}
