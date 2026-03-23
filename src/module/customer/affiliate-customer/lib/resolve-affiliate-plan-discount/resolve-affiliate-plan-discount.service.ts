import { Inject, Injectable } from '@nestjs/common';

import { AffiliateCustomerQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/affiliate-customer.query.repository.gateway';
import { GetAffiliateCustomerQueryResult } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/result/get-affiliate-customer.query.result';
import { AffiliateCustomerPaymentPlanQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-payment-plan/query/affiliate-customer-payment-plan.query.repository.gateway';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import {
  AffiliateDiscountContextInterface,
  AffiliateDiscountResultInterface,
  ResolveAffiliatePlanDiscountGateway,
} from '@module/customer/affiliate-customer/lib/resolve-affiliate-plan-discount/resolve-affiliate-plan-discount.gateway';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';

@Injectable()
export class ResolveAffiliatePlanDiscountService implements ResolveAffiliatePlanDiscountGateway {
  protected readonly _type = ResolveAffiliatePlanDiscountService.name;

  public constructor(
    @Inject(AffiliateCustomerQueryRepositoryGateway)
    private readonly affiliateCustomerQueryRepository: AffiliateCustomerQueryRepositoryGateway,
    @Inject(AffiliateCustomerPaymentPlanQueryRepositoryGateway)
    private readonly affiliateCustomerPaymentPlanQueryRepository: AffiliateCustomerPaymentPlanQueryRepositoryGateway,
  ) {}

  public async resolveDiscount(
    affiliateCustomerIdStr: string | null | undefined,
    paymentPlanId: PaymentPlanId,
  ): Promise<AffiliateDiscountResultInterface | null> {
    const affiliate = await this.fetchValidAffiliate(affiliateCustomerIdStr);

    if (affiliate === null) {
      return null;
    }

    const linkedPlans =
      await this.affiliateCustomerPaymentPlanQueryRepository.findManyByAffiliateCustomerId(
        affiliate.id,
      );

    const isLinked = linkedPlans.some(
      (p) => p.paymentPlanId.toString() === paymentPlanId.toString(),
    );

    if (!isLinked) {
      return null;
    }

    return {
      percentage: affiliate.paymentPlanDiscountPercentage,
      commissionPercentage: affiliate.paymentCommissionPercentage,
      affiliateCustomerId: affiliate.id,
    };
  }

  public async resolveDiscountContext(
    affiliateCustomerIdStr: string | null | undefined,
  ): Promise<AffiliateDiscountContextInterface | null> {
    const affiliate = await this.fetchValidAffiliate(affiliateCustomerIdStr);

    if (affiliate === null) {
      return null;
    }

    const linkedPlans =
      await this.affiliateCustomerPaymentPlanQueryRepository.findManyByAffiliateCustomerId(
        affiliate.id,
      );

    return {
      percentage: affiliate.paymentPlanDiscountPercentage,
      linkedPlanIds: new Set(
        linkedPlans.map((p) => p.paymentPlanId.toString()),
      ),
    };
  }

  private async fetchValidAffiliate(
    affiliateCustomerIdStr: string | null | undefined,
  ): Promise<GetAffiliateCustomerQueryResult | null> {
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

    if (affiliate === null) {
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

    return affiliate;
  }
}
