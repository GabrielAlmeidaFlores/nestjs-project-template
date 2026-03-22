import { Inject, Injectable } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import moment from 'moment';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { EmailGateway } from '@infra/email/email.gateway';
import { SendHTMLEmailInputModel } from '@infra/email/model/input/send-html-email.input.model';
import { SubscriptionCycleEnum } from '@infra/payment-gateway/enum/subscription-cycle.enum';
import { CreateSubscriptionInputModel } from '@infra/payment-gateway/model/input/create-subscription.input.model';
import { CreditCardHolderInfoInputModel } from '@infra/payment-gateway/model/input/credit-card-holder.input.model';
import { CreditCardInfoInputModel } from '@infra/payment-gateway/model/input/credit-card-info.input.model';
import { PaymentGateway } from '@infra/payment-gateway/payment-gateway.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { AffiliateCustomerCommandRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/command/affiliate-customer.command.repository.gateway';
import { AffiliateCustomerQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/affiliate-customer.query.repository.gateway';
import { AffiliateCustomerEntity } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/affiliate-customer.entity';
import { ResolveAffiliatePlanDiscountGateway } from '@module/customer/affiliate-customer/lib/resolve-affiliate-plan-discount/resolve-affiliate-plan-discount.gateway';
import { OrganizationPaymentPlanCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/command/organization-payment-plan.command.repository.gateway';
import { OrganizationPaymentPlanAffiliateCommissionCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-affiliate-commission/command/organization-payment-plan-affiliate-commission.command.repository.gateway';
import { OrganizationPaymentPlanEnabledPaidResourceCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-enabled-paid-resource/command/organization-payment-plan-enabled-paid-resource.repository.gateway';
import { PaymentPlanNotFoundError } from '@module/customer/payment-plan/domain/repository/payment-plan/query/error/payment-plan-not-found.error';
import { PaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/query/payment-plan.query.repository.gateway';
import { PaymentPlanEnabledPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-enabled-paid-resource/query/payment-plan-enabled-paid-resource.query.repository.gateway';
import { OrganizationPaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/organization-payment-plan.entity';
import { OrganizationPaymentPlanAffiliateCommissionEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-affiliate-commission/organization-payment-plan-affiliate-commission.entity';
import { OrganizationPaymentPlanEnabledPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-enabled-paid-resource/organization-payment-plan-enabled-paid-resource.entity';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';
import { SubscribeToMonthlyRecurringPaymentPlanRequestDto } from '@module/customer/payment-plan/dto/request/subscribe-to-monthly-recurring-payment-plan.request.dto';
import { SubscribeToMonthlyRecurringPaymentPlanResponseDto } from '@module/customer/payment-plan/dto/response/subscribe-to-monthly-recurring-payment-plan.response.dto';
import { InvalidPaymentPlanCycleError } from '@module/customer/payment-plan/error/invalid-payment-plan-cycle.error';
import { DeleteOrganizationPaymentPlanUseCase } from '@module/customer/payment-plan/use-case/delete-organization-payment-plan.use-case';
import { ApiCookieEnum } from '@shared/api/enum/api-cookie.enum';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { EmailApplicationVariable } from '@shared/system/constant/application-variable/source/email.application-variable';

@Injectable()
export class SubscribeToMonthlyRecurringPaymentPlanUseCase {
  protected readonly _type = SubscribeToMonthlyRecurringPaymentPlanUseCase.name;

  public constructor(
    @Inject(PaymentPlanQueryRepositoryGateway)
    private readonly paymentPlanQueryRepository: PaymentPlanQueryRepositoryGateway,
    @Inject(PaymentPlanEnabledPaidResourceQueryRepositoryGateway)
    private readonly paymentPlanEnabledPaidResourceQueryRepository: PaymentPlanEnabledPaidResourceQueryRepositoryGateway,
    @Inject(OrganizationPaymentPlanCommandRepositoryGateway)
    private readonly organizationPaymentPlanCommandRepository: OrganizationPaymentPlanCommandRepositoryGateway,
    @Inject(OrganizationPaymentPlanEnabledPaidResourceCommandRepositoryGateway)
    private readonly organizationPaymentPlanEnabledPaidResourceCommandRepository: OrganizationPaymentPlanEnabledPaidResourceCommandRepositoryGateway,
    @Inject(PaymentGateway)
    private readonly paymentGateway: PaymentGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepository: CustomerQueryRepositoryGateway,
    private readonly deleteOrganizationPaymentPlanUseCase: DeleteOrganizationPaymentPlanUseCase,
    @Inject(EmailGateway)
    private readonly emailGateway: EmailGateway,
    @Inject(AffiliateCustomerQueryRepositoryGateway)
    private readonly affiliateCustomerQueryRepository: AffiliateCustomerQueryRepositoryGateway,
    @Inject(AffiliateCustomerCommandRepositoryGateway)
    private readonly affiliateCustomerCommandRepository: AffiliateCustomerCommandRepositoryGateway,
    @Inject(ResolveAffiliatePlanDiscountGateway)
    private readonly resolveAffiliatePlanDiscountService: ResolveAffiliatePlanDiscountGateway,
    @Inject(OrganizationPaymentPlanAffiliateCommissionCommandRepositoryGateway)
    private readonly organizationPaymentPlanAffiliateCommissionCommandRepository: OrganizationPaymentPlanAffiliateCommissionCommandRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    sessionData: SessionDataModel,
    dto: SubscribeToMonthlyRecurringPaymentPlanRequestDto,
    reply: FastifyReply,
  ): Promise<SubscribeToMonthlyRecurringPaymentPlanResponseDto> {
    const paymentPlan =
      await this.paymentPlanQueryRepository.findOnePaymentPlanByIdOrFail(
        new PaymentPlanId(dto.paymentPlanId),
        PaymentPlanNotFoundError,
      );

    if (paymentPlan.cycle !== PaymentPlanCycleEnum.MONTHLY_RECURRING) {
      throw new InvalidPaymentPlanCycleError();
    }

    await this.deleteOrganizationPaymentPlanUseCase.execute(
      organizationSessionData.organizationId,
    );

    const customer =
      await this.customerQueryRepository.findOneByAuthIdentityIdOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
      );

    const nextDueDate = moment().startOf('day').toDate();

    const discountResult =
      await this.resolveAffiliatePlanDiscountService.resolveDiscount(
        reply.request.cookies[ApiCookieEnum.AFFILIATE],
        paymentPlan.id,
      );

    const HUNDRED_PERCENT = 100;
    const MINIMUM_BILLING_VALUE = 5;
    const subscriptionValue =
      discountResult !== null
        ? new DecimalValue(
            Math.max(
              paymentPlan.price.toNumber() *
                (1 - discountResult.percentage / HUNDRED_PERCENT),
              MINIMUM_BILLING_VALUE,
            ).toFixed(2),
          )
        : paymentPlan.price;

    const creditCardInfo = CreditCardInfoInputModel.build({
      holderName: dto.creditCardInfo.holderName,
      number: dto.creditCardInfo.number,
      expiryMonth: dto.creditCardInfo.expiryMonth,
      expiryYear: dto.creditCardInfo.expiryYear,
      ccv: dto.creditCardInfo.ccv,
    });

    const creditCardHolderInfo = CreditCardHolderInfoInputModel.build({
      name: dto.creditCardHolderInfo.name,
      email: dto.creditCardHolderInfo.email,
      federalDocument: dto.creditCardHolderInfo.federalDocument,
      postalCode: dto.creditCardHolderInfo.postalCode,
      addressNumber: dto.creditCardHolderInfo.addressNumber,
      phone: dto.creditCardHolderInfo.phoneNumber,
    });

    const subscriptionInput = CreateSubscriptionInputModel.build({
      customerId: customer.bankExternalId,
      value: subscriptionValue,
      nextDueDate,
      cycle: SubscriptionCycleEnum.MONTHLY_RECURRING,
      description: paymentPlan.name,
      creditCardInfo,
      creditCardHolderInfo,
      externalReference: paymentPlan.id.toString(),
    });

    const bankSubscription =
      await this.paymentGateway.createSubscription(subscriptionInput);

    const paymentPlanEnabledResources =
      await this.paymentPlanEnabledPaidResourceQueryRepository.findManyByPaymentPlanId(
        paymentPlan.id,
      );

    const organizationPaymentPlan = new OrganizationPaymentPlanEntity({
      bankExternalId: bankSubscription.id,
      name: paymentPlan.name,
      description: paymentPlan.description,
      price: paymentPlan.price,
      maxMemberCount: paymentPlan.maxMemberCount,
      monthlyCreditAmount: paymentPlan.monthlyCreditAmount,
      cycle: paymentPlan.cycle,
      organization: organizationSessionData.organizationId,
      paymentPlan: paymentPlan.id,
      canceled: false,
      affiliateCustomerId: discountResult?.affiliateCustomerId ?? null,
    });

    const organizationPaymentPlanTransaction =
      this.organizationPaymentPlanCommandRepository.createOrganizationPaymentPlan(
        organizationPaymentPlan,
      );

    const organizationPaymentPlanEnabledPaidResourceTransactions =
      paymentPlanEnabledResources.map((enabledResource) => {
        const organizationPaymentPlanEnabledPaidResource =
          new OrganizationPaymentPlanEnabledPaidResourceEntity({
            organizationPaymentPlan: organizationPaymentPlan.id,
            paymentPlanPaidResource: enabledResource.paymentPlanPaidResourceId,
          });

        return this.organizationPaymentPlanEnabledPaidResourceCommandRepository.createOrganizationPaymentPlanEnabledPaidResource(
          organizationPaymentPlanEnabledPaidResource,
        );
      });

    const now = new Date();

    let organizationPaymentPlanAffiliateCommissionTransaction = null;
    if (discountResult !== null) {
      const commission = new OrganizationPaymentPlanAffiliateCommissionEntity({
        organizationPaymentPlan: organizationPaymentPlan.id,
        affiliateCustomer: discountResult.affiliateCustomerId,
        commissionPercentage: discountResult.commissionPercentage,
        createdAt: now,
        updatedAt: now,
      });
      organizationPaymentPlanAffiliateCommissionTransaction =
        this.organizationPaymentPlanAffiliateCommissionCommandRepository.createOrganizationPaymentPlanAffiliateCommission(
          commission,
        );
    }

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      organizationPaymentPlanTransaction,
      ...organizationPaymentPlanEnabledPaidResourceTransactions,
      ...(organizationPaymentPlanAffiliateCommissionTransaction !== null
        ? [organizationPaymentPlanAffiliateCommissionTransaction]
        : []),
    ]);

    await transaction.commit();

    if (discountResult !== null) {
      const affiliate = await this.affiliateCustomerQueryRepository.findOneById(
        discountResult.affiliateCustomerId,
      );
      if (affiliate !== null) {
        const updatedAffiliate = new AffiliateCustomerEntity({
          ...affiliate,
          paymentPlanDiscountRedemptionLimit: Math.max(
            0,
            affiliate.paymentPlanDiscountRedemptionLimit - 1,
          ),
          updatedAt: new Date(),
        });
        const decrementTransaction =
          await this.baseTransactionRepositoryGateway.execute([
            this.affiliateCustomerCommandRepository.updateAffiliateCustomer(
              discountResult.affiliateCustomerId,
              updatedAffiliate,
            ),
          ]);
        await decrementTransaction.commit();
      }
    }

    reply.clearCookie(ApiCookieEnum.AFFILIATE);

    const response = SubscribeToMonthlyRecurringPaymentPlanResponseDto.build({
      organizationPaymentPlanId: organizationPaymentPlan.id,
    });

    const amount = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(organizationPaymentPlan.price.toNumber());

    this.emailGateway
      .sendHTMLEmail(
        SendHTMLEmailInputModel.build({
          to: creditCardHolderInfo.email.toString(),
          subject: EmailApplicationVariable.EMAIL_PAYMENT_PLAN_PURCHASE_SUBJECT,
          emailTemplateName:
            EmailApplicationVariable.EMAIL_PAYMENT_PLAN_PURCHASE_TEMPLATE,
          emailTemplateParameters: {
            name: creditCardHolderInfo.name,
            planName: organizationPaymentPlan.name,
            amount,
          },
        }),
      )
      .catch(() => undefined);

    // Affiliate transfer for recurring subscription is processed via webhook on first payment confirmation

    return response;
  }
}
