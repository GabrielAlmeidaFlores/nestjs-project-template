import { Inject, Injectable } from '@nestjs/common';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { OrganizationCreditPurchaseQueryRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-purchase/query/organization-credit-purchase.query.repository.gateway';
import { OrganizationCreditUsageCommandRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-usage/command/organization-credit-usage.command.repository.gateway';
import { OrganizationCreditUsageQueryRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-usage/query/organization-credit-usage.query.repository.gateway';
import { OrganizationCreditUsageEntity } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-usage/organization-credit-usage.entity';
import { InsufficientCreditsError } from '@module/customer/organization-credit/error/insufficient-credits.error';
import { PaidResourceUnavailableError } from '@module/customer/organization-credit/error/paid-resource-unavailable.error';
import { ResourceNotEnabledError } from '@module/customer/organization-credit/error/resource-not-enabled.error';
import { ConsumeOrganizationCreditUseCaseGateway } from '@module/customer/organization-credit/use-case-gateway/consume-organization-credit.use-case-gateway';
import { PaymentPlanPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/payment-plan-paid-resource.query.repository.gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { PaymentPlanInactiveError } from '@module/customer/payment-plan/error/payment-plan-inactive.error';
import { ValidateOrganizationPaymentPlanStatusUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/validate-organization-payment-plan-status.use-case-gateway';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

@Injectable()
export class ConsumeOrganizationCreditUseCase implements ConsumeOrganizationCreditUseCaseGateway {
  protected readonly _type = ConsumeOrganizationCreditUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(OrganizationCreditPurchaseQueryRepositoryGateway)
    private readonly organizationCreditPurchaseQueryRepository: OrganizationCreditPurchaseQueryRepositoryGateway,
    @Inject(OrganizationCreditUsageQueryRepositoryGateway)
    private readonly organizationCreditUsageQueryRepository: OrganizationCreditUsageQueryRepositoryGateway,
    @Inject(OrganizationCreditUsageCommandRepositoryGateway)
    private readonly organizationCreditUsageCommandRepository: OrganizationCreditUsageCommandRepositoryGateway,
    @Inject(PaymentPlanPaidResourceQueryRepositoryGateway)
    private readonly paymentPlanPaidResourceQueryRepository: PaymentPlanPaidResourceQueryRepositoryGateway,
    @Inject(ValidateOrganizationPaymentPlanStatusUseCaseGateway)
    private readonly validateOrganizationPaymentPlanStatusUseCase: ValidateOrganizationPaymentPlanStatusUseCaseGateway,
  ) {}

  public async execute(
    organizationId: OrganizationId,
    resourceType: PaymentPlanPaidResourceTypeEnum,
    createdBy: AuthIdentityId | OrganizationMemberId | null,
    metadata?: {
      explicitCreditCost?: number;
    },
  ): Promise<TransactionType> {
    const paymentPlanStatus =
      await this.validateOrganizationPaymentPlanStatusUseCase.execute(
        organizationId,
      );

    if (!paymentPlanStatus.isActive) {
      throw new PaymentPlanInactiveError();
    }

    const isResourceEnabled = paymentPlanStatus.enabledPaidResources.some(
      (resource) => resource.resource === resourceType,
    );

    if (!isResourceEnabled) {
      throw new ResourceNotEnabledError();
    }

    let creditCost: number;

    if (metadata?.explicitCreditCost !== undefined) {
      creditCost = metadata.explicitCreditCost;
    } else {
      const paidResource =
        await this.paymentPlanPaidResourceQueryRepository.findOnePaymentPlanPaidResourceByResourceType(
          resourceType,
        );

      if (!paidResource) {
        throw new PaidResourceUnavailableError();
      }

      creditCost = paidResource.creditCost;
    }

    const purchases =
      await this.organizationCreditPurchaseQueryRepository.findManyOrganizationCreditPurchaseByOrganizationId(
        organizationId,
      );

    const usages =
      await this.organizationCreditUsageQueryRepository.findManyOrganizationCreditUsageByOrganizationId(
        organizationId,
      );

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const validPurchases = purchases.filter((purchase) => {
      if (purchase.validFrom === null) {
        return true;
      }
      const validFromDate = new Date(purchase.validFrom);
      validFromDate.setHours(0, 0, 0, 0);
      return validFromDate <= now;
    });

    const totalPurchased = validPurchases.reduce(
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

    const paidResource =
      await this.paymentPlanPaidResourceQueryRepository.findOnePaymentPlanPaidResourceByResourceType(
        resourceType,
      );

    if (!paidResource) {
      throw new PaidResourceUnavailableError();
    }

    if (createdBy instanceof AuthIdentityId) {
      const organizationMember =
        await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
          createdBy,
          organizationId,
        );

      if (organizationMember === null) {
        throw new OrganizationMemberNotFoundError();
      }

      createdBy = organizationMember.id;
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
