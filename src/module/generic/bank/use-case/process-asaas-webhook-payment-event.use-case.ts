import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
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

@Injectable()
export class ProcessAsaasWebhookPaymentEventUseCase {
  protected readonly _type = ProcessAsaasWebhookPaymentEventUseCase.name;

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
  ) {}

  public async execute(
    dto: AsaasWebhookPaymentEventRequestDto,
  ): Promise<AsaasWebhookPaymentEventResponseDto> {
    const statusProcessorFactory: Record<
      string,
      (dto: AsaasWebhookPaymentEventRequestDto) => Promise<void>
    > = {
      PENDING: this.processPaymentPending.bind(this),
      RECEIVED: this.processPaymentConfirmed.bind(this),
      CONFIRMED: this.processPaymentConfirmed.bind(this),
      RECEIVED_IN_CASH: this.processPaymentConfirmed.bind(this),
      OVERDUE: this.processPaymentOverdue.bind(this),
    };

    const paymentStatus = dto.payment.status;
    const processor = statusProcessorFactory[paymentStatus];

    if (!processor) {
      return AsaasWebhookPaymentEventResponseDto.build({
        message: `Status ${paymentStatus} não requer processamento`,
        processed: false,
        eventId: dto.id,
        eventType: dto.event,
      });
    }

    try {
      await processor(dto);
    } catch {
      const waitTime = 5000;
      await new Promise((resolve) => setTimeout(resolve, waitTime));
      await processor(dto);
    }

    return AsaasWebhookPaymentEventResponseDto.build({
      message: `Pagamento com status ${paymentStatus} processado com sucesso`,
      processed: true,
      eventId: dto.id,
      eventType: dto.event,
    });
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
      const updateTransaction =
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
        );

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        updateTransaction,
      ]);
      await transaction.commit();
    } else {
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

      const createTransaction =
        this.bankPaymentCommandRepository.createBankPayment(newPayment);

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        createTransaction,
      ]);
      await transaction.commit();

      if (typeof dto.payment.subscription === 'string') {
        const organizationPaymentPlan =
          await this.organizationPaymentPlanQueryRepository.findOneByBankExternalId(
            dto.payment.subscription,
          );

        if (organizationPaymentPlan) {
          const existingRelation =
            await this.organizationPaymentPlanBankPaymentQueryRepository.findOneOrganizationPaymentPlanBankPaymentByBankPaymentId(
              newPayment.id,
            );

          if (!existingRelation) {
            const relation = new OrganizationPaymentPlanBankPaymentEntity({
              organizationPaymentPlan: organizationPaymentPlan.id,
              bankPayment: newPayment.id,
            });

            const createRelationTransaction =
              this.organizationPaymentPlanBankPaymentCommandRepository.createOrganizationPaymentPlanBankPayment(
                relation,
              );

            const relationTransaction =
              await this.baseTransactionRepositoryGateway.execute([
                createRelationTransaction,
              ]);
            await relationTransaction.commit();
          }
        }
      }
    }
  }

  private async processPaymentPending(
    dto: AsaasWebhookPaymentEventRequestDto,
  ): Promise<void> {
    await this.upsertBankPayment(dto);

    if (typeof dto.payment.subscription === 'string') {
      await this.processPaymentFromMonthlyRecurringPaymentPlan(dto);
      return;
    }
  }

  private async processPaymentConfirmed(
    dto: AsaasWebhookPaymentEventRequestDto,
  ): Promise<void> {
    await this.upsertBankPayment(dto);

    if (typeof dto.payment.subscription === 'string') {
      await this.processPaymentFromMonthlyRecurringPaymentPlan(dto);
      return;
    }

    if (typeof dto.payment.installment === 'string') {
      await this.processPaymentFromYearlyPaymentPlan(dto);
      return;
    }

    const bankPayment =
      await this.bankPaymentQueryRepository.findOneBankPaymentByBankExternalId(
        dto.payment.id,
      );

    if (bankPayment === null) {
      return;
    }

    const organizationPaymentPlanBank =
      await this.organizationPaymentPlanBankPaymentQueryRepository.findOneOrganizationPaymentPlanBankPaymentByBankPaymentId(
        bankPayment.id,
      );

    if (organizationPaymentPlanBank !== null) {
      const organizationPaymentPlan =
        await this.organizationPaymentPlanQueryRepository.findOneByIdWithRelations(
          organizationPaymentPlanBank.organizationPaymentPlan,
        );

      if (organizationPaymentPlan?.cycle === PaymentPlanCycleEnum.MONTHLY) {
        await this.processPaymentFromMonthlyPaymentPlan(dto);
        return;
      }
    }
  }

  private async processPaymentFromYearlyPaymentPlan(
    dto: AsaasWebhookPaymentEventRequestDto,
  ): Promise<void> {
    if (typeof dto.payment.installment !== 'string') {
      return;
    }

    const bankPayment =
      await this.bankPaymentQueryRepository.findOneBankPaymentByBankExternalId(
        dto.payment.id,
      );

    if (!bankPayment) {
      return;
    }

    const organizationPaymentPlan =
      await this.organizationPaymentPlanQueryRepository.findOneByIdWithRelations(
        new OrganizationPaymentPlanId(dto.payment.externalReference),
      );

    if (!organizationPaymentPlan) {
      return;
    }

    const organizationPaymentPlanBank =
      await this.organizationPaymentPlanBankPaymentQueryRepository.findOneOrganizationPaymentPlanBankPaymentByBankPaymentId(
        bankPayment.id,
      );

    if (!organizationPaymentPlanBank) {
      const newRelation = new OrganizationPaymentPlanBankPaymentEntity({
        organizationPaymentPlan: organizationPaymentPlan.id,
        bankPayment: bankPayment.id,
      });

      const createRelationTransaction =
        this.organizationPaymentPlanBankPaymentCommandRepository.createOrganizationPaymentPlanBankPayment(
          newRelation,
        );

      const relationTransaction =
        await this.baseTransactionRepositoryGateway.execute([
          createRelationTransaction,
        ]);
      await relationTransaction.commit();
    }

    const allPaymentRelations =
      await this.organizationPaymentPlanBankPaymentQueryRepository.findManyOrganizationPaymentPlanBankPaymentByOrganizationPaymentPlanId(
        organizationPaymentPlan.id,
      );

    const allBankPaymentIds = allPaymentRelations.map((pr) => pr.bankPayment);

    let hasExistingCredits = false;
    for (const paymentId of allBankPaymentIds) {
      const existingCreditPurchase =
        await this.organizationCreditPurchaseQueryRepository.findOneOrganizationCreditPurchaseByBankPaymentId(
          paymentId,
        );
      if (existingCreditPurchase) {
        hasExistingCredits = true;
        break;
      }
    }

    if (hasExistingCredits) {
      return;
    }

    const now = new Date();
    const creditPurchaseTransactions = [];
    const monthsInYear = 12;

    for (let month = 0; month < monthsInYear; month++) {
      const validFromDate = new Date(now);
      validFromDate.setMonth(now.getMonth() + month);
      validFromDate.setHours(0, 0, 0, 0);

      const creditPurchase = new OrganizationCreditPurchaseEntity({
        organization: organizationPaymentPlan.organization.id,
        bankPayment: bankPayment.id,
        creditAmount: organizationPaymentPlan.monthlyCreditAmount,
        validFrom: validFromDate,
      });

      const createCreditPurchaseTransaction =
        this.organizationCreditPurchaseCommandRepository.createOrganizationCreditPurchase(
          creditPurchase,
        );

      creditPurchaseTransactions.push(createCreditPurchaseTransaction);
    }

    const updatedBankPayment = new BankPaymentEntity({
      ...bankPayment,
      status: PaymentStatusEnum.CONFIRMED,
    });

    const updateBankPaymentTransaction =
      this.bankPaymentCommandRepository.updateBankPayment(
        bankPayment.id,
        updatedBankPayment,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      ...creditPurchaseTransactions,
      updateBankPaymentTransaction,
    ]);
    await transaction.commit();
  }

  private async processPaymentFromMonthlyPaymentPlan(
    dto: AsaasWebhookPaymentEventRequestDto,
  ): Promise<void> {
    const bankPayment =
      await this.bankPaymentQueryRepository.findOneBankPaymentByBankExternalId(
        dto.payment.id,
      );

    if (!bankPayment) {
      return;
    }

    const organizationPaymentPlanBank =
      await this.organizationPaymentPlanBankPaymentQueryRepository.findOneOrganizationPaymentPlanBankPaymentByBankPaymentId(
        bankPayment.id,
      );

    if (!organizationPaymentPlanBank) {
      return;
    }

    const organizationPaymentPlan =
      await this.organizationPaymentPlanQueryRepository.findOneByIdWithRelations(
        organizationPaymentPlanBank.organizationPaymentPlan,
      );

    if (organizationPaymentPlan) {
      const existingCreditPurchase =
        await this.organizationCreditPurchaseQueryRepository.findOneOrganizationCreditPurchaseByBankPaymentId(
          bankPayment.id,
        );

      if (!existingCreditPurchase) {
        const creditPurchase = new OrganizationCreditPurchaseEntity({
          organization: organizationPaymentPlan.organization.id,
          bankPayment: bankPayment.id,
          creditAmount: organizationPaymentPlan.monthlyCreditAmount,
        });

        const createCreditPurchaseTransaction =
          this.organizationCreditPurchaseCommandRepository.createOrganizationCreditPurchase(
            creditPurchase,
          );

        const transaction = await this.baseTransactionRepositoryGateway.execute(
          [createCreditPurchaseTransaction],
        );
        await transaction.commit();
      }
    }
  }

  private async processPaymentFromMonthlyRecurringPaymentPlan(
    dto: AsaasWebhookPaymentEventRequestDto,
  ): Promise<void> {
    if (typeof dto.payment.subscription !== 'string') {
      return;
    }

    const organizationPaymentPlan =
      await this.organizationPaymentPlanQueryRepository.findOneByBankExternalIdWithRelations(
        dto.payment.subscription,
      );

    if (organizationPaymentPlan) {
      const bankPayment =
        await this.bankPaymentQueryRepository.findOneBankPaymentByBankExternalId(
          dto.payment.id,
        );

      if (bankPayment) {
        const existingCreditPurchase =
          await this.organizationCreditPurchaseQueryRepository.findOneOrganizationCreditPurchaseByBankPaymentId(
            bankPayment.id,
          );

        if (!existingCreditPurchase) {
          const creditPurchase = new OrganizationCreditPurchaseEntity({
            organization: organizationPaymentPlan.organization.id,
            bankPayment: bankPayment.id,
            creditAmount: organizationPaymentPlan.monthlyCreditAmount,
          });

          const createCreditPurchaseTransaction =
            this.organizationCreditPurchaseCommandRepository.createOrganizationCreditPurchase(
              creditPurchase,
            );

          const transaction =
            await this.baseTransactionRepositoryGateway.execute([
              createCreditPurchaseTransaction,
            ]);
          await transaction.commit();
        }
      }
    }
  }

  private async processPaymentOverdue(
    dto: AsaasWebhookPaymentEventRequestDto,
  ): Promise<void> {
    await this.upsertBankPayment(dto);
  }
}
