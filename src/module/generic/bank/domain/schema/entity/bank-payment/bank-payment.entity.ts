import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

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
  }
}
