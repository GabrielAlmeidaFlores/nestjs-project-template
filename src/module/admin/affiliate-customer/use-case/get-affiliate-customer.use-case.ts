import { Inject, Injectable } from '@nestjs/common';

import { GetAffiliateCustomerResponseDto } from '@module/admin/affiliate-customer/dto/response/get-affiliate-customer.response.dto';
import { AffiliateCustomerNotFoundError } from '@module/admin/affiliate-customer/error/affiliate-customer-not-found.error';
import { AffiliateCustomerQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/affiliate-customer.query.repository.gateway';
import { AffiliateCustomerPaymentPlanQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-payment-plan/query/affiliate-customer-payment-plan.query.repository.gateway';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';

@Injectable()
export class GetAffiliateCustomerUseCase {
  protected readonly _type = GetAffiliateCustomerUseCase.name;

  public constructor(
    @Inject(AffiliateCustomerQueryRepositoryGateway)
    private readonly affiliateCustomerQueryRepository: AffiliateCustomerQueryRepositoryGateway,
    @Inject(AffiliateCustomerPaymentPlanQueryRepositoryGateway)
    private readonly affiliateCustomerPaymentPlanQueryRepository: AffiliateCustomerPaymentPlanQueryRepositoryGateway,
  ) {}

  public async execute(
    id: AffiliateCustomerId,
  ): Promise<GetAffiliateCustomerResponseDto> {
    const affiliate =
      await this.affiliateCustomerQueryRepository.findOneById(id);

    if (!affiliate) {
      throw new AffiliateCustomerNotFoundError();
    }

    const linkedPlans =
      await this.affiliateCustomerPaymentPlanQueryRepository.findManyByAffiliateCustomerId(
        affiliate.id,
      );

    return GetAffiliateCustomerResponseDto.build({
      ...affiliate,
      pixAddressKey: affiliate.pixAddressKey?.toString() ?? null,
      pixAddressKeyType: affiliate.pixAddressKeyType ?? null,
      paymentPlanIds: linkedPlans.map((p) => p.paymentPlanId),
    });
  }
}
