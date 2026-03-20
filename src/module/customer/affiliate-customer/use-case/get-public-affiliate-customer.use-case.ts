import { Inject, Injectable } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { AffiliateCustomerNotFoundError } from '@module/customer/affiliate-customer/error/affiliate-customer-not-found.error';
import { AffiliateCustomerQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/affiliate-customer.query.repository.gateway';
import { AffiliateCustomerPaymentPlanQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-payment-plan/query/affiliate-customer-payment-plan.query.repository.gateway';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import { GetPublicAffiliateCustomerResponseDto } from '@module/customer/affiliate-customer/dto/response/get-public-affiliate-customer.response.dto';
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
  ) {}

  public async execute(
    reply: FastifyReply,
    affiliateCustomerId: AffiliateCustomerId,
  ): Promise<GetPublicAffiliateCustomerResponseDto> {
    const affiliate =
      await this.affiliateCustomerQueryRepository.findOneById(affiliateCustomerId);

    if (!affiliate) {
      throw new AffiliateCustomerNotFoundError();
    }

    const linkedPlans =
      await this.affiliateCustomerPaymentPlanQueryRepository.findManyByAffiliateCustomerId(
        affiliate.id,
      );

    reply.setCookie(ApiCookieEnum.AFFILIATE, affiliate.id.toString(), {
      httpOnly: FrameworkApplicationVariable.FRAMEWORK_COOKIES_CONFIG_HTTP_ONLY,
      secure: FrameworkApplicationVariable.FRAMEWORK_COOKIES_CONFIG_SECURE,
      sameSite: FrameworkApplicationVariable.FRAMEWORK_COOKIES_CONFIG_SAME_SITE,
      maxAge: FrameworkApplicationVariable.FRAMEWORK_COOKIES_CONFIG_MAX_AGE,
      path: '/',
    });

    return GetPublicAffiliateCustomerResponseDto.build({
      id: affiliate.id,
      paymentPlanDiscountPercentage: affiliate.paymentPlanDiscountPercentage,
      paymentPlanDiscountValidUntil: affiliate.paymentPlanDiscountValidUntil,
      paymentPlanDiscountRedemptionLimit: affiliate.paymentPlanDiscountRedemptionLimit,
      paymentPlanIds: linkedPlans.map((p) => p.paymentPlanId),
    });
  }
}
