import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { BankPaymentCommandRepositoryGateway } from '@module/generic/bank/domain/repository/bank-payment/command/bank-payment.command.repository.gateway';
import { BankPaymentQueryRepositoryGateway } from '@module/generic/bank/domain/repository/bank-payment/query/bank-payment.query.repository.gateway';
import { BankPaymentEntity } from '@module/generic/bank/domain/schema/entity/bank-payment/bank-payment.entity';
import { PaymentMethodEnum } from '@module/generic/bank/domain/schema/entity/bank-payment/enum/payment-method.enum';
import { PaymentStatusEnum } from '@module/generic/bank/domain/schema/entity/bank-payment/enum/payment-status.enum';
import { AsaasWebhookPaymentEventRequestDto } from '@module/generic/bank/dto/request/asaas-webhook-payment-event.request.dto';
import { AsaasWebhookPaymentEventResponseDto } from '@module/generic/bank/dto/response/asaas-webhook-payment-event.response.dto';

type EventProcessorType = (
  dto: AsaasWebhookPaymentEventRequestDto,
) => Promise<void>;

@Injectable()
export class ProcessAsaasWebhookPaymentEventUseCase {
  protected readonly _type = ProcessAsaasWebhookPaymentEventUseCase.name;

  private statusProcessorFactory: Record<string, EventProcessorType>;

  public constructor(
    @Inject(BankPaymentQueryRepositoryGateway)
    private readonly bankPaymentQueryRepository: BankPaymentQueryRepositoryGateway,
    @Inject(BankPaymentCommandRepositoryGateway)
    private readonly bankPaymentCommandRepository: BankPaymentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {
    this.statusProcessorFactory = {
      PENDING: this.processPaymentPending.bind(this),
      RECEIVED: this.processPaymentReceived.bind(this),
      CONFIRMED: this.processPaymentConfirmed.bind(this),
      OVERDUE: this.processPaymentOverdue.bind(this),
    };
  }

  public async execute(
    dto: AsaasWebhookPaymentEventRequestDto,
  ): Promise<AsaasWebhookPaymentEventResponseDto> {
    const paymentStatus = dto.payment.status;
    const processor = this.statusProcessorFactory[paymentStatus];

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
      RECEIVED: PaymentStatusEnum.RECEIVED,
      CONFIRMED: PaymentStatusEnum.RECEIVED,
      OVERDUE: PaymentStatusEnum.OVERDUE,
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
    }
  }

  private async processPaymentPending(
    dto: AsaasWebhookPaymentEventRequestDto,
  ): Promise<void> {
    await this.upsertBankPayment(dto);
  }

  private async processPaymentReceived(
    dto: AsaasWebhookPaymentEventRequestDto,
  ): Promise<void> {
    await this.upsertBankPayment(dto);
  }

  private async processPaymentConfirmed(
    dto: AsaasWebhookPaymentEventRequestDto,
  ): Promise<void> {
    await this.upsertBankPayment(dto);
  }

  private async processPaymentOverdue(
    dto: AsaasWebhookPaymentEventRequestDto,
  ): Promise<void> {
    await this.upsertBankPayment(dto);
  }
}
