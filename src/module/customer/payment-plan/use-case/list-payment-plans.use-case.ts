import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import {
  AffiliateDiscountContextInterface,
  ResolveAffiliatePlanDiscountGateway,
} from '@module/customer/affiliate-customer/lib/resolve-affiliate-plan-discount/resolve-affiliate-plan-discount.gateway';
import { PaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/query/payment-plan.query.repository.gateway';
import { ListPaymentPlansRequestDto } from '@module/customer/payment-plan/dto/request/list-payment-plans.request.dto';
import { ListPaymentPlansResponseDto } from '@module/customer/payment-plan/dto/response/list-payment-plans.response.dto';
import {
  PaymentPlanItemResponseDto,
  PaymentPlanPaidResourceDto,
} from '@module/customer/payment-plan/dto/response/payment-plan-item.response.dto';

@Injectable()
export class ListPaymentPlansUseCase {
  protected readonly _type = ListPaymentPlansUseCase.name;

  private readonly PERCENTAGE_DIVISOR: number;

  public constructor(
    @Inject(PaymentPlanQueryRepositoryGateway)
    private readonly paymentPlanQueryRepository: PaymentPlanQueryRepositoryGateway,
    @Inject(ResolveAffiliatePlanDiscountGateway)
    private readonly resolveAffiliatePlanDiscountGateway: ResolveAffiliatePlanDiscountGateway,
  ) {
    this.PERCENTAGE_DIVISOR = 100;
  }

  public async execute(
    dto: ListPaymentPlansRequestDto,
    affiliateCustomerIdStr?: string,
  ): Promise<ListPaymentPlansResponseDto> {
    const [result, affiliateContext] = await Promise.all([
      this.paymentPlanQueryRepository.listActivePaymentPlan(
        new ListDataInputModel({ ...dto }),
        dto.cycles,
      ),
      this.resolveAffiliatePlanDiscountGateway.resolveDiscountContext(
        affiliateCustomerIdStr,
      ),
    ]);

    const resources = result.resource.map((plan) => {
      const affiliatePrice = this.calculateAffiliatePrice(
        plan.id.toString(),
        plan.price.toNumber(),
        affiliateContext,
      );

      return PaymentPlanItemResponseDto.build({
        id: plan.id.toString(),
        name: plan.name,
        description: plan.description,
        price: plan.price.toNumber(),
        maxMemberCount: plan.maxMemberCount,
        monthlyCreditAmount: plan.monthlyCreditAmount,
        active: plan.active,
        cycle: plan.cycle,
        highlight: plan.highlight,
        ...(affiliatePrice !== null && { affiliatePrice }),
        paidResources: plan.enabledPaidResources.map((resource) =>
          PaymentPlanPaidResourceDto.build({
            id: resource.paymentPlanPaidResource.id.toString(),
            resource: resource.paymentPlanPaidResource.resource,
            creditCost: resource.paymentPlanPaidResource.creditCost,
            description: resource.paymentPlanPaidResource.description,
          }),
        ),
      });
    });

    return ListPaymentPlansResponseDto.build({
      ...result,
      resource: resources,
    });
  }

  private calculateAffiliatePrice(
    planId: string,
    originalPrice: number,
    context: AffiliateDiscountContextInterface | null,
  ): number | null {
    if (context?.linkedPlanIds.has(planId) !== true) {
      return null;
    }

    return parseFloat(
      (
        originalPrice *
        (1 - context.percentage / this.PERCENTAGE_DIVISOR)
      ).toFixed(2),
    );
  }
}
