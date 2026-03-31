import { Inject, Injectable } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import moment from 'moment';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CreateBillingInputModel } from '@infra/payment-gateway/model/input/create-billing.input.model';
import { PaymentGateway } from '@infra/payment-gateway/payment-gateway.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { ResolveAffiliatePlanDiscountGateway } from '@module/customer/affiliate-customer/lib/resolve-affiliate-plan-discount/resolve-affiliate-plan-discount.gateway';
import { OrganizationPaymentPlanCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/command/organization-payment-plan.command.repository.gateway';
import { OrganizationPaymentPlanAffiliateCommissionCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-affiliate-commission/command/organization-payment-plan-affiliate-commission.command.repository.gateway';
import { OrganizationPaymentPlanBankPaymentCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-bank-payment/command/organization-payment-plan-bank-payment.command.repository.gateway';
import { OrganizationPaymentPlanEnabledPaidResourceCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-enabled-paid-resource/command/organization-payment-plan-enabled-paid-resource.repository.gateway';
import { PaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/query/payment-plan.query.repository.gateway';
import { PaymentPlanEnabledPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-enabled-paid-resource/query/payment-plan-enabled-paid-resource.query.repository.gateway';
import { OrganizationPaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/organization-payment-plan.entity';
import { OrganizationPaymentPlanAffiliateCommissionEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-affiliate-commission/organization-payment-plan-affiliate-commission.entity';
import { OrganizationPaymentPlanBankPaymentEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-bank-payment/organization-payment-plan-bank-payment.entity';
import { OrganizationPaymentPlanEnabledPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-enabled-paid-resource/organization-payment-plan-enabled-paid-resource.entity';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';
import { GenerateMonthlyPaymentBillingRequestDto } from '@module/customer/payment-plan/dto/request/generate-monthly-payment-billing.request.dto';
import { GenerateMonthlyPaymentBillingResponseDto } from '@module/customer/payment-plan/dto/response/generate-monthly-payment-billing.response.dto';
import { InvalidPaymentPlanCycleError } from '@module/customer/payment-plan/error/invalid-payment-plan-cycle.error';
import { PaymentPlanNotFoundError } from '@module/customer/payment-plan/error/payment-plan-not-found.error';
import { BankPaymentCommandRepositoryGateway } from '@module/generic/bank/domain/repository/bank-payment/command/bank-payment.command.repository.gateway';
import { BankPaymentEntity } from '@module/generic/bank/domain/schema/entity/bank-payment/bank-payment.entity';
import { PaymentMethodEnum } from '@module/generic/bank/domain/schema/entity/bank-payment/enum/payment-method.enum';
import { PaymentStatusEnum } from '@module/generic/bank/domain/schema/entity/bank-payment/enum/payment-status.enum';
import { ApiCookieEnum } from '@shared/api/enum/api-cookie.enum';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GenerateMonthlyPaymentBillingUseCase {
  protected readonly _type = GenerateMonthlyPaymentBillingUseCase.name;

  public constructor(
    @Inject(PaymentPlanQueryRepositoryGateway)
    private readonly paymentPlanQueryRepository: PaymentPlanQueryRepositoryGateway,
    @Inject(PaymentPlanEnabledPaidResourceQueryRepositoryGateway)
    private readonly paymentPlanEnabledPaidResourceQueryRepository: PaymentPlanEnabledPaidResourceQueryRepositoryGateway,
    @Inject(OrganizationPaymentPlanCommandRepositoryGateway)
    private readonly organizationPaymentPlanCommandRepository: OrganizationPaymentPlanCommandRepositoryGateway,
    @Inject(OrganizationPaymentPlanEnabledPaidResourceCommandRepositoryGateway)
    private readonly organizationPaymentPlanEnabledPaidResourceCommandRepository: OrganizationPaymentPlanEnabledPaidResourceCommandRepositoryGateway,
    @Inject(OrganizationPaymentPlanBankPaymentCommandRepositoryGateway)
    private readonly organizationPaymentPlanBankPaymentCommandRepository: OrganizationPaymentPlanBankPaymentCommandRepositoryGateway,
    @Inject(BankPaymentCommandRepositoryGateway)
    private readonly bankPaymentCommandRepository: BankPaymentCommandRepositoryGateway,
    @Inject(PaymentGateway)
    private readonly paymentGateway: PaymentGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepository: CustomerQueryRepositoryGateway,
    @Inject(ResolveAffiliatePlanDiscountGateway)
    private readonly resolveAffiliatePlanDiscountService: ResolveAffiliatePlanDiscountGateway,
    @Inject(OrganizationPaymentPlanAffiliateCommissionCommandRepositoryGateway)
    private readonly organizationPaymentPlanAffiliateCommissionCommandRepository: OrganizationPaymentPlanAffiliateCommissionCommandRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    sessionData: SessionDataModel,
    dto: GenerateMonthlyPaymentBillingRequestDto,
    reply: FastifyReply,
  ): Promise<GenerateMonthlyPaymentBillingResponseDto> {
    const organizationId = organizationSessionData.organizationId;

    const paymentPlan =
      await this.paymentPlanQueryRepository.findOnePaymentPlanByIdOrFail(
        new PaymentPlanId(dto.paymentPlanId),
        PaymentPlanNotFoundError,
      );

    if (paymentPlan.cycle !== PaymentPlanCycleEnum.MONTHLY) {
      throw new InvalidPaymentPlanCycleError();
    }

    const customer =
      await this.customerQueryRepository.findOneByAuthIdentityIdOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
      );

    const DAYS_UNTIL_DUE = 7;
    const dueDate = moment()
      .add(DAYS_UNTIL_DUE, 'days')
      .startOf('day')
      .toDate();

    const { billingPrice: billingValue, discountResult } =
      await this.resolveAffiliatePlanDiscountService.resolveBillingPrice(
        reply.request.cookies[ApiCookieEnum.AFFILIATE],
        paymentPlan.id,
        paymentPlan.price,
      );

    const createBillingResult = await this.paymentGateway.createBilling(
      CreateBillingInputModel.build({
        customerId: customer.bankExternalId,
        value: billingValue,
        dueDate,
        description: `Cobrança - ${paymentPlan.name}`,
        externalReference: `MONTHLY_${paymentPlan.id.toString()}_${Date.now()}`,
      }),
    );

    const bankPayment = new BankPaymentEntity({
      bankExternalId: createBillingResult.id,
      paymentMethod: PaymentMethodEnum.UNDEFINED,
      amount: createBillingResult.value,
      status: PaymentStatusEnum.PENDING,
      dueDate,
      paymentDate: null,
      installmentNumber: null,
      pixQrCode: createBillingResult.pixQrCode ?? null,
      pixCopyPaste: createBillingResult.pixCopyPaste ?? null,
      bankSlipUrl: createBillingResult.bankSlipUrl ?? null,
      bankSlipCode: createBillingResult.bankSlipCode ?? null,
    });

    const paymentPlanEnabledResources =
      await this.paymentPlanEnabledPaidResourceQueryRepository.findManyByPaymentPlanId(
        paymentPlan.id,
      );

    const organizationPaymentPlan = new OrganizationPaymentPlanEntity({
      bankExternalId: createBillingResult.id,
      name: paymentPlan.name,
      description: paymentPlan.description,
      price: paymentPlan.price,
      maxMemberCount: paymentPlan.maxMemberCount,
      monthlyCreditAmount: paymentPlan.monthlyCreditAmount,
      cycle: paymentPlan.cycle,
      organization: organizationId,
      paymentPlan: paymentPlan.id,
      canceled: false,
      affiliateCustomerId: discountResult?.affiliateCustomerId ?? null,
    });

    const organizationPaymentPlanBankPayment =
      new OrganizationPaymentPlanBankPaymentEntity({
        organizationPaymentPlan: organizationPaymentPlan.id,
        bankPayment: bankPayment.id,
      });

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
      this.bankPaymentCommandRepository.createBankPayment(bankPayment),
      this.organizationPaymentPlanCommandRepository.createOrganizationPaymentPlan(
        organizationPaymentPlan,
      ),
      this.organizationPaymentPlanBankPaymentCommandRepository.createOrganizationPaymentPlanBankPayment(
        organizationPaymentPlanBankPayment,
      ),
      ...organizationPaymentPlanEnabledPaidResourceTransactions,
      ...(organizationPaymentPlanAffiliateCommissionTransaction !== null
        ? [organizationPaymentPlanAffiliateCommissionTransaction]
        : []),
    ]);

    await transaction.commit();

    return GenerateMonthlyPaymentBillingResponseDto.build({
      bankPaymentId: bankPayment.id.toString(),
      pixQrCode: bankPayment.pixQrCode?.toString() ?? null,
      pixCopyPaste: bankPayment.pixCopyPaste ?? null,
      bankSlipUrl: bankPayment.bankSlipUrl ?? null,
      bankSlipCode: bankPayment.bankSlipCode ?? null,
    });
  }
}
