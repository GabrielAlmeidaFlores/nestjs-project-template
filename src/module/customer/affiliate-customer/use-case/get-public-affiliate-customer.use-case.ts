import { Inject, Injectable } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { AffiliateCustomerQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/affiliate-customer.query.repository.gateway';
import { AffiliateCustomerPaymentPlanQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-payment-plan/query/affiliate-customer-payment-plan.query.repository.gateway';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import { GetPublicAffiliateCustomerResponseDto } from '@module/customer/affiliate-customer/dto/response/get-public-affiliate-customer.response.dto';
import { AffiliateCustomerNotFoundError } from '@module/customer/affiliate-customer/error/affiliate-customer-not-found.error';
import { OrganizationPaymentPlanAffiliateCommissionQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-affiliate-commission/query/organization-payment-plan-affiliate-commission.query.repository.gateway';
import { ApiCookieEnum } from '@shared/api/enum/api-cookie.enum';
import { FrameworkApplicationVariable } from '@shared/system/constant/application-variable/source/framework.application-variable';

@Injectable()
export class GetPublicAffiliateCustomerUseCase {
  protected readonly _type = GetPublicAffiliateCustomerUseCase.name;

  public constructor(
    @Inject(AffiliateCustomerQueryRepositoryGateway)
    private readonly affiliateCustomerQueryRepository: AffiliateCustomerQueryRepositoryGateway,
    @Inject(AffiliateCustomerPaymentPlanQueryRepositoryGateway)
    private readonly affiliateCustomerPaymentPlanQueryRepository: AffiliateCustomerPaymentPlanQueryRepositoryGateway,
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepository: CustomerQueryRepositoryGateway,
    @Inject(OrganizationPaymentPlanAffiliateCommissionQueryRepositoryGateway)
    private readonly affiliateCommissionQueryRepository: OrganizationPaymentPlanAffiliateCommissionQueryRepositoryGateway,
  ) {}

  public async execute(
    reply: FastifyReply,
    affiliateCustomerId: AffiliateCustomerId,
  ): Promise<GetPublicAffiliateCustomerResponseDto> {
    const affiliate =
      await this.affiliateCustomerQueryRepository.findOneById(
        affiliateCustomerId,
      );

    if (affiliate === null) {
      throw new AffiliateCustomerNotFoundError();
    }

    const redemptionCount =
      await this.affiliateCommissionQueryRepository.countByAffiliateCustomerId(
        affiliate.id,
      );

    const isDiscountValid =
      affiliate.isActive &&
      redemptionCount < affiliate.paymentPlanDiscountRedemptionLimit &&
      new Date(affiliate.paymentPlanDiscountValidUntil) >= new Date();

    const [linkedPlans, customer] = await Promise.all([
      isDiscountValid
        ? this.affiliateCustomerPaymentPlanQueryRepository.findManyByAffiliateCustomerId(
            affiliate.id,
          )
        : Promise.resolve([]),
      this.customerQueryRepository.findOneByCustomerId(affiliate.customerId),
    ]);

    if (isDiscountValid) {
      reply.setCookie(ApiCookieEnum.AFFILIATE, affiliate.id.toString(), {
        httpOnly:
          FrameworkApplicationVariable.FRAMEWORK_COOKIES_CONFIG_HTTP_ONLY,
        secure: FrameworkApplicationVariable.FRAMEWORK_COOKIES_CONFIG_SECURE,
        sameSite:
          FrameworkApplicationVariable.FRAMEWORK_COOKIES_CONFIG_SAME_SITE,
        maxAge: FrameworkApplicationVariable.FRAMEWORK_COOKIES_CONFIG_MAX_AGE,
        path: '/',
      });
    }

    const response = GetPublicAffiliateCustomerResponseDto.build({
      id: affiliate.id,
      paymentPlanDiscountPercentage: isDiscountValid
        ? affiliate.paymentPlanDiscountPercentage
        : 0,
      paymentPlanDiscountValidUntil: affiliate.paymentPlanDiscountValidUntil,
      paymentPlanDiscountRedemptionLimit: isDiscountValid
        ? affiliate.paymentPlanDiscountRedemptionLimit
        : 0,
      paymentPlanIds: linkedPlans.map((p) => p.paymentPlanId),
    });

    if (customer !== null) {
      response.affiliateName = customer.name;
    }

    return response;
  }
}
