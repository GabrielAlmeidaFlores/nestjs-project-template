import { Inject, Injectable } from '@nestjs/common';

import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationCreditPurchaseQueryRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-purchase/query/organization-credit-purchase.query.repository.gateway';
import { OrganizationCreditUsageQueryRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-usage/query/organization-credit-usage.query.repository.gateway';
import { GetOrganizationAvailableCreditsResponseDto } from '@module/customer/organization-credit/dto/response/get-organization-available-credits.response.dto';

@Injectable()
export class GetOrganizationAvailableCreditsUseCase {
  protected readonly _type = GetOrganizationAvailableCreditsUseCase.name;

  public constructor(
    @Inject(OrganizationCreditPurchaseQueryRepositoryGateway)
    private readonly organizationCreditPurchaseQueryRepository: OrganizationCreditPurchaseQueryRepositoryGateway,
    @Inject(OrganizationCreditUsageQueryRepositoryGateway)
    private readonly organizationCreditUsageQueryRepository: OrganizationCreditUsageQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationId: OrganizationId,
  ): Promise<GetOrganizationAvailableCreditsResponseDto> {
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

    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyPurchases = validPurchases.filter((purchase) => {
      const purchaseDate = new Date(purchase.createdAt);
      return (
        purchaseDate.getMonth() === currentMonth &&
        purchaseDate.getFullYear() === currentYear
      );
    });

    const totalPurchasedThisMonth = monthlyPurchases.reduce(
      (sum, purchase) => sum + purchase.creditAmount,
      0,
    );

    const totalUsed = usages.reduce(
      (sum, usage) => sum + usage.creditAmount,
      0,
    );

    const availableCredits = totalPurchased - totalUsed;

    return GetOrganizationAvailableCreditsResponseDto.build({
      organizationId: organizationId.toString(),
      totalPurchased,
      totalPurchasedThisMonth,
      totalUsed,
      availableCredits,
    });
  }
}
