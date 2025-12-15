import { Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { UpdatePaymentPlanRequestDto } from '@module/admin/payment-plan/dto/request/update-payment-plan.request.dto';
import { GetPaymentPlanResponseDto } from '@module/admin/payment-plan/dto/response/get-payment-plan.response.dto';
import { PaymentPlanEnabledPaidResourceItemResponseDto } from '@module/admin/payment-plan/dto/response/payment-plan-enabled-paid-resource-item.response.dto';
import { PaymentPlanNotFoundError } from '@module/admin/payment-plan/error/payment-plan-not-found.error';
import { PaymentPlanCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/command/payment-plan.command.repository,gateway';
import { PaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/query/payment-plan.query.repository.gateway';
import { PaymentPlanEnablePaidResourceCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-enable-paid-resource/command/payment-plan-enable-paid-resource.command.repository.gateway';
import { PaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/payment-plan.entity';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { PaymentPlanEnablePaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enable-paid-resource/payment-plan-enable-paid-resource-entity';
import { PaymentPlanEnablePaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enable-paid-resource/value-object/payment-plan-enable-paid-resource-id/payment-plan-enable-paid-resource-id.value-object';
import { PaymentPlanPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/payment-plan-paid-resource.entity';

export class UpdatePaymentPlanUseCase {
  protected readonly _type = UpdatePaymentPlanUseCase.name;

  public constructor(
    @Inject(PaymentPlanCommandRepositoryGateway)
    private readonly paymentPlanCommandRepositoryGateway: PaymentPlanCommandRepositoryGateway,
    @Inject(PaymentPlanEnablePaidResourceCommandRepositoryGateway)
    private readonly paymentPlanEnablePaidResourceCommandRepositoryGateway: PaymentPlanEnablePaidResourceCommandRepositoryGateway,
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

    if (dto.paidResourceIds !== undefined) {
      const now = new Date();

      const deleteAllPaidResources =
        this.paymentPlanEnablePaidResourceCommandRepositoryGateway.deleteAllByPaymentPlanId(
          paymentPlan.id,
        );

      transactions.push(deleteAllPaidResources);

      const seenIds = new Set<string>();
      const uniquePaidResourceIds = dto.paidResourceIds.filter((id) => {
        const idString = id.toString();
        if (seenIds.has(idString)) {
          return false;
        }
        seenIds.add(idString);
        return true;
      });

      for (const paidResourceId of uniquePaidResourceIds) {
        const paymentPlanEnablePaidResource =
          new PaymentPlanEnablePaidResourceEntity({
            id: new PaymentPlanEnablePaidResourceId(),
            paymentPlan: updatedPaymentPlan,
            paymentPlanPaidResource: {
              id: paidResourceId,
            } as PaymentPlanPaidResourceEntity,
            createdAt: now,
            updatedAt: now,
          });

        const createPaymentPlanEnablePaidResource =
          this.paymentPlanEnablePaidResourceCommandRepositoryGateway.createPaymentPlanEnablePaidResource(
            paymentPlanEnablePaidResource,
          );

        transactions.push(createPaymentPlanEnablePaidResource);
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
            id: resource.id,
            resource: resource.resource,
            creditCost: parseFloat(resource.creditCost),
            description: resource.description,
          }),
      ),
    });
  }
}
