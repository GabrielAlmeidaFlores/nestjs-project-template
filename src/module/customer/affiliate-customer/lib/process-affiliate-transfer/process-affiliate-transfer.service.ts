import { Inject, Injectable, Logger } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { PixAddressKeyTypeEnum as GatewayPixAddressKeyTypeEnum } from '@infra/payment-gateway/enum/pix-address-key-type.enum';
import { CreateTransferInputModel } from '@infra/payment-gateway/model/input/create-transfer.input.model';
import { PaymentGateway } from '@infra/payment-gateway/payment-gateway.gateway';
import { AffiliateBankTransferCommandRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-bank-transfer/command/affiliate-bank-transfer.command.repository.gateway';
import { AffiliateCustomerQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/affiliate-customer.query.repository.gateway';
import { AffiliateBankTransferEntity } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-bank-transfer/affiliate-bank-transfer.entity';
import { PixAddressKeyTypeEnum } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/enum/pix-address-key-type.enum';
import { ProcessAffiliateTransferGateway } from '@module/customer/affiliate-customer/lib/process-affiliate-transfer/process-affiliate-transfer.gateway';
import { OrganizationPaymentPlanAffiliateCommissionQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-affiliate-commission/query/organization-payment-plan-affiliate-commission.query.repository.gateway';
import { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import { BankTransferCommandRepositoryGateway } from '@module/generic/bank/domain/repository/bank-transfer/command/bank-transfer.command.repository.gateway';
import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';
import { BankTransferEntity } from '@module/generic/bank/domain/schema/entity/bank-transfer/bank-transfer.entity';
import { TransferStatusEnum } from '@module/generic/bank/domain/schema/entity/bank-transfer/enum/transfer-status.enum';

const HUNDRED_PERCENT = 100;

const DOMAIN_TO_GATEWAY_PIX_KEY_TYPE_MAP: Record<
  PixAddressKeyTypeEnum,
  GatewayPixAddressKeyTypeEnum
> = {
  [PixAddressKeyTypeEnum.CPF]: GatewayPixAddressKeyTypeEnum.CPF,
  [PixAddressKeyTypeEnum.CNPJ]: GatewayPixAddressKeyTypeEnum.CNPJ,
  [PixAddressKeyTypeEnum.EMAIL]: GatewayPixAddressKeyTypeEnum.EMAIL,
  [PixAddressKeyTypeEnum.PHONE]: GatewayPixAddressKeyTypeEnum.PHONE,
  [PixAddressKeyTypeEnum.RANDOM]: GatewayPixAddressKeyTypeEnum.RANDOM,
};

@Injectable()
export class ProcessAffiliateTransferService implements ProcessAffiliateTransferGateway {
  protected readonly _type = ProcessAffiliateTransferService.name;

  private readonly logger: Logger;

  public constructor(
    @Inject(OrganizationPaymentPlanAffiliateCommissionQueryRepositoryGateway)
    private readonly commissionQueryRepo: OrganizationPaymentPlanAffiliateCommissionQueryRepositoryGateway,
    @Inject(AffiliateCustomerQueryRepositoryGateway)
    private readonly affiliateQueryRepo: AffiliateCustomerQueryRepositoryGateway,
    @Inject(BankTransferCommandRepositoryGateway)
    private readonly bankTransferCommandRepo: BankTransferCommandRepositoryGateway,
    @Inject(AffiliateBankTransferCommandRepositoryGateway)
    private readonly affiliateBankTransferCommandRepo: AffiliateBankTransferCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly transactionRepo: BaseTransactionRepositoryGateway,
    @Inject(PaymentGateway)
    private readonly paymentGateway: PaymentGateway,
  ) {
    this.logger = new Logger(ProcessAffiliateTransferService.name);
  }

  public async process(
    bankPaymentId: BankPaymentId,
    organizationPaymentPlanId: OrganizationPaymentPlanId,
    paymentAmount: DecimalValue,
  ): Promise<void> {
    try {
      const commission =
        await this.commissionQueryRepo.findOneByOrganizationPaymentPlanId(
          organizationPaymentPlanId,
        );

      if (commission === null) {
        return;
      }

      const affiliate = await this.affiliateQueryRepo.findOneById(
        commission.affiliateCustomer,
      );

      if (affiliate === null) {
        return;
      }

      if (!affiliate.isActive) {
        return;
      }

      if (
        affiliate.pixAddressKey === null ||
        affiliate.pixAddressKeyType === null
      ) {
        return;
      }

      const commissionAmount = new DecimalValue(
        (
          (paymentAmount.toNumber() * commission.commissionPercentage) /
          HUNDRED_PERCENT
        ).toFixed(2),
      );

      const now = new Date();

      const bankTransfer = new BankTransferEntity({
        bankExternalId: null,
        amount: commissionAmount,
        status: TransferStatusEnum.PENDING,
        pixAddressKey: affiliate.pixAddressKey.toString(),
        pixAddressKeyType: affiliate.pixAddressKeyType,
        transferDate: null,
        description: 'Comissão de afiliado',
        createdAt: now,
        updatedAt: now,
      });

      const affiliateBankTransfer = new AffiliateBankTransferEntity({
        affiliatePlanCommission: commission.id,
        bankPayment: bankPaymentId,
        bankTransfer: bankTransfer.id,
        createdAt: now,
        updatedAt: now,
      });

      const createTransaction = await this.transactionRepo.execute([
        this.bankTransferCommandRepo.createBankTransfer(bankTransfer),
        this.affiliateBankTransferCommandRepo.createAffiliateBankTransfer(
          affiliateBankTransfer,
        ),
      ]);

      await createTransaction.commit();

      const transferResult = await this.paymentGateway.transfer(
        CreateTransferInputModel.build({
          value: commissionAmount,
          pixAddressKey: affiliate.pixAddressKey.toString(),
          pixAddressKeyType:
            DOMAIN_TO_GATEWAY_PIX_KEY_TYPE_MAP[affiliate.pixAddressKeyType],
          description: 'Comissão de afiliado',
          externalReference: bankTransfer.id.toString(),
        }),
      );

      const updatedBankTransfer = new BankTransferEntity({
        ...bankTransfer,
        bankExternalId: transferResult.id,
        status: transferResult.status,
        transferDate: new Date(),
        updatedAt: new Date(),
      });

      const updateTransaction = await this.transactionRepo.execute([
        this.bankTransferCommandRepo.updateBankTransfer(
          bankTransfer.id,
          updatedBankTransfer,
        ),
      ]);

      await updateTransaction.commit();
    } catch (error) {
      this.logger.error('Failed to process affiliate transfer', error);
    }
  }
}
