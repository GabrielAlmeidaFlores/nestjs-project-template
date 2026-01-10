import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { EmailGateway } from '@infra/email/email.gateway';
import { SendHTMLEmailInputModel } from '@infra/email/model/input/send-html-email.iput.model';
import { CreditCardHolderInfoInputModel } from '@infra/payment-gateway/model/input/credit-card-holder.input.model';
import { CreditCardInfoInputModel } from '@infra/payment-gateway/model/input/credit-card-info.input.model';
import { PayBillingInputModel } from '@infra/payment-gateway/model/input/pay-billing.input.model';
import { PaymentGateway } from '@infra/payment-gateway/payment-gateway.gateway';
import { OrganizationPaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/organization-payment-plan.query.repository.gateway';
import { OrganizationPaymentPlanBankPaymentQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-bank-payment/query/organization-payment-plan-bank-payment.query.repository.gateway';
import { PayBillingRequestDto } from '@module/customer/payment-plan/dto/request/pay-billing.request.dto';
import { PayBillingResponseDto } from '@module/customer/payment-plan/dto/response/pay-billing.response.dto';
import { BankPaymentNotFoundError } from '@module/customer/payment-plan/error/bank-payment-not-found.error';
import { DeleteOrganizationPaymentPlanUseCase } from '@module/customer/payment-plan/use-case/delete-organization-payment-plan.use-case';
import { BankPaymentCommandRepositoryGateway } from '@module/generic/bank/domain/repository/bank-payment/command/bank-payment.command.repository.gateway';
import { BankPaymentQueryRepositoryGateway } from '@module/generic/bank/domain/repository/bank-payment/query/bank-payment.query.repository.gateway';
import { BankPaymentEntity } from '@module/generic/bank/domain/schema/entity/bank-payment/bank-payment.entity';
import { PaymentMethodEnum } from '@module/generic/bank/domain/schema/entity/bank-payment/enum/payment-method.enum';
import { PaymentStatusEnum } from '@module/generic/bank/domain/schema/entity/bank-payment/enum/payment-status.enum';
import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { EmailApplicationVariable } from '@shared/system/constant/application-variable/source/email.application-variable';

@Injectable()
export class PayBillingUseCase {
  protected readonly _type = PayBillingUseCase.name;

  public constructor(
    @Inject(BankPaymentQueryRepositoryGateway)
    private readonly bankPaymentQueryRepository: BankPaymentQueryRepositoryGateway,
    @Inject(BankPaymentCommandRepositoryGateway)
    private readonly bankPaymentCommandRepository: BankPaymentCommandRepositoryGateway,
    @Inject(OrganizationPaymentPlanBankPaymentQueryRepositoryGateway)
    private readonly organizationPaymentPlanBankPaymentQueryRepository: OrganizationPaymentPlanBankPaymentQueryRepositoryGateway,
    @Inject(PaymentGateway)
    private readonly paymentGateway: PaymentGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    private readonly deleteOrganizationPaymentPlanUseCase: DeleteOrganizationPaymentPlanUseCase,
    @Inject(EmailGateway)
    private readonly emailGateway: EmailGateway,
    @Inject(OrganizationPaymentPlanQueryRepositoryGateway)
    private readonly organizationPaymentPlanQueryRepository: OrganizationPaymentPlanQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    bankPaymentId: BankPaymentId,
    dto: PayBillingRequestDto,
  ): Promise<PayBillingResponseDto> {
    const bankPayment =
      await this.bankPaymentQueryRepository.findOneBankPaymentByIdOrFail(
        bankPaymentId,
        BankPaymentNotFoundError,
      );

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

    await this.paymentGateway.payBilling(
      PayBillingInputModel.build({
        billingId: bankPayment.bankExternalId,
        creditCardInfo,
        creditCardHolderInfo,
      }),
    );

    const updatedBankPayment = new BankPaymentEntity({
      ...bankPayment,
      status: PaymentStatusEnum.CONFIRMED,
      paymentDate: new Date(),
      paymentMethod: PaymentMethodEnum.CREDIT_CARD,
    });

    const updateBankPaymentTransaction =
      this.bankPaymentCommandRepository.updateBankPayment(
        bankPayment.id,
        updatedBankPayment,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      updateBankPaymentTransaction,
    ]);
    await transaction.commit();

    const organizationPaymentPlanBankPayment =
      await this.organizationPaymentPlanBankPaymentQueryRepository.findOneOrganizationPaymentPlanBankPaymentByBankPaymentId(
        bankPayment.id,
      );

    await this.deleteOrganizationPaymentPlanUseCase.execute(
      organizationSessionData.organizationId,
      organizationPaymentPlanBankPayment?.organizationPaymentPlan,
    );

    const organizationPaymentPlan =
      await this.organizationPaymentPlanQueryRepository.findOneByBankPaymentId(
        bankPayment.id,
      );

    if (organizationPaymentPlan) {
      const amount = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(bankPayment.amount.toNumber());

      await this.emailGateway.sendHTMLEmail(
        SendHTMLEmailInputModel.build({
          to: creditCardHolderInfo.email.toString(),
          subject: 'Confirmação de Pagamento do Plano',
          emailTemplateName:
            EmailApplicationVariable.EMAIL_PAYMENT_PLAN_PURCHASE_TEMPLATE,
          emailTemplateParameters: {
            name: creditCardHolderInfo.name,
            planName: organizationPaymentPlan.name,
            amount: amount,
          },
        }),
      );
    }

    return PayBillingResponseDto.build({
      bankPaymentId: bankPayment.id.toString(),
    });
  }
}
