import { Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { CreatePaymentPlanRequestDto } from '@module/admin/payment-plan/dto/request/create-payment-plan.request.dto';
import { GetPaymentPlanResponseDto } from '@module/admin/payment-plan/dto/response/get-payment-plan.response.dto';
import { PaymentPlanCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/command/payment-plan.command.repository,gateway';
import { PaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/payment-plan.entity';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';

export class CreatePaymentPlanUseCase {
  protected readonly _type = CreatePaymentPlanUseCase.name;

  public constructor(
    @Inject(PaymentPlanCommandRepositoryGateway)
    private readonly paymentPlanCommandRepositoryGateway: PaymentPlanCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    dto: CreatePaymentPlanRequestDto,
  ): Promise<GetPaymentPlanResponseDto> {
    const now = new Date();

    const paymentPlan = new PaymentPlanEntity({
      id: new PaymentPlanId(),
      name: dto.name,
      description: dto.description,
      price: dto.price,
      maxMemberCount: dto.maxMemberCount,
      monthlyCreditAmount: dto.monthlyCreditAmount,
      active: dto.active,
      cycle: dto.cycle,
      createdAt: now,
      updatedAt: now,
    });

    const transactions: TransactionType[] = [];

    const createPaymentPlan =
      this.paymentPlanCommandRepositoryGateway.createPaymentPlan(paymentPlan);

    transactions.push(createPaymentPlan);

    const execute =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await execute.commit();

    return GetPaymentPlanResponseDto.build({
      ...paymentPlan,
    });
  }
}
