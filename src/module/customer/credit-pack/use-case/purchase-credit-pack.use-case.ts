import { Inject, Injectable } from '@nestjs/common';
import moment from 'moment';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { CreateBillingInputModel } from '@infra/payment-gateway/model/input/create-billing.input.model';
import { PaymentGateway } from '@infra/payment-gateway/payment-gateway.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { CreditPackQueryRepositoryGateway } from '@module/customer/credit-pack/domain/repository/credit-pack/query/credit-pack.query.repository.gateway';
import { OrganizationCreditPackPurchaseCommandRepositoryGateway } from '@module/customer/credit-pack/domain/repository/organization-credit-pack-purchase/command/organization-credit-pack-purchase.command.repository.gateway';
import { OrganizationCreditPackPurchaseEntity } from '@module/customer/credit-pack/domain/schema/entity/organization-credit-pack-purchase/organization-credit-pack-purchase.entity';
import { PurchaseCreditPackRequestDto } from '@module/customer/credit-pack/dto/request/purchase-credit-pack.request.dto';
import { PurchaseCreditPackResponseDto } from '@module/customer/credit-pack/dto/response/purchase-credit-pack.response.dto';
import { CreditPackInactiveError } from '@module/customer/credit-pack/error/credit-pack-inactive.error';
import { CreditPackNotFoundError } from '@module/customer/credit-pack/error/credit-pack-not-found.error';
import { BankPaymentCommandRepositoryGateway } from '@module/generic/bank/domain/repository/bank-payment/command/bank-payment.command.repository.gateway';
import { BankPaymentEntity } from '@module/generic/bank/domain/schema/entity/bank-payment/bank-payment.entity';
import { PaymentMethodEnum } from '@module/generic/bank/domain/schema/entity/bank-payment/enum/payment-method.enum';
import { PaymentStatusEnum } from '@module/generic/bank/domain/schema/entity/bank-payment/enum/payment-status.enum';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class PurchaseCreditPackUseCase {
  protected readonly _type = PurchaseCreditPackUseCase.name;

  private readonly DAYS_UNTIL_DUE: number;

  public constructor(
    @Inject(CreditPackQueryRepositoryGateway)
    private readonly creditPackQueryRepository: CreditPackQueryRepositoryGateway,
    @Inject(OrganizationCreditPackPurchaseCommandRepositoryGateway)
    private readonly organizationCreditPackPurchaseCommandRepository: OrganizationCreditPackPurchaseCommandRepositoryGateway,
    @Inject(BankPaymentCommandRepositoryGateway)
    private readonly bankPaymentCommandRepository: BankPaymentCommandRepositoryGateway,
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepository: CustomerQueryRepositoryGateway,
    @Inject(PaymentGateway)
    private readonly paymentGateway: PaymentGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {
    this.DAYS_UNTIL_DUE = 7;
  }

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    sessionData: SessionDataModel,
    dto: PurchaseCreditPackRequestDto,
  ): Promise<PurchaseCreditPackResponseDto> {
    const creditPack =
      await this.creditPackQueryRepository.findOneCreditPackById(
        dto.creditPackId,
      );

    if (!creditPack) {
      throw new CreditPackNotFoundError();
    }

    if (!creditPack.active) {
      throw new CreditPackInactiveError();
    }

    const customer =
      await this.customerQueryRepository.findOneByAuthIdentityIdOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
      );

    const dueDate = moment()
      .add(this.DAYS_UNTIL_DUE, 'days')
      .startOf('day')
      .toDate();

    const createBillingResult = await this.paymentGateway.createBilling(
      CreateBillingInputModel.build({
        customerId: customer.bankExternalId,
        value: creditPack.price,
        dueDate,
        description: `Compra - Pacote ${creditPack.creditAmount} créditos`,
        externalReference: `CREDIT_PACK_${creditPack.id.toString()}_${Date.now()}`,
      }),
    );

    const bankPayment = new BankPaymentEntity({
      bankExternalId: createBillingResult.id,
      paymentMethod: PaymentMethodEnum.UNDEFINED,
      amount: new DecimalValue(creditPack.price.toString()),
      status: PaymentStatusEnum.PENDING,
      dueDate,
      paymentDate: null,
      installmentNumber: null,
      pixQrCode: createBillingResult.pixQrCode ?? null,
      pixCopyPaste: createBillingResult.pixCopyPaste ?? null,
      bankSlipUrl: createBillingResult.bankSlipUrl ?? null,
      bankSlipCode: createBillingResult.bankSlipCode ?? null,
    });

    const organizationCreditPackPurchase =
      new OrganizationCreditPackPurchaseEntity({
        organizationId: organizationSessionData.organizationId,
        creditPackId: creditPack.id,
        creditAmount: creditPack.creditAmount,
        price: creditPack.price,
        bankPaymentId: bankPayment.id,
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.bankPaymentCommandRepository.createBankPayment(bankPayment),
      this.organizationCreditPackPurchaseCommandRepository.createOrganizationCreditPackPurchase(
        organizationCreditPackPurchase,
      ),
    ]);
    await transaction.commit();

    return PurchaseCreditPackResponseDto.build({
      bankPaymentId: bankPayment.id.toString(),
      pixQrCode:
        bankPayment.pixQrCode !== null
          ? bankPayment.pixQrCode.toString()
          : null,
      pixCopyPaste: bankPayment.pixCopyPaste ?? null,
      bankSlipUrl: bankPayment.bankSlipUrl ?? null,
      bankSlipCode: bankPayment.bankSlipCode ?? null,
    });
  }
}
