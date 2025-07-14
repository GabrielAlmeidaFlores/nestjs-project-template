import type { BankPaymentEntity } from '@core/domain/schema/entity/bank/bank-payment/bank-payment.entity';
import type { TransferMethodEnum } from '@core/domain/schema/entity/bank/bank-transfer/enum/transfer-method.enum';
import type { TransferStatusEnum } from '@core/domain/schema/entity/bank/bank-transfer/enum/transfer-status.enum';
import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';

export interface BankTransferEntityPropsInterface
  extends BaseEntityPropsInterface {
  bankExternalId: string;
  description: string;
  transferMethod: TransferMethodEnum;
  value: DecimalValue;
  netValue: DecimalValue;
  status: TransferStatusEnum;
  effectiveDate?: Date | null;
  scheduleDate?: Date | null;
  failReason?: string | null;
  bankPayment: BankPaymentEntity;
}
