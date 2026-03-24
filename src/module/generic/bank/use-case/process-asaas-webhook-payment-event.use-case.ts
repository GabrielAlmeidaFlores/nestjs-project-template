import { Inject, Injectable, Logger } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { ProcessAffiliateTransferGateway } from '@module/customer/affiliate-customer/lib/process-affiliate-transfer/process-affiliate-transfer.gateway';
import { OrganizationCreditPackPurchaseQueryRepositoryGateway } from '@module/customer/credit-pack/domain/repository/organization-credit-pack-purchase/query/organization-credit-pack-purchase.query.repository.gateway';
import { OrganizationCreditPackPurchaseEntity } from '@module/customer/credit-pack/domain/schema/entity/organization-credit-pack-purchase/organization-credit-pack-purchase.entity';
import { OrganizationCreditPurchaseCommandRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-purchase/command/organization-credit-purchase.command.repository.gateway';
import { OrganizationCreditPurchaseQueryRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-purchase/query/organization-credit-purchase.query.repository.gateway';
import { OrganizationCreditPurchaseEntity } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-purchase/organization-credit-purchase.entity';
import { OrganizationPaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/organization-payment-plan.query.repository.gateway';
import { OrganizationPaymentPlanBankPaymentCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-bank-payment/command/organization-payment-plan-bank-payment.command.repository.gateway';
import { OrganizationPaymentPlanBankPaymentQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-bank-payment/query/organization-payment-plan-bank-payment.query.repository.gateway';
import { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';
import { OrganizationPaymentPlanBankPaymentEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-bank-payment/organization-payment-plan-bank-payment.entity';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';
import { BankPaymentCommandRepositoryGateway } from '@module/generic/bank/domain/repository/bank-payment/command/bank-payment.command.repository.gateway';
import { BankPaymentQueryRepositoryGateway } from '@module/generic/bank/domain/repository/bank-payment/query/bank-payment.query.repository.gateway';
import { BankPaymentEntity } from '@module/generic/bank/domain/schema/entity/bank-payment/bank-payment.entity';
import { PaymentMethodEnum } from '@module/generic/bank/domain/schema/entity/bank-payment/enum/payment-method.enum';
import { PaymentStatusEnum } from '@module/generic/bank/domain/schema/entity/bank-payment/enum/payment-status.enum';
import { AsaasWebhookPaymentEventRequestDto } from '@module/generic/bank/dto/request/asaas-webhook-payment-event.request.dto';
import { AsaasWebhookPaymentEventResponseDto } from '@module/generic/bank/dto/response/asaas-webhook-payment-event.response.dto';

import type { GetOrganizationPaymentPlanWithRelationsQueryResult } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/result/get-organization-payment-plan-with-relations.query.result';
import type { GetBankPaymentQueryResult } from '@module/generic/bank/domain/repository/bank-payment/query/result/get-bank-payment.query.result';
import type { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

enum PaymentOriginEnum {
  MONTHLY_RECURRING_PLAN = 'MONTHLY_RECURRING_PLAN',
  YEARLY_PLAN = 'YEARLY_PLAN',
  MONTHLY_PLAN = 'MONTHLY_PLAN',
  CREDIT_PACK_PURCHASE = 'CREDIT_PACK_PURCHASE',
  UNKNOWN = 'UNKNOWN',
}

type ResolvedPaymentType =
  | { origin: PaymentOriginEnum.MONTHLY_RECURRING_PLAN }
  | { origin: PaymentOriginEnum.YEARLY_PLAN }
  | { origin: PaymentOriginEnum.MONTHLY_PLAN }
  | {
      origin: PaymentOriginEnum.CREDIT_PACK_PURCHASE;
      creditPackPurchase: OrganizationCreditPackPurchaseEntity;
    }
  | { origin: PaymentOriginEnum.UNKNOWN };

@Injectable()
export class ProcessAsaasWebhookPaymentEventUseCase {
  protected readonly _type = ProcessAsaasWebhookPaymentEventUseCase.name;
  private readonly logger: Logger;

  public constructor(
    @Inject(BankPaymentQueryRepositoryGateway)
    private readonly bankPaymentQueryRepository: BankPaymentQueryRepositoryGateway,
    @Inject(BankPaymentCommandRepositoryGateway)
    private readonly bankPaymentCommandRepository: BankPaymentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(OrganizationPaymentPlanQueryRepositoryGateway)
    private readonly organizationPaymentPlanQueryRepository: OrganizationPaymentPlanQueryRepositoryGateway,
    @Inject(OrganizationPaymentPlanBankPaymentQueryRepositoryGateway)
    private readonly organizationPaymentPlanBankPaymentQueryRepository: OrganizationPaymentPlanBankPaymentQueryRepositoryGateway,
    @Inject(OrganizationPaymentPlanBankPaymentCommandRepositoryGateway)
    private readonly organizationPaymentPlanBankPaymentCommandRepository: OrganizationPaymentPlanBankPaymentCommandRepositoryGateway,
    @Inject(OrganizationCreditPurchaseQueryRepositoryGateway)
    private readonly organizationCreditPurchaseQueryRepository: OrganizationCreditPurchaseQueryRepositoryGateway,
    @Inject(OrganizationCreditPurchaseCommandRepositoryGateway)
    private readonly organizationCreditPurchaseCommandRepository: OrganizationCreditPurchaseCommandRepositoryGateway,
    @Inject(OrganizationCreditPackPurchaseQueryRepositoryGateway)
    private readonly organizationCreditPackPurchaseQueryRepository: OrganizationCreditPackPurchaseQueryRepositoryGateway,
    @Inject(ProcessAffiliateTransferGateway)
    private readonly processAffiliateTransferGateway: ProcessAffiliateTransferGateway,
  ) {
    this.logger = new Logger(ProcessAsaasWebhookPaymentEventUseCase.name);
  }

  public async execute(
    dto: AsaasWebhookPaymentEventRequestDto,
  ): Promise<AsaasWebhookPaymentEventResponseDto> {
    const statusHandlerMap: Record<
      string,
      (dto: AsaasWebhookPaymentEventRequestDto) => Promise<void>
    > = {
      PENDING: this.onPaymentPending.bind(this),
      RECEIVED: this.onPaymentConfirmed.bind(this),
      CONFIRMED: this.onPaymentConfirmed.bind(this),
      RECEIVED_IN_CASH: this.onPaymentConfirmed.bind(this),
      OVERDUE: this.onPaymentOverdue.bind(this),
    };

    const paymentStatus = dto.payment.status;
    const handler = statusHandlerMap[paymentStatus];

    if (!handler) {
      return AsaasWebhookPaymentEventResponseDto.build({
        message: `Status ${paymentStatus} não requer processamento`,
        processed: false,
        eventId: dto.id,
        eventType: dto.event,
      });
    }

    try {
      await handler(dto);
    } catch {
      const waitTime = 5000;
      await new Promise((resolve) => setTimeout(resolve, waitTime));
      await handler(dto);
    }

    return AsaasWebhookPaymentEventResponseDto.build({
      message: `Pagamento com status ${paymentStatus} processado com sucesso`,
      processed: true,
      eventId: dto.id,
      eventType: dto.event,
    });
  }

  private async onPaymentPending(
    dto: AsaasWebhookPaymentEventRequestDto,
  ): Promise<void> {
    await this.upsertBankPayment(dto);

    if (this.isMonthlyRecurringSubscription(dto)) {
      await this.handleMonthlyRecurringPlanPayment(dto);
    }
  }

  private async onPaymentConfirmed(
    dto: AsaasWebhookPaymentEventRequestDto,
  ): Promise<void> {
    await this.upsertBankPayment(dto);

    const bankPayment =
      await this.bankPaymentQueryRepository.findOneBankPaymentByBankExternalId(
        dto.payment.id,
      );

    if (!bankPayment) {
      return;
    }

    const resolvedPayment = await this.resolvePaymentOrigin(
      dto,
      bankPayment.id,
    );

    const creditPackPurchase =
      resolvedPayment.origin === PaymentOriginEnum.CREDIT_PACK_PURCHASE
        ? resolvedPayment.creditPackPurchase
        : null;

    const confirmedHandlerMap: Record<PaymentOriginEnum, () => Promise<void>> =
      {
        [PaymentOriginEnum.MONTHLY_RECURRING_PLAN]: () =>
          this.handleMonthlyRecurringPlanPayment(dto),

        [PaymentOriginEnum.YEARLY_PLAN]: () =>
          this.handleYearlyPlanPayment(dto, bankPayment),

        [PaymentOriginEnum.MONTHLY_PLAN]: () =>
          this.handleMonthlyPlanPayment(bankPayment),

        [PaymentOriginEnum.CREDIT_PACK_PURCHASE]: () => {
          if (!creditPackPurchase) {
            return Promise.resolve();
          }
          return this.handleCreditPackPurchasePayment(
            creditPackPurchase,
            bankPayment,
          );
        },

        [PaymentOriginEnum.UNKNOWN]: () => Promise.resolve(),
      };

    await confirmedHandlerMap[resolvedPayment.origin]();
  }

  private async onPaymentOverdue(
    dto: AsaasWebhookPaymentEventRequestDto,
  ): Promise<void> {
    await this.upsertBankPayment(dto);
  }

  private async resolvePaymentOrigin(
    dto: AsaasWebhookPaymentEventRequestDto,
    bankPaymentId: BankPaymentId,
  ): Promise<ResolvedPaymentType> {
    if (this.isMonthlyRecurringSubscription(dto)) {
      return { origin: PaymentOriginEnum.MONTHLY_RECURRING_PLAN };
    }

    if (this.isYearlyInstallmentPlan(dto)) {
      return { origin: PaymentOriginEnum.YEARLY_PLAN };
    }

    const paymentPlanLink =
      await this.organizationPaymentPlanBankPaymentQueryRepository.findOneOrganizationPaymentPlanBankPaymentByBankPaymentId(
        bankPaymentId,
      );

    if (paymentPlanLink) {
      const organizationPaymentPlan =
        await this.organizationPaymentPlanQueryRepository.findOneByIdWithRelations(
          paymentPlanLink.organizationPaymentPlan,
        );

      if (organizationPaymentPlan?.cycle === PaymentPlanCycleEnum.MONTHLY) {
        return { origin: PaymentOriginEnum.MONTHLY_PLAN };
      }
    }

    const creditPackPurchase =
      await this.organizationCreditPackPurchaseQueryRepository.findOneByBankPaymentId(
        bankPaymentId,
      );

    if (creditPackPurchase) {
      return {
        origin: PaymentOriginEnum.CREDIT_PACK_PURCHASE,
        creditPackPurchase,
      };
    }

    return { origin: PaymentOriginEnum.UNKNOWN };
  }

  private isMonthlyRecurringSubscription(
    dto: AsaasWebhookPaymentEventRequestDto,
  ): boolean {
    return typeof dto.payment.subscription === 'string';
  }

  private isYearlyInstallmentPlan(
    dto: AsaasWebhookPaymentEventRequestDto,
  ): boolean {
    return typeof dto.payment.installment === 'string';
  }

  private async handleMonthlyRecurringPlanPayment(
    dto: AsaasWebhookPaymentEventRequestDto,
  ): Promise<void> {
    if (!this.isMonthlyRecurringSubscription(dto)) {
      return;
    }

    const organizationPaymentPlan =
      await this.organizationPaymentPlanQueryRepository.findOneByBankExternalIdWithRelations(
        dto.payment.subscription as string,
      );

    if (!organizationPaymentPlan) {
      return;
    }

    const bankPayment =
      await this.bankPaymentQueryRepository.findOneBankPaymentByBankExternalId(
        dto.payment.id,
      );

    if (!bankPayment) {
      return;
    }

    const alreadyCredited =
      await this.organizationCreditPurchaseQueryRepository.findOneOrganizationCreditPurchaseByBankPaymentId(
        bankPayment.id,
      );

    if (alreadyCredited) {
      return;
    }

    const creditPurchase = new OrganizationCreditPurchaseEntity({
      organization: organizationPaymentPlan.organization.id,
      bankPayment: bankPayment.id,
      creditAmount: organizationPaymentPlan.monthlyCreditAmount,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.organizationCreditPurchaseCommandRepository.createOrganizationCreditPurchase(
        creditPurchase,
      ),
    ]);
    await transaction.commit();
  }

  private async handleYearlyPlanPayment(
    dto: AsaasWebhookPaymentEventRequestDto,
    bankPayment: GetBankPaymentQueryResult,
  ): Promise<void> {
    const organizationPaymentPlan =
      await this.organizationPaymentPlanQueryRepository.findOneByIdWithRelations(
        new OrganizationPaymentPlanId(dto.payment.externalReference),
      );

    if (!organizationPaymentPlan) {
      return;
    }

    await this.ensurePaymentPlanBankPaymentLinkExists(
      organizationPaymentPlan.id,
      bankPayment,
    );

    const alreadyCreditedForThisYear =
      await this.hasExistingCreditsForPaymentPlan(organizationPaymentPlan.id);

    if (alreadyCreditedForThisYear) {
      return;
    }

    await this.grantTwelveMonthsOfCredits(organizationPaymentPlan, bankPayment);
  }

  private async handleMonthlyPlanPayment(
    bankPayment: GetBankPaymentQueryResult,
  ): Promise<void> {
    const paymentPlanLink =
      await this.organizationPaymentPlanBankPaymentQueryRepository.findOneOrganizationPaymentPlanBankPaymentByBankPaymentId(
        bankPayment.id,
      );

    if (!paymentPlanLink) {
      return;
    }

    const organizationPaymentPlan =
      await this.organizationPaymentPlanQueryRepository.findOneByIdWithRelations(
        paymentPlanLink.organizationPaymentPlan,
      );

    if (!organizationPaymentPlan) {
      return;
    }

    const alreadyCredited =
      await this.organizationCreditPurchaseQueryRepository.findOneOrganizationCreditPurchaseByBankPaymentId(
        bankPayment.id,
      );

    if (alreadyCredited) {
      return;
    }

    const creditPurchase = new OrganizationCreditPurchaseEntity({
      organization: organizationPaymentPlan.organization.id,
      bankPayment: bankPayment.id,
      creditAmount: organizationPaymentPlan.monthlyCreditAmount,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.organizationCreditPurchaseCommandRepository.createOrganizationCreditPurchase(
        creditPurchase,
      ),
    ]);
    await transaction.commit();
  }

  private async handleCreditPackPurchasePayment(
    creditPackPurchase: OrganizationCreditPackPurchaseEntity,
    bankPayment: GetBankPaymentQueryResult,
  ): Promise<void> {
    const alreadyCredited =
      await this.organizationCreditPurchaseQueryRepository.findOneOrganizationCreditPurchaseByBankPaymentId(
        bankPayment.id,
      );

    if (alreadyCredited) {
      return;
    }

    const creditPurchase = new OrganizationCreditPurchaseEntity({
      organization: creditPackPurchase.organizationId,
      bankPayment: bankPayment.id,
      creditAmount: creditPackPurchase.creditAmount,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.organizationCreditPurchaseCommandRepository.createOrganizationCreditPurchase(
        creditPurchase,
      ),
    ]);
    await transaction.commit();
  }

  private async ensurePaymentPlanBankPaymentLinkExists(
    organizationPaymentPlanId: OrganizationPaymentPlanId,
    bankPayment: GetBankPaymentQueryResult,
  ): Promise<void> {
    const existing =
      await this.organizationPaymentPlanBankPaymentQueryRepository.findOneOrganizationPaymentPlanBankPaymentByBankPaymentId(
        bankPayment.id,
      );

    if (existing) {
      return;
    }

    const newLink = new OrganizationPaymentPlanBankPaymentEntity({
      organizationPaymentPlan: organizationPaymentPlanId,
      bankPayment: bankPayment.id,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.organizationPaymentPlanBankPaymentCommandRepository.createOrganizationPaymentPlanBankPayment(
        newLink,
      ),
    ]);
    await transaction.commit();
  }

  private async hasExistingCreditsForPaymentPlan(
    organizationPaymentPlanId: OrganizationPaymentPlanId,
  ): Promise<boolean> {
    const allPaymentLinks =
      await this.organizationPaymentPlanBankPaymentQueryRepository.findManyOrganizationPaymentPlanBankPaymentByOrganizationPaymentPlanId(
        organizationPaymentPlanId,
      );

    for (const link of allPaymentLinks) {
      const existing =
        await this.organizationCreditPurchaseQueryRepository.findOneOrganizationCreditPurchaseByBankPaymentId(
          link.bankPayment,
        );

      if (existing) {
        return true;
      }
    }

    return false;
  }

  private async grantTwelveMonthsOfCredits(
    organizationPaymentPlan: GetOrganizationPaymentPlanWithRelationsQueryResult,
    bankPayment: GetBankPaymentQueryResult,
  ): Promise<void> {
    const now = new Date();
    const monthsInYear = 12;

    const creditPurchaseTransactions = Array.from(
      { length: monthsInYear },
      (_, month) => {
        const validFrom = new Date(now);
        validFrom.setMonth(now.getMonth() + month);
        validFrom.setHours(0, 0, 0, 0);

        return this.organizationCreditPurchaseCommandRepository.createOrganizationCreditPurchase(
          new OrganizationCreditPurchaseEntity({
            organization: organizationPaymentPlan.organization.id,
            bankPayment: bankPayment.id,
            creditAmount: organizationPaymentPlan.monthlyCreditAmount,
            validFrom,
          }),
        );
      },
    );

    const markPaymentConfirmed =
      this.bankPaymentCommandRepository.updateBankPayment(
        bankPayment.id,
        new BankPaymentEntity({
          ...bankPayment,
          status: PaymentStatusEnum.CONFIRMED,
        }),
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      ...creditPurchaseTransactions,
      markPaymentConfirmed,
    ]);
    await transaction.commit();
  }

  private parseDateWithoutTimezoneAdjustment(dateString: string): Date {
    const date = new Date(dateString);
    const millisecondsInMinute = 60000;
    const userTimezoneOffset = date.getTimezoneOffset() * millisecondsInMinute;
    return new Date(date.getTime() + userTimezoneOffset);
  }

  private async upsertBankPayment(
    dto: AsaasWebhookPaymentEventRequestDto,
  ): Promise<void> {
    const bankExternalId = dto.payment.id;

    const existingPayment =
      await this.bankPaymentQueryRepository.findOneBankPaymentByBankExternalId(
        bankExternalId,
      );

    const billingTypeMap: Record<string, PaymentMethodEnum> = {
      PIX: PaymentMethodEnum.PIX,
      BOLETO: PaymentMethodEnum.BOLETO,
      CREDIT_CARD: PaymentMethodEnum.CREDIT_CARD,
      UNDEFINED: PaymentMethodEnum.UNDEFINED,
    };

    const paymentMethod =
      billingTypeMap[dto.payment.billingType] ?? PaymentMethodEnum.UNDEFINED;

    const statusMap: Record<string, PaymentStatusEnum> = {
      PENDING: PaymentStatusEnum.PENDING,
      CONFIRMED: PaymentStatusEnum.CONFIRMED,
      OVERDUE: PaymentStatusEnum.OVERDUE,
      REFUNDED: PaymentStatusEnum.REFUNDED,
      RECEIVED: PaymentStatusEnum.CONFIRMED,
      RECEIVED_IN_CASH: PaymentStatusEnum.CONFIRMED,
    };

    const status = statusMap[dto.payment.status] ?? PaymentStatusEnum.PENDING;

    const paymentDate =
      typeof dto.payment.paymentDate === 'string'
        ? this.parseDateWithoutTimezoneAdjustment(dto.payment.paymentDate)
        : null;

    const clientPaymentDate =
      typeof dto.payment.clientPaymentDate === 'string'
        ? this.parseDateWithoutTimezoneAdjustment(dto.payment.clientPaymentDate)
        : null;

    const paymentReceipt =
      status === PaymentStatusEnum.CONFIRMED ? dto.payment.invoiceUrl : null;

    if (existingPayment) {
      const transaction = await this.baseTransactionRepositoryGateway.execute([
        this.bankPaymentCommandRepository.updateBankPayment(
          existingPayment.id,
          new BankPaymentEntity({
            ...existingPayment,
            status,
            paymentMethod,
            paymentReceipt,
            description: dto.payment.description,
            paymentDate: paymentDate ?? clientPaymentDate,
            bankSlipUrl: dto.payment.bankSlipUrl ?? null,
          }),
        ),
      ]);
      await transaction.commit();
      return;
    }

    const newPayment = new BankPaymentEntity({
      bankExternalId,
      paymentMethod,
      paymentReceipt,
      amount: new DecimalValue(dto.payment.value),
      status,
      dueDate: this.parseDateWithoutTimezoneAdjustment(dto.payment.dueDate),
      paymentDate: paymentDate ?? clientPaymentDate,
      installmentNumber: dto.payment.installmentNumber ?? null,
      description: dto.payment.description,
      bankSlipUrl: dto.payment.bankSlipUrl ?? null,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.bankPaymentCommandRepository.createBankPayment(newPayment),
    ]);
    await transaction.commit();

    if (this.isMonthlyRecurringSubscription(dto)) {
      await this.linkNewPaymentToMonthlyRecurringPlan(dto, newPayment);
    }
  }

  private async linkNewPaymentToMonthlyRecurringPlan(
    dto: AsaasWebhookPaymentEventRequestDto,
    newPayment: BankPaymentEntity,
  ): Promise<void> {
    const organizationPaymentPlan =
      await this.organizationPaymentPlanQueryRepository.findOneByBankExternalId(
        dto.payment.subscription as string,
      );

    if (!organizationPaymentPlan) {
      return;
    }

    const alreadyLinked =
      await this.organizationPaymentPlanBankPaymentQueryRepository.findOneOrganizationPaymentPlanBankPaymentByBankPaymentId(
        newPayment.id,
      );

    if (alreadyLinked) {
      return;
    }

    const link = new OrganizationPaymentPlanBankPaymentEntity({
      organizationPaymentPlan: organizationPaymentPlan.id,
      bankPayment: newPayment.id,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.organizationPaymentPlanBankPaymentCommandRepository.createOrganizationPaymentPlanBankPayment(
        link,
      ),
    ]);
    await transaction.commit();

    this.processAffiliateTransferGateway
      .process(newPayment.id, organizationPaymentPlan.id, newPayment.amount)
      .catch((err) =>
        this.logger.error('Failed to process affiliate transfer', err),
      );
  }
}
