import { Inject, Injectable } from '@nestjs/common';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { OrganizationCreditPurchaseQueryRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-purchase/query/organization-credit-purchase.query.repository.gateway';
import { OrganizationCreditUsageCommandRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-usage/command/organization-credit-usage.command.repository.gateway';
import { OrganizationCreditUsageQueryRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-usage/query/organization-credit-usage.query.repository.gateway';
import { OrganizationCreditUsageEntity } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-usage/organization-credit-usage.entity';
import { InsufficientCreditsError } from '@module/customer/organization-credit/error/insufficient-credits.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/payment-plan-paid-resource.query.repository.gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';

@Injectable()
export class ConsumeOrganizationCreditUseCase
  implements ConsumeOrganizationCreditUseCaseGateway
{
  protected readonly _type = ConsumeOrganizationCreditUseCase.name;

  public constructor(
    @Inject(OrganizationCreditPurchaseQueryRepositoryGateway)
    private readonly organizationCreditPurchaseQueryRepository: OrganizationCreditPurchaseQueryRepositoryGateway,
    @Inject(OrganizationCreditUsageQueryRepositoryGateway)
    private readonly organizationCreditUsageQueryRepository: OrganizationCreditUsageQueryRepositoryGateway,
    @Inject(OrganizationCreditUsageCommandRepositoryGateway)
    private readonly organizationCreditUsageCommandRepository: OrganizationCreditUsageCommandRepositoryGateway,
    @Inject(PaymentPlanPaidResourceQueryRepositoryGateway)
    private readonly paymentPlanPaidResourceQueryRepository: PaymentPlanPaidResourceQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationId: OrganizationId,
    resourceType: PaymentPlanPaidResourceTypeEnum,
    createdBy: OrganizationMemberId,
  ): Promise<TransactionType> {
    const paidResource =
      await this.paymentPlanPaidResourceQueryRepository.findOnePaymentPlanPaidResourceByResourceType(
        resourceType,
      );

    const creditCost = Number.parseFloat(paidResource.creditCost);

    const purchases =
      await this.organizationCreditPurchaseQueryRepository.findManyOrganizationCreditPurchaseByOrganizationId(
        organizationId,
      );

    const usages =
      await this.organizationCreditUsageQueryRepository.findManyOrganizationCreditUsageByOrganizationId(
        organizationId,
      );

    const totalPurchased = purchases.reduce(
      (sum, purchase) => sum + purchase.creditAmount,
      0,
    );

    const totalUsed = usages.reduce(
      (sum, usage) => sum + usage.creditAmount,
      0,
    );

    const availableCredits = totalPurchased - totalUsed;

    if (availableCredits < creditCost) {
      throw new InsufficientCreditsError();
    }

    const creditUsage = new OrganizationCreditUsageEntity({
      creditAmount: creditCost,
      paymentPlanPaidResource: paidResource.id,
      createdBy,
    });

    return this.organizationCreditUsageCommandRepository.createOrganizationCreditUsage(
      creditUsage,
    );
  }
}
