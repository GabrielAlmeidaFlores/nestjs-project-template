import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { PaymentMethod } from '@core/domain/schema/value-object/payment-method/payment-method.value-object';
import type { Status } from '@core/domain/schema/value-object/status/status.value-object';

export interface BankPaymentEntityPropsInterface
  extends BaseEntityPropsInterface {
  bankExternalId: string;
  paymentMethod: PaymentMethod;
  value: DecimalValue;
  netValue: DecimalValue;
  discountPercentage: number;
  status: Status;
  dueDate: Date;
  paymentDate?: Date | null;
  installmentNumber?: number | null;
  costumerConfirmDate?: Date | null;
  pixQrCode?: string | null;
}
