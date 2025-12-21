import { Inject, Injectable } from '@nestjs/common';
import moment from 'moment';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { SubscriptionCycleEnum } from '@infra/payment-gateway/enum/subscription-cycle.enum';
import { CreateSubscriptionInputModel } from '@infra/payment-gateway/model/input/create-subscription.input.model';
import { CreditCardHolderInfoInputModel } from '@infra/payment-gateway/model/input/credit-card-holder.input.model';
import { CreditCardInfoInputModel } from '@infra/payment-gateway/model/input/credit-card-info.input.model';
import { PaymentGateway } from '@infra/payment-gateway/payment-gateway.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { OrganizationPaymentPlanCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/command/organization-payment-plan.command.repository.gateway';
import { OrganizationPaymentPlanEnabledPaidResourceCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-enabled-paid-resource/command/organization-payment-plan-enabled-paid-resource.repository.gateway';
import { PaymentPlanNotFoundError } from '@module/customer/payment-plan/domain/repository/payment-plan/query/error/payment-plan-not-found.error';
import { PaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/query/payment-plan.query.repository.gateway';
import { PaymentPlanEnabledPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-enabled-paid-resource/query/payment-plan-enabled-paid-resource.query.repository.gateway';
import { OrganizationPaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/organization-payment-plan.entity';
import { OrganizationPaymentPlanEnabledPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-enabled-paid-resource/organization-payment-plan-enabled-paid-resource.entity';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';
import { SubscribeToMonthlyRecurringPaymentPlanRequestDto } from '@module/customer/payment-plan/dto/request/subscribe-to-monthly-recurring-payment-plan.request.dto';
import { SubscribeToMonthlyRecurringPaymentPlanResponseDto } from '@module/customer/payment-plan/dto/response/subscribe-to-monthly-recurring-payment-plan.response.dto';
import { InvalidPaymentPlanCycleError } from '@module/customer/payment-plan/error/invalid-payment-plan-cycle.error';
import { DeleteOrganizationPaymentPlanUseCase } from '@module/customer/payment-plan/use-case/delete-organization-payment-plan.use-case';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

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
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    sessionData: SessionDataModel,
    dto: SubscribeToMonthlyRecurringPaymentPlanRequestDto,
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
      value: paymentPlan.price,
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
    });

    const organizationPaymentPlanTransaction =
      this.organizationPaymentPlanCommandRepository.createOrganizationPaymentPlan(
        organizationPaymentPlan,
      );

    const organizationPaymentPlanEnabledPaidResourceTransactions =
      paymentPlanEnabledResources.map((enabledResource) => {
        const organizationPaymentPlanEnabledPaidResource =
          new OrganizationPaymentPlanEnabledPaidResourceEntity({
            paymentPlan: enabledResource.paymentPlanId,
            paymentPlanPaidResource: enabledResource.paymentPlanPaidResourceId,
          });

        return this.organizationPaymentPlanEnabledPaidResourceCommandRepository.createOrganizationPaymentPlanEnabledPaidResource(
          organizationPaymentPlanEnabledPaidResource,
        );
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      organizationPaymentPlanTransaction,
      ...organizationPaymentPlanEnabledPaidResourceTransactions,
    ]);

    await transaction.commit();

    const response = SubscribeToMonthlyRecurringPaymentPlanResponseDto.build({
      organizationPaymentPlanId: organizationPaymentPlan.id,
    });

    return response;
  }
}
