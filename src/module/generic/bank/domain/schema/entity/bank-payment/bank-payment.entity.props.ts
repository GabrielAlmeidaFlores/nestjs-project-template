import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { PaymentMethodEnum } from '@module/generic/bank/domain/schema/entity/bank-payment/enum/payment-method.enum';
import type { PaymentStatusEnum } from '@module/generic/bank/domain/schema/entity/bank-payment/enum/payment-status.enum';
import type { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';

export interface BankPaymentEntityPropsInterface
  extends BaseEntityPropsInterface<BankPaymentId> {
  bankExternalId: string;
  paymentMethod: PaymentMethodEnum;
  amount: DecimalValue;
  status: PaymentStatusEnum;
  dueDate: Date;
  paymentDate?: Date | null;
  installmentNumber?: number | null;
  pixQrCode?: Base64 | null;
  pixCopyPaste?: string | null;
}
