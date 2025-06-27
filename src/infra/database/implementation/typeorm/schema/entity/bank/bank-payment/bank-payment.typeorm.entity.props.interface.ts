import type { PaymentMethodEnum } from '@core/domain/schema/entity/bank/bank-payment/enum/payment-method.enum';
import type { PaymentStatusEnum } from '@core/domain/schema/entity/bank/bank-payment/enum/payment-status.enum';
import type { BankTransferTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank/bank-transfer/bank-transfer.typeorm.entity';
import type { BaseTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity.props.interface';

export interface BankPaymentTypeormEntityPropsInterface
  extends BaseTypeormEntityPropsInterface {
  bankExternalId: string;
  paymentMethod: PaymentMethodEnum;
  value: string;
  netValue: string;
  discountPercentage: number;
  status: PaymentStatusEnum;
  dueDate: Date;
  paymentDate?: Date | null;
  installmentNumber?: number | null;
  costumerConfirmDate?: Date | null;
  pixQrCode?: string | null;
  bankTransfer: BankTransferTypeormEntity[] | undefined;
}
