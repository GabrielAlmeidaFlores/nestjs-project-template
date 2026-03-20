import { Inject, Injectable } from '@nestjs/common';

import { AffiliateCustomerQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/affiliate-customer.query.repository.gateway';
import { AffiliateCustomerPaymentPlanQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-payment-plan/query/affiliate-customer-payment-plan.query.repository.gateway';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';

@Injectable()
export class ResolveAffiliatePlanDiscountService {
  protected readonly _type = ResolveAffiliatePlanDiscountService.name;

  public constructor(
    @Inject(AffiliateCustomerQueryRepositoryGateway)
    private readonly affiliateCustomerQueryRepository: AffiliateCustomerQueryRepositoryGateway,
    @Inject(AffiliateCustomerPaymentPlanQueryRepositoryGateway)
    private readonly affiliateCustomerPaymentPlanQueryRepository: AffiliateCustomerPaymentPlanQueryRepositoryGateway,
  ) {}

  /**
   * Returns the discount percentage (0-100) if the affiliate has a valid discount
   * for the given plan, or null if no discount should be applied.
   */
  public async resolveDiscount(
    affiliateCustomerIdStr: string | null | undefined,
    paymentPlanId: PaymentPlanId,
  ): Promise<number | null> {
    if (
      affiliateCustomerIdStr === null ||
      affiliateCustomerIdStr === undefined
    ) {
      return null;
    }

    let affiliateCustomerId: AffiliateCustomerId;
    try {
      affiliateCustomerId = new AffiliateCustomerId(affiliateCustomerIdStr);
    } catch {
      return null;
    }

    const affiliate =
      await this.affiliateCustomerQueryRepository.findOneById(
        affiliateCustomerId,
      );

    if (!affiliate) {
      return null;
    }
    if (!affiliate.isActive) {
      return null;
    }
    if (affiliate.paymentPlanDiscountRedemptionLimit <= 0) {
      return null;
    }
    if (new Date(affiliate.paymentPlanDiscountValidUntil) < new Date()) {
      return null;
    }

    const linkedPlans =
      await this.affiliateCustomerPaymentPlanQueryRepository.findManyByAffiliateCustomerId(
        affiliateCustomerId,
      );

    const isLinked = linkedPlans.some(
      (p) => p.paymentPlanId.toString() === paymentPlanId.toString(),
    );

    if (!isLinked) {
      return null;
    }

    return affiliate.paymentPlanDiscountPercentage;
  }
}
