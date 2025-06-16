import type { PaymentMethodEnum } from '@core/domain/schema/entity/bank/bank-payment/enum/payment-method.enum';
import type { StatusEnum } from '@core/domain/schema/entity/bank/bank-payment/enum/payment-status.enum';
import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';

export interface BankPaymentEntityPropsInterface
  extends BaseEntityPropsInterface {
  bankExternalId: string;
  paymentMethod: PaymentMethodEnum;
  value: string;
  netValue: string;
  discountPercentage: number;
  status: StatusEnum;
  dueDate: Date;
  paymentDate: Date;
  installmentNumber: number;
  costumerConfirmDate: Date | null;
  pixQrCode: string;
}
