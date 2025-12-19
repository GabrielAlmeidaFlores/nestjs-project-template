import { Inject, Injectable } from '@nestjs/common';

import { CreditCardHolderInfoInputModel } from '@infra/payment-gateway/model/input/credit-card-holder.input.model';
import { CreditCardInfoInputModel } from '@infra/payment-gateway/model/input/credit-card-info.input.model';
import { PayBillingInputModel } from '@infra/payment-gateway/model/input/pay-billing.input.model';
import { PaymentGateway } from '@infra/payment-gateway/payment-gateway.gateway';
import { OrganizationPaymentPlanBankPaymentQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-bank-payment/query/organization-payment-plan-bank-payment.query.repository.gateway';
import { PayBillingRequestDto } from '@module/customer/payment-plan/dto/request/pay-billing.request.dto';
import { PayBillingResponseDto } from '@module/customer/payment-plan/dto/response/pay-billing.response.dto';
import { BankPaymentNotFoundError } from '@module/customer/payment-plan/error/bank-payment-not-found.error';
import { DeleteOrganizationPaymentPlanUseCase } from '@module/customer/payment-plan/use-case/delete-organization-payment-plan.use-case';
import { BankPaymentQueryRepositoryGateway } from '@module/generic/bank/domain/repository/bank-payment/query/bank-payment.query.repository.gateway';
import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class PayBillingUseCase {
  protected readonly _type = PayBillingUseCase.name;

  public constructor(
    @Inject(BankPaymentQueryRepositoryGateway)
    private readonly bankPaymentQueryRepository: BankPaymentQueryRepositoryGateway,
    @Inject(OrganizationPaymentPlanBankPaymentQueryRepositoryGateway)
    private readonly organizationPaymentPlanBankPaymentQueryRepository: OrganizationPaymentPlanBankPaymentQueryRepositoryGateway,
    @Inject(PaymentGateway)
    private readonly paymentGateway: PaymentGateway,
    private readonly deleteOrganizationPaymentPlanUseCase: DeleteOrganizationPaymentPlanUseCase,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    dto: PayBillingRequestDto,
  ): Promise<PayBillingResponseDto> {
    const bankPayment =
      await this.bankPaymentQueryRepository.findOneBankPaymentByIdOrFail(
        new BankPaymentId(dto.bankPaymentId),
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

    const organizationPaymentPlanBankPayment =
      await this.organizationPaymentPlanBankPaymentQueryRepository.findOneOrganizationPaymentPlanBankPaymentByBankPaymentId(
        bankPayment.id,
      );

    await this.deleteOrganizationPaymentPlanUseCase.execute(
      organizationSessionData.organizationId,
      organizationPaymentPlanBankPayment?.organizationPaymentPlan,
    );

    return PayBillingResponseDto.build({
      bankPaymentId: bankPayment.id.toString(),
    });
  }
}
