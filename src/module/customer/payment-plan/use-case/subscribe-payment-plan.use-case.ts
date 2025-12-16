import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import {
  CreditCardHolderInfoInputModel,
  CreditCardInfoInputModel,
  CreateSubscriptionInputModel,
} from '@infra/payment-gateway/model/input/create-subscription.input.model';
import { PaymentGateway } from '@infra/payment-gateway/payment-gateway.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { OrganizationPaymentPlanCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/command/organization-payment-plan.command.repository.gateway';
import { OrganizationPaymentPlanEnablePaidResourceCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-enable-paid-resource/command/organization-payment-plan-enable-paid-resource.repository.gateway';
import { PaymentPlanNotFoundError } from '@module/customer/payment-plan/domain/repository/payment-plan/query/error/payment-plan-not-found.error';
import { PaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/query/payment-plan.query.repository.gateway';
import { PaymentPlanEnablePaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-enable-paid-resource/query/payment-plan-enable-paid-resource.query.repository.gateway';
import { OrganizationPaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/organization-payment-plan.entity';
import { OrganizationPaymentPlanEnablePaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-enable-paid-resource/organization-payment-plan-enable-paid-resource.entity';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { SubscribePaymentPlanRequestDto } from '@module/customer/payment-plan/dto/request/subscribe-payment-plan.request.dto';
import { SubscribePaymentPlanResponseDto } from '@module/customer/payment-plan/dto/response/subscribe-payment-plan.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class SubscribePaymentPlanUseCase {
  protected readonly _type = SubscribePaymentPlanUseCase.name;

  public constructor(
    @Inject(PaymentPlanQueryRepositoryGateway)
    private readonly paymentPlanQueryRepository: PaymentPlanQueryRepositoryGateway,
    @Inject(PaymentPlanEnablePaidResourceQueryRepositoryGateway)
    private readonly paymentPlanEnablePaidResourceQueryRepository: PaymentPlanEnablePaidResourceQueryRepositoryGateway,
    @Inject(OrganizationPaymentPlanCommandRepositoryGateway)
    private readonly organizationPaymentPlanCommandRepository: OrganizationPaymentPlanCommandRepositoryGateway,
    @Inject(OrganizationPaymentPlanEnablePaidResourceCommandRepositoryGateway)
    private readonly organizationPaymentPlanEnablePaidResourceCommandRepository: OrganizationPaymentPlanEnablePaidResourceCommandRepositoryGateway,
    @Inject(PaymentGateway)
    private readonly paymentGateway: PaymentGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepository: CustomerQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    sessionData: SessionDataModel,
    dto: SubscribePaymentPlanRequestDto,
  ): Promise<SubscribePaymentPlanResponseDto> {
    const organizationId = organizationSessionData.organizationId.toString();

    // Buscar o customer pelo authIdentityId para obter o bankExternalId
    const customer =
      await this.customerQueryRepository.findOneByAuthIdentityIdOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
      );

    const paymentPlan =
      await this.paymentPlanQueryRepository.findOnePaymentPlanByIdOrFail(
        new PaymentPlanId(dto.paymentPlanId),
        PaymentPlanNotFoundError,
      );

    const nextDueDate = new Date();

    const creditCardInfo = CreditCardInfoInputModel.build({
      holderName: dto.creditCardInfo.holderName,
      number: dto.creditCardInfo.number,
      expiryMonth: dto.creditCardInfo.expiryMonth,
      expiryYear: dto.creditCardInfo.expiryYear,
      ccv: dto.creditCardInfo.ccv,
    });

    const creditCardHolderInfo = CreditCardHolderInfoInputModel.build({
      name: dto.creditCardHolderInfo.name,
      email: new Email(dto.creditCardHolderInfo.email),
      federalDocument: new FederalDocument(
        dto.creditCardHolderInfo.federalDocument,
      ),
      postalCode: new PostalCode(dto.creditCardHolderInfo.postalCode),
      addressNumber: dto.creditCardHolderInfo.addressNumber,
      phone: new PhoneNumber(dto.creditCardHolderInfo.phone),
    });

    const subscriptionInput = CreateSubscriptionInputModel.build({
      customerId: customer.bankExternalId,
      value: paymentPlan.price,
      nextDueDate,
      cycle: paymentPlan.cycle,
      description: paymentPlan.name,
      creditCardInfo,
      creditCardHolderInfo,
      externalReference: `payment-plan-id:${paymentPlan.id.toString()}`,
    });

    const subscription =
      await this.paymentGateway.createSubscription(subscriptionInput);

    const paymentPlanEnabledResources =
      await this.paymentPlanEnablePaidResourceQueryRepository.findManyByPaymentPlanId(
        paymentPlan.id,
      );

    const organizationPaymentPlan = new OrganizationPaymentPlanEntity({
      bankExternalId: subscription.id,
      name: paymentPlan.name,
      description: paymentPlan.description,
      price: paymentPlan.price,
      maxMemberCount: paymentPlan.maxMemberCount,
      monthlyCreditAmount: paymentPlan.monthlyCreditAmount,
      active: true,
      cycle: paymentPlan.cycle,
      organization: new OrganizationId(organizationId),
      paymentPlan: paymentPlan.id,
    });

    const organizationPaymentPlanTransaction =
      this.organizationPaymentPlanCommandRepository.createOrganizationPaymentPlan(
        organizationPaymentPlan,
      );

    const organizationPaymentPlanEnablePaidResourceTransactions =
      paymentPlanEnabledResources.map((enabledResource) => {
        const organizationPaymentPlanEnablePaidResource =
          new OrganizationPaymentPlanEnablePaidResourceEntity({
            paymentPlan: enabledResource.paymentPlanId,
            paymentPlanPaidResource: enabledResource.paymentPlanPaidResourceId,
          });

        return this.organizationPaymentPlanEnablePaidResourceCommandRepository.createOrganizationPaymentPlanEnablePaidResource(
          organizationPaymentPlanEnablePaidResource,
        );
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      organizationPaymentPlanTransaction,
      ...organizationPaymentPlanEnablePaidResourceTransactions,
    ]);

    await transaction.commit();

    return SubscribePaymentPlanResponseDto.build({
      subscriptionId: subscription.id,
    });
  }
}
