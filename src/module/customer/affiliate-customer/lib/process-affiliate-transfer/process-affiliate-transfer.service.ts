import { Inject, Injectable, Logger } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { PixAddressKeyTypeEnum as GatewayPixAddressKeyTypeEnum } from '@infra/payment-gateway/enum/pix-address-key-type.enum';
import { CreateTransferInputModel } from '@infra/payment-gateway/model/input/create-transfer.input.model';
import { PaymentGateway } from '@infra/payment-gateway/payment-gateway.gateway';
import { AffiliateBankTransferCommandRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-bank-transfer/command/affiliate-bank-transfer.command.repository.gateway';
import { AffiliateBankTransferQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-bank-transfer/query/affiliate-bank-transfer.query.repository.gateway';
import { AffiliateCustomerQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer/query/affiliate-customer.query.repository.gateway';
import { AffiliateCustomerConfigQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-config/query/affiliate-customer-config.query.repository.gateway';
import { AffiliateBankTransferEntity } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-bank-transfer/affiliate-bank-transfer.entity';
import { PixAddressKeyTypeEnum } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/enum/pix-address-key-type.enum';
import { AffiliateCustomerConfigConfigEnum } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/enum/affiliate-customer-config-config.enum';
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
    @Inject(AffiliateBankTransferQueryRepositoryGateway)
    private readonly affiliateBankTransferQueryRepo: AffiliateBankTransferQueryRepositoryGateway,
    @Inject(BankTransferCommandRepositoryGateway)
    private readonly bankTransferCommandRepo: BankTransferCommandRepositoryGateway,
    @Inject(AffiliateBankTransferCommandRepositoryGateway)
    private readonly affiliateBankTransferCommandRepo: AffiliateBankTransferCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly transactionRepo: BaseTransactionRepositoryGateway,
    @Inject(PaymentGateway)
    private readonly paymentGateway: PaymentGateway,
    @Inject(AffiliateCustomerConfigQueryRepositoryGateway)
    private readonly configQueryRepo: AffiliateCustomerConfigQueryRepositoryGateway,
  ) {
    this.logger = new Logger(ProcessAffiliateTransferService.name);
  }

  public async process(
    bankPaymentId: BankPaymentId,
    organizationPaymentPlanId: OrganizationPaymentPlanId,
    paymentAmount: DecimalValue,
  ): Promise<void> {
    try {
      // Idempotência: garante que só existe uma transferência por pagamento
      const existingTransfer =
        await this.affiliateBankTransferQueryRepo.findOneByBankPaymentId(
          bankPaymentId,
        );

      if (existingTransfer !== null) {
        return;
      }

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

      const scheduleDate = await this.resolveScheduleDate();

      const transferResult = await this.paymentGateway.transfer(
        CreateTransferInputModel.build({
          value: commissionAmount,
          pixAddressKey: affiliate.pixAddressKey.toString(),
          pixAddressKeyType:
            DOMAIN_TO_GATEWAY_PIX_KEY_TYPE_MAP[affiliate.pixAddressKeyType],
          description: 'Comissão de afiliado',
          externalReference: bankTransfer.id.toString(),
          ...(scheduleDate !== undefined && { scheduleDate }),
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

  private async resolveScheduleDate(): Promise<string | undefined> {
    const config = await this.configQueryRepo.findOneByConfig(
      AffiliateCustomerConfigConfigEnum.TRANSFER_DAY_OF_MONTH,
    );

    if (config === null) {
      return undefined;
    }

    const configuredDay = parseInt(config.value, 10);

    if (isNaN(configuredDay)) {
      return undefined;
    }

    return this.nextOccurrenceOfDay(configuredDay);
  }

  private nextOccurrenceOfDay(day: number): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const year = tomorrow.getFullYear();
    const month = tomorrow.getMonth();

    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const targetDayCurrentMonth = Math.min(day, daysInCurrentMonth);

    if (tomorrow.getDate() <= targetDayCurrentMonth) {
      return this.formatDate(year, month, targetDayCurrentMonth);
    }

    const nextMonthDate = new Date(year, month + 1, 1);
    const nextMonth = nextMonthDate.getMonth();
    const nextYear = nextMonthDate.getFullYear();
    const daysInNextMonth = new Date(nextYear, nextMonth + 1, 0).getDate();
    const targetDayNextMonth = Math.min(day, daysInNextMonth);

    return this.formatDate(nextYear, nextMonth, targetDayNextMonth);
  }

  private formatDate(year: number, month: number, day: number): string {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');

    return `${year}-${mm}-${dd}`;
  }
}
