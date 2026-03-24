import { Inject, Injectable } from '@nestjs/common';

import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { AffiliateCustomerQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/affiliate-customer.query.repository.gateway';
import { AffiliateCustomerPaymentPlanQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-payment-plan/query/affiliate-customer-payment-plan.query.repository.gateway';
import { GetMyAffiliateCustomerResponseDto } from '@module/customer/affiliate-customer/dto/response/get-my-affiliate-customer.response.dto';
import { AffiliateCustomerNotFoundError } from '@module/customer/affiliate-customer/error/affiliate-customer-not-found.error';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetMyAffiliateCustomerUseCase {
  protected readonly _type = GetMyAffiliateCustomerUseCase.name;

  public constructor(
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepository: CustomerQueryRepositoryGateway,
    @Inject(AffiliateCustomerQueryRepositoryGateway)
    private readonly affiliateCustomerQueryRepository: AffiliateCustomerQueryRepositoryGateway,
    @Inject(AffiliateCustomerPaymentPlanQueryRepositoryGateway)
    private readonly affiliateCustomerPaymentPlanQueryRepository: AffiliateCustomerPaymentPlanQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
  ): Promise<GetMyAffiliateCustomerResponseDto> {
    const customer =
      await this.customerQueryRepository.findOneByAuthIdentityIdOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
      );

    const affiliate =
      await this.affiliateCustomerQueryRepository.findOneByCustomerId(
        customer.id,
      );

    if (!affiliate) {
      throw new AffiliateCustomerNotFoundError();
    }

    const linkedPlans =
      await this.affiliateCustomerPaymentPlanQueryRepository.findManyByAffiliateCustomerId(
        affiliate.id,
      );

    return GetMyAffiliateCustomerResponseDto.build({
      id: affiliate.id,
      pixAddressKey: affiliate.pixAddressKey?.toString() ?? null,
      pixAddressKeyType: affiliate.pixAddressKeyType ?? null,
      paymentCommissionPercentage: affiliate.paymentCommissionPercentage,
      paymentPlanDiscountPercentage: affiliate.paymentPlanDiscountPercentage,
      paymentPlanDiscountValidUntil: affiliate.paymentPlanDiscountValidUntil,
      paymentPlanDiscountRedemptionLimit:
        affiliate.paymentPlanDiscountRedemptionLimit,
      isActive: affiliate.isActive,
      paymentPlanIds: linkedPlans.map((p) => p.paymentPlanId),
      createdAt: affiliate.createdAt,
      updatedAt: affiliate.updatedAt,
    });
  }
}
