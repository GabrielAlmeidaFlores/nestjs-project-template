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

    const totalPurchased = purchases.reduce(
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
      totalUsed,
      availableCredits,
    });
  }
}
