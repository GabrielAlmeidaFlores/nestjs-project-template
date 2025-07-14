import { BaseAuditableEntity } from '@core/domain/schema/entity/base/base-auditable/base-auditable.entity';

import type { BankPaymentEntityPropsInterface } from '@core/domain/schema/entity/bank/bank-payment/bank-payment.entity.props.interface';
import type { PaymentMethodEnum } from '@core/domain/schema/entity/bank/bank-payment/enum/payment-method.enum';
import type { PaymentStatusEnum } from '@core/domain/schema/entity/bank/bank-payment/enum/payment-status.enum';
import type { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';

export class BankPaymentEntity extends BaseAuditableEntity<CustomerEntity> {
  public readonly bankExternalId: string;
  public readonly paymentMethod: PaymentMethodEnum;
  public readonly value: DecimalValue;
  public readonly netValue: DecimalValue;
  public readonly discountPercentage: number;
  public readonly status: PaymentStatusEnum;
  public readonly dueDate: Date;
  public readonly paymentDate: Date | null;
  public readonly installmentNumber: number | null;
  public readonly costumerConfirmDate: Date | null;
  public readonly pixQrCode: string | null;

  protected readonly _type = BankPaymentEntity.name;

  public constructor(props: BankPaymentEntityPropsInterface) {
    super(props);

    this.bankExternalId = props.bankExternalId;
    this.paymentMethod = props.paymentMethod;
    this.value = props.value;
    this.netValue = props.netValue;
    this.discountPercentage = props.discountPercentage;
    this.status = props.status;
    this.dueDate = props.dueDate;
    this.paymentDate = props.paymentDate ?? null;
    this.installmentNumber = props.installmentNumber ?? null;
    this.costumerConfirmDate = props.costumerConfirmDate ?? null;
    this.pixQrCode = props.pixQrCode ?? null;
  }
}
