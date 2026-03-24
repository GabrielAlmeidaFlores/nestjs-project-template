import { Inject, Injectable } from '@nestjs/common';

import { CreditCardHolderInfoInputModel } from '@infra/payment-gateway/model/input/credit-card-holder.input.model';
import { CreditCardInfoInputModel } from '@infra/payment-gateway/model/input/credit-card-info.input.model';
import { PayBillingInputModel } from '@infra/payment-gateway/model/input/pay-billing.input.model';
import { PaymentGateway } from '@infra/payment-gateway/payment-gateway.gateway';
import { PayCreditPackBillingResponseDto } from '@module/customer/credit-pack/dto/response/pay-credit-pack-billing.response.dto';
import { PayBillingRequestDto } from '@module/customer/payment-plan/dto/request/pay-billing.request.dto';
import { BankPaymentNotFoundError } from '@module/customer/payment-plan/error/bank-payment-not-found.error';
import { BankPaymentQueryRepositoryGateway } from '@module/generic/bank/domain/repository/bank-payment/query/bank-payment.query.repository.gateway';
import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class PayCreditPackBillingUseCase {
  protected readonly _type = PayCreditPackBillingUseCase.name;

  public constructor(
    @Inject(BankPaymentQueryRepositoryGateway)
    private readonly bankPaymentQueryRepository: BankPaymentQueryRepositoryGateway,
    @Inject(PaymentGateway)
    private readonly paymentGateway: PaymentGateway,
  ) {}

  public async execute(
    _organizationSessionData: OrganizationSessionDataModel,
    bankPaymentId: BankPaymentId,
    dto: PayBillingRequestDto,
  ): Promise<PayCreditPackBillingResponseDto> {
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

    return PayCreditPackBillingResponseDto.build({
      bankPaymentId: bankPayment.id,
    });
  }
}
