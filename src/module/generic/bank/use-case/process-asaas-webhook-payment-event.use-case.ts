import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { OrganizationCreditPurchaseCommandRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-purchase/command/organization-credit-purchase.command.repository.gateway';
import { OrganizationCreditPurchaseQueryRepositoryGateway } from '@module/customer/organization-credit/domain/repository/organization-credit-purchase/query/organization-credit-purchase.query.repository.gateway';
import { OrganizationCreditPurchaseEntity } from '@module/customer/organization-credit/domain/schema/entity/organization-credit-purchase/organization-credit-purchase.entity';
import { OrganizationPaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/organization-payment-plan.query.repository.gateway';
import { OrganizationPaymentPlanBankPaymentCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-bank-payment/command/organization-payment-plan-bank-payment.command.repository.gateway';
import { OrganizationPaymentPlanBankPaymentQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan-bank-payment/query/organization-payment-plan-bank-payment.query.repository.gateway';
import { OrganizationPaymentPlanBankPaymentEntity } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan-bank-payment/organization-payment-plan-bank-payment.entity';
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

    await processor(dto);

    return AsaasWebhookPaymentEventResponseDto.build({
      message: `Pagamento com status ${paymentStatus} processado com sucesso`,
      processed: true,
      eventId: dto.id,
      eventType: dto.event,
    });
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
    };

    const status = statusMap[dto.payment.status] ?? PaymentStatusEnum.PENDING;

    if (existingPayment) {
      const updateTransaction =
        this.bankPaymentCommandRepository.updateBankPayment(
          existingPayment.id,
          new BankPaymentEntity({
            ...existingPayment,
            status,
            paymentMethod,
            paymentDate:
              dto.payment.paymentDate !== null &&
              dto.payment.paymentDate !== undefined
                ? new Date(dto.payment.paymentDate)
                : null,
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
        amount: new DecimalValue(dto.payment.value),
        status,
        dueDate: new Date(dto.payment.dueDate),
        paymentDate:
          dto.payment.paymentDate !== null &&
          dto.payment.paymentDate !== undefined
            ? new Date(dto.payment.paymentDate)
            : null,
        installmentNumber: dto.payment.installmentNumber ?? null,
      });

      const createTransaction =
        this.bankPaymentCommandRepository.createBankPayment(newPayment);

      const transaction = await this.baseTransactionRepositoryGateway.execute([
        createTransaction,
      ]);
      await transaction.commit();

      if (
        dto.payment.subscription !== null &&
        dto.payment.subscription !== undefined
      ) {
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
  }

  private async processPaymentConfirmed(
    dto: AsaasWebhookPaymentEventRequestDto,
  ): Promise<void> {
    await this.upsertBankPayment(dto);

    if (
      dto.payment.subscription !== null &&
      dto.payment.subscription !== undefined
    ) {
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
              creditAmount:
                organizationPaymentPlan.paymentPlan.monthlyCreditAmount,
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
  }

  private async processPaymentOverdue(
    dto: AsaasWebhookPaymentEventRequestDto,
  ): Promise<void> {
    await this.upsertBankPayment(dto);
  }
}
