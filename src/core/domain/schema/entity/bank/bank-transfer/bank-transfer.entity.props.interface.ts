import type { BankPaymentEntity } from '@core/domain/schema/entity/bank/bank-payment/bank-payment.entity';
import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { Status } from '@core/domain/schema/value-object/status/status.value-object';
import type { TransferMethod } from '@core/domain/schema/value-object/transfer-method/transfer-method.value-object';

export interface BankTransferEntityPropsInterface
  extends BaseEntityPropsInterface {
  bankExternalId: string;
  description: string;
  transferMethod: TransferMethod;
  value: DecimalValue;
  netValue: DecimalValue;
  status: Status;
  effectiveDate?: Date | null;
  scheduleDate?: Date | null;
  failReason?: string | null;
  bankPayment: BankPaymentEntity;
}
