import { Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { UpdatePaymentPlanRequestDto } from '@module/admin/payment-plan/dto/request/update-payment-plan.request.dto';
import { GetPaymentPlanResponseDto } from '@module/admin/payment-plan/dto/response/get-payment-plan.response.dto';
import { PaymentPlanEnabledPaidResourceItemResponseDto } from '@module/admin/payment-plan/dto/response/payment-plan-enabled-paid-resource-item.response.dto';
import { MaxActivePaymentPlansReachedError } from '@module/admin/payment-plan/error/max-active-payment-plans-reached.error';
import { PaymentPlanNotFoundError } from '@module/admin/payment-plan/error/payment-plan-not-found.error';
import { PaymentPlanCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/command/payment-plan.command.repository,gateway';
import { PaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/query/payment-plan.query.repository.gateway';
import { PaymentPlanEnabledPaidResourceCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-enabled-paid-resource/command/payment-plan-enabled-paid-resource.command.repository.gateway';
import { PaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/payment-plan.entity';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { PaymentPlanEnabledPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enabled-paid-resource/payment-plan-enabled-paid-resource-entity';
import { PaymentPlanEnabledPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enabled-paid-resource/value-object/payment-plan-enabled-paid-resource-id/payment-plan-enabled-paid-resource-id.value-object';

export class UpdatePaymentPlanUseCase {
  protected readonly _type = UpdatePaymentPlanUseCase.name;

  public constructor(
    @Inject(PaymentPlanCommandRepositoryGateway)
    private readonly paymentPlanCommandRepositoryGateway: PaymentPlanCommandRepositoryGateway,
    @Inject(PaymentPlanEnabledPaidResourceCommandRepositoryGateway)
    private readonly paymentPlanEnabledPaidResourceCommandRepositoryGateway: PaymentPlanEnabledPaidResourceCommandRepositoryGateway,
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

    if (dto.active !== undefined && dto.active === true) {
      if (!paymentPlan.active) {
        const activeCount =
          await this.paymentPlanQueryRepositoryGateway.countActivePaymentPlans();

        const MAX_ACTIVE_PLANS = 3;

        if (activeCount >= MAX_ACTIVE_PLANS) {
          throw new MaxActivePaymentPlansReachedError();
        }
      }
    }

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

    if (dto.paidResourceId !== undefined) {
      const now = new Date();

      const deleteAllPaidResources =
        this.paymentPlanEnabledPaidResourceCommandRepositoryGateway.deleteAllByPaymentPlanId(
          paymentPlan.id,
        );

      transactions.push(deleteAllPaidResources);

      const seenIds = new Set<string>();
      const uniquePaidResourceIds = dto.paidResourceId.filter((id) => {
        const idString = id.toString();
        if (seenIds.has(idString)) {
          return false;
        }
        seenIds.add(idString);
        return true;
      });

      for (const paidResourceId of uniquePaidResourceIds) {
        const paymentPlanEnabledPaidResource =
          new PaymentPlanEnabledPaidResourceEntity({
            id: new PaymentPlanEnabledPaidResourceId(),
            paymentPlan: updatedPaymentPlan.id,
            paymentPlanPaidResource: paidResourceId,
            createdAt: now,
            updatedAt: now,
          });

        const createPaymentPlanEnabledPaidResource =
          this.paymentPlanEnabledPaidResourceCommandRepositoryGateway.createPaymentPlanEnabledPaidResource(
            paymentPlanEnabledPaidResource,
          );

        transactions.push(createPaymentPlanEnabledPaidResource);
      }
    }

    const execute =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await execute.commit();

    const finalPaymentPlan =
      await this.paymentPlanQueryRepositoryGateway.findOnePaymentPlanByIdOrFail(
        paymentPlan.id,
        PaymentPlanNotFoundError,
      );

    return GetPaymentPlanResponseDto.build({
      ...finalPaymentPlan,
      enabledPaidResources: finalPaymentPlan.enabledPaidResources.map(
        (resource) =>
          PaymentPlanEnabledPaidResourceItemResponseDto.build({
            id: resource.paymentPlanPaidResource.id,
            resource: resource.paymentPlanPaidResource.resource,
            creditCost: resource.paymentPlanPaidResource.creditCost,
            description: resource.paymentPlanPaidResource.description,
          }),
      ),
    });
  }
}
