import { Inject, Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { AffiliateCustomerQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/affiliate-customer.query.repository.gateway';
import { GetAffiliateCustomerQueryResult } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/result/get-affiliate-customer.query.result';
import { AffiliateCustomerPaymentPlanQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-payment-plan/query/affiliate-customer-payment-plan.query.repository.gateway';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import { AffiliateBillingPriceResultInterface } from '@module/customer/affiliate-customer/lib/resolve-affiliate-plan-discount/interface/affiliate-billing-price-result.interface';
import { AffiliateDiscountContextInterface } from '@module/customer/affiliate-customer/lib/resolve-affiliate-plan-discount/interface/affiliate-discount-context.interface';
import { AffiliateDiscountResultInterface } from '@module/customer/affiliate-customer/lib/resolve-affiliate-plan-discount/interface/affiliate-discount-result.interface';
import { AffiliatePriceResultInterface } from '@module/customer/affiliate-customer/lib/resolve-affiliate-plan-discount/interface/affiliate-price-result.interface';
import { ResolveAffiliatePlanDiscountGateway } from '@module/customer/affiliate-customer/lib/resolve-affiliate-plan-discount/resolve-affiliate-plan-discount.gateway';
import { OrganizationPaymentPlanAffiliateCommissionQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-affiliate-commission/query/organization-payment-plan-affiliate-commission.query.repository.gateway';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';

@Injectable()
export class ResolveAffiliatePlanDiscountService implements ResolveAffiliatePlanDiscountGateway {
  protected readonly _type = ResolveAffiliatePlanDiscountService.name;

  private readonly PERCENTAGE_DIVISOR: number;
  private readonly MINIMUM_BILLING_VALUE: number;

  public constructor(
    @Inject(AffiliateCustomerQueryRepositoryGateway)
    private readonly affiliateCustomerQueryRepository: AffiliateCustomerQueryRepositoryGateway,
    @Inject(AffiliateCustomerPaymentPlanQueryRepositoryGateway)
    private readonly affiliateCustomerPaymentPlanQueryRepository: AffiliateCustomerPaymentPlanQueryRepositoryGateway,
    @Inject(OrganizationPaymentPlanAffiliateCommissionQueryRepositoryGateway)
    private readonly affiliateCommissionQueryRepository: OrganizationPaymentPlanAffiliateCommissionQueryRepositoryGateway,
  ) {
    this.PERCENTAGE_DIVISOR = 100;
    this.MINIMUM_BILLING_VALUE = 5;
  }

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

  public applyDiscount(
    planId: string,
    originalPrice: number,
    context: AffiliateDiscountContextInterface | null,
  ): AffiliatePriceResultInterface | null {
    if (context?.linkedPlanIds.has(planId) !== true) {
      return null;
    }

    const affiliatePrice = parseFloat(
      (
        originalPrice *
        (1 - context.percentage / this.PERCENTAGE_DIVISOR)
      ).toFixed(2),
    );

    return {
      affiliatePrice,
      affiliateDiscount: parseFloat(
        (originalPrice - affiliatePrice).toFixed(2),
      ),
    };
  }

  public async resolveBillingPrice(
    affiliateCustomerIdStr: string | null | undefined,
    paymentPlanId: PaymentPlanId,
    originalPrice: DecimalValue,
  ): Promise<AffiliateBillingPriceResultInterface> {
    const discountResult = await this.resolveDiscount(
      affiliateCustomerIdStr,
      paymentPlanId,
    );

    if (discountResult === null) {
      return { billingPrice: originalPrice, discountResult: null };
    }

    const applied = this.applyDiscount(
      paymentPlanId.toString(),
      originalPrice.toNumber(),
      {
        percentage: discountResult.percentage,
        linkedPlanIds: new Set([paymentPlanId.toString()]),
      },
    );

    const billingPrice = new DecimalValue(
      Math.max(
        applied?.affiliatePrice ?? originalPrice.toNumber(),
        this.MINIMUM_BILLING_VALUE,
      ).toFixed(2),
    );

    return { billingPrice, discountResult };
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
    if (new Date(affiliate.paymentPlanDiscountValidUntil) < new Date()) {
      return null;
    }

    const redemptionCount =
      await this.affiliateCommissionQueryRepository.countByAffiliateCustomerId(
        affiliateCustomerId,
      );
    if (redemptionCount >= affiliate.paymentPlanDiscountRedemptionLimit) {
      return null;
    }

    return affiliate;
  }
}
