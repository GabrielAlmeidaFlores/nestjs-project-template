import type { PaymentMethodEnum } from '@core/domain/schema/entity/bank/bank-payment/enum/payment-method.enum';
import type { PaymentStatusEnum } from '@core/domain/schema/entity/bank/bank-payment/enum/payment-status.enum';
import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';

export interface BankPaymentEntityPropsInterface
  extends BaseEntityPropsInterface {
  bankExternalId: string;
  paymentMethod: PaymentMethodEnum;
  value: DecimalValue;
  netValue: DecimalValue;
  discountPercentage: number;
  status: PaymentStatusEnum;
  dueDate: Date;
  paymentDate: Date | null;
  installmentNumber: number | null;
  costumerConfirmDate: Date | null;
  pixQrCode: string | null;
}
