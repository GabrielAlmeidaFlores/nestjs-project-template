import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { PaymentGateway } from '@infra/payment-gateway/payment-gateway.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationPaymentPlanCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/command/organization-payment-plan.command.repository.gateway';
import { OrganizationPaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/organization-payment-plan.query.repository.gateway';
import { CancelPaymentPlanResponseDto } from '@module/customer/payment-plan/dto/response/cancel-payment-plan.response.dto';
import { OrganizationPaymentPlanNotFoundError } from '@module/customer/payment-plan/error/organization-payment-plan-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class CancelPaymentPlanUseCase {
  protected readonly _type = CancelPaymentPlanUseCase.name;

  public constructor(
    @Inject(OrganizationPaymentPlanQueryRepositoryGateway)
    private readonly organizationPaymentPlanQueryRepository: OrganizationPaymentPlanQueryRepositoryGateway,
    @Inject(OrganizationPaymentPlanCommandRepositoryGateway)
    private readonly organizationPaymentPlanCommandRepository: OrganizationPaymentPlanCommandRepositoryGateway,
    @Inject(PaymentGateway)
    private readonly paymentGateway: PaymentGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<CancelPaymentPlanResponseDto> {
    const organizationId = organizationSessionData.organizationId.toString();

    const existingSubscriptions =
      await this.organizationPaymentPlanQueryRepository.findManyByOrganizationId(
        new OrganizationId(organizationId),
      );

    if (existingSubscriptions.length === 0) {
      throw new OrganizationPaymentPlanNotFoundError();
    }

    for (const subscription of existingSubscriptions) {
      try {
        await this.paymentGateway.cancelSubscription(
          subscription.bankExternalId,
        );
      } catch (error) {
        console.error(
          `Erro ao cancelar assinatura ${subscription.bankExternalId}:`,
          error,
        );
      }
    }

    const deleteTransactions = existingSubscriptions.map((subscription) =>
      this.organizationPaymentPlanCommandRepository.deleteOrganizationPaymentPlan(
        subscription.id,
      ),
    );

    const deleteTransaction =
      await this.baseTransactionRepositoryGateway.execute(deleteTransactions);
    await deleteTransaction.commit();

    return CancelPaymentPlanResponseDto.build({
      organizationPaymentPlanId: existingSubscriptions.map(
        (subscription) => subscription.id,
      ),
    });
  }
}
