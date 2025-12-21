import { Inject, Injectable } from '@nestjs/common';
import moment from 'moment';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { CreateBillingInputModel } from '@infra/payment-gateway/model/input/create-billing.input.model';
import { PaymentGateway } from '@infra/payment-gateway/payment-gateway.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { OrganizationPaymentPlanCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/command/organization-payment-plan.command.repository.gateway';
import { OrganizationPaymentPlanBankPaymentCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-bank-payment/command/organization-payment-plan-bank-payment.command.repository.gateway';
import { OrganizationPaymentPlanEnabledPaidResourceCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-enabled-paid-resource/command/organization-payment-plan-enabled-paid-resource.repository.gateway';
import { PaymentPlanNotFoundError } from '@module/customer/payment-plan/domain/repository/payment-plan/query/error/payment-plan-not-found.error';
import { PaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/query/payment-plan.query.repository.gateway';
import { PaymentPlanEnabledPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-enabled-paid-resource/query/payment-plan-enabled-paid-resource.query.repository.gateway';
import { OrganizationPaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/organization-payment-plan.entity';
import { OrganizationPaymentPlanBankPaymentEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-bank-payment/organization-payment-plan-bank-payment.entity';
import { OrganizationPaymentPlanEnabledPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-enabled-paid-resource/organization-payment-plan-enabled-paid-resource.entity';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';
import { GenerateYearlyPaymentBillingRequestDto } from '@module/customer/payment-plan/dto/request/generate-yearly-payment-billing.request.dto';
import { GenerateYearlyPaymentBillingResponseDto } from '@module/customer/payment-plan/dto/response/generate-yearly-payment-billing.response.dto';
import { InvalidPaymentPlanCycleError } from '@module/customer/payment-plan/error/invalid-payment-plan-cycle.error';
import { MissingInstallmentInfoError } from '@module/customer/payment-plan/error/missing-installment-info.error';
import { BankPaymentCommandRepositoryGateway } from '@module/generic/bank/domain/repository/bank-payment/command/bank-payment.command.repository.gateway';
import { BankPaymentEntity } from '@module/generic/bank/domain/schema/entity/bank-payment/bank-payment.entity';
import { PaymentMethodEnum } from '@module/generic/bank/domain/schema/entity/bank-payment/enum/payment-method.enum';
import { PaymentStatusEnum } from '@module/generic/bank/domain/schema/entity/bank-payment/enum/payment-status.enum';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GenerateYearlyPaymentBillingUseCase {
  protected readonly _type = GenerateYearlyPaymentBillingUseCase.name;

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
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    sessionData: SessionDataModel,
    dto: GenerateYearlyPaymentBillingRequestDto,
  ): Promise<GenerateYearlyPaymentBillingResponseDto> {
    const organizationId = organizationSessionData.organizationId.toString();

    const paymentPlan =
      await this.paymentPlanQueryRepository.findOnePaymentPlanByIdOrFail(
        new PaymentPlanId(dto.paymentPlanId),
        PaymentPlanNotFoundError,
      );

    let organizationPaymentPlan = new OrganizationPaymentPlanEntity({
      bankExternalId: Guid.toString(),
      name: paymentPlan.name,
      description: paymentPlan.description,
      price: paymentPlan.price,
      maxMemberCount: paymentPlan.maxMemberCount,
      monthlyCreditAmount: paymentPlan.monthlyCreditAmount,
      cycle: paymentPlan.cycle,
      organization: new OrganizationId(organizationId),
      paymentPlan: paymentPlan.id,
      totalInstallments: dto.installments,
    });

    if (paymentPlan.cycle !== PaymentPlanCycleEnum.YEARLY) {
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

    const createBillingResult = await this.paymentGateway.createBilling(
      CreateBillingInputModel.build({
        customerId: customer.bankExternalId,
        value: paymentPlan.price,
        dueDate,
        description: paymentPlan.name,
        externalReference: organizationPaymentPlan.id.toString(),
        installmentCount: dto.installments,
      }),
    );

    if (typeof createBillingResult.installment !== 'string') {
      throw new MissingInstallmentInfoError();
    }
    {
      organizationPaymentPlan = new OrganizationPaymentPlanEntity({
        ...organizationPaymentPlan,
        bankExternalId: createBillingResult.installment,
      });

      const amount = paymentPlan.price.toNumber() / dto.installments;

      const bankPayment = new BankPaymentEntity({
        bankExternalId: createBillingResult.id,
        paymentMethod: PaymentMethodEnum.UNDEFINED,
        amount: new DecimalValue(amount.toFixed(2)),
        status: PaymentStatusEnum.PENDING,
        dueDate,
        paymentDate: null,
        installmentNumber: 1,
        pixQrCode: createBillingResult.pixQrCode ?? null,
        pixCopyPaste: createBillingResult.pixCopyPaste ?? null,
      });

      const paymentPlanEnabledResources =
        await this.paymentPlanEnabledPaidResourceQueryRepository.findManyByPaymentPlanId(
          paymentPlan.id,
        );

      const organizationPaymentPlanBankPayment =
        new OrganizationPaymentPlanBankPaymentEntity({
          organizationPaymentPlan: organizationPaymentPlan.id,
          bankPayment: bankPayment.id,
        });

      const organizationPaymentPlanEnabledPaidResourceTransactions =
        paymentPlanEnabledResources.map((enabledResource) => {
          const organizationPaymentPlanEnabledPaidResource =
            new OrganizationPaymentPlanEnabledPaidResourceEntity({
              paymentPlan: enabledResource.paymentPlanId,
              paymentPlanPaidResource:
                enabledResource.paymentPlanPaidResourceId,
            });

          return this.organizationPaymentPlanEnabledPaidResourceCommandRepository.createOrganizationPaymentPlanEnabledPaidResource(
            organizationPaymentPlanEnabledPaidResource,
          );
        });

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        this.bankPaymentCommandRepository.createBankPayment(bankPayment),
        this.organizationPaymentPlanCommandRepository.createOrganizationPaymentPlan(
          organizationPaymentPlan,
        ),
        this.organizationPaymentPlanBankPaymentCommandRepository.createOrganizationPaymentPlanBankPayment(
          organizationPaymentPlanBankPayment,
        ),
        ...organizationPaymentPlanEnabledPaidResourceTransactions,
      ]);

      await transaction.commit();

      return GenerateYearlyPaymentBillingResponseDto.build({
        bankPaymentId: bankPayment.id.toString(),
        pixQrCode: bankPayment.pixQrCode?.toString() ?? null,
        pixCopyPaste: bankPayment.pixCopyPaste ?? null,
      });
    }
  }
}
