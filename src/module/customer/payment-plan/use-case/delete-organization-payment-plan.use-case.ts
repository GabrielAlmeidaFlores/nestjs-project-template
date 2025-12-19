import { Injectable, Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { PaymentGateway } from '@infra/payment-gateway/payment-gateway.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationPaymentPlanCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/command/organization-payment-plan.command.repository.gateway';
import { OrganizationPaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/organization-payment-plan.query.repository.gateway';

@Injectable()
export class DeleteOrganizationPaymentPlanUseCase {
  protected readonly _type = DeleteOrganizationPaymentPlanUseCase.name;

  public constructor(
    @Inject(OrganizationPaymentPlanCommandRepositoryGateway)
    private readonly organizationPaymentPlanCommandRepository: OrganizationPaymentPlanCommandRepositoryGateway,
    @Inject(OrganizationPaymentPlanQueryRepositoryGateway)
    private readonly organizationPaymentPlanQueryRepository: OrganizationPaymentPlanQueryRepositoryGateway,
    @Inject(PaymentGateway)
    private readonly paymentGateway: PaymentGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(organization: OrganizationId): Promise<void> {
    const existingSubscriptions =
      await this.organizationPaymentPlanQueryRepository.findManyByOrganizationId(
        organization,
      );

    for (const subscription of existingSubscriptions) {
      await this.paymentGateway.cancelSubscription(subscription.bankExternalId);
    }

    const deleteTransactions = existingSubscriptions.map((subscription) =>
      this.organizationPaymentPlanCommandRepository.deleteOrganizationPaymentPlan(
        subscription.id,
      ),
    );

    if (deleteTransactions.length > 0) {
      const transactions =
        await this.baseTransactionRepositoryGateway.execute(deleteTransactions);
      await transactions.commit();
    }
  }
}
