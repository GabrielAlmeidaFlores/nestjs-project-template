import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { BankPaymentEntityPropsInterface } from '@module/generic/bank/domain/schema/entity/bank-payment/bank-payment.entity.props';
import type { PaymentMethodEnum } from '@module/generic/bank/domain/schema/entity/bank-payment/enum/payment-method.enum';
import type { PaymentStatusEnum } from '@module/generic/bank/domain/schema/entity/bank-payment/enum/payment-status.enum';

export class BankPaymentEntity extends BaseEntity<BankPaymentId> {
  @Description('ID externo do pagamento no banco')
  public readonly bankExternalId: string;

  @Description('Método de pagamento utilizado')
  public readonly paymentMethod: PaymentMethodEnum;

  @Description('Valor do pagamento')
  public readonly amount: DecimalValue;

  @Description('Status atual do pagamento')
  public readonly status: PaymentStatusEnum;

  @Description('Data de vencimento do pagamento')
  public readonly dueDate: Date;

  @Description('Data em que o pagamento foi efetuado')
  public readonly paymentDate: Date | null;

  @Description('Número da parcela, se aplicável')
  public readonly installmentNumber: number | null;

  @Description('QR Code PIX em Base64')
  public readonly pixQrCode: Base64 | null;

  @Description('Código copia e cola do PIX')
  public readonly pixCopyPaste: string | null;

  @Description('URL do boleto bancário')
  public readonly bankSlipUrl: string | null;

  @Description('Código do boleto bancário (linha digitável)')
  public readonly bankSlipCode: string | null;

  @Description('Descrição do pagamento')
  public readonly description: string | null;

  @Description('Comprovante do pagamento')
  public readonly paymentReceipt: string | null;

  protected readonly _type = BankPaymentEntity.name;

  public constructor(props: BankPaymentEntityPropsInterface) {
    super(BankPaymentId, props);

    this.bankExternalId = props.bankExternalId;
    this.paymentMethod = props.paymentMethod;
    this.amount = props.amount;
    this.status = props.status;
    this.dueDate = props.dueDate;
    this.paymentDate = props.paymentDate ?? null;
    this.installmentNumber = props.installmentNumber ?? null;
    this.pixQrCode = props.pixQrCode ?? null;
    this.pixCopyPaste = props.pixCopyPaste ?? null;
    this.bankSlipUrl = props.bankSlipUrl ?? null;
    this.bankSlipCode = props.bankSlipCode ?? null;
    this.description = props.description ?? null;
    this.paymentReceipt = props.paymentReceipt ?? null;
  }
}
