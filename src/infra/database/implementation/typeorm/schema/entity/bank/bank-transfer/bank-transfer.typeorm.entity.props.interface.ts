import type { TransferMethodEnum } from '@core/domain/schema/entity/bank/bank-transfer/enum/transfer-method.enum';
import type { TransferStatusEnum } from '@core/domain/schema/entity/bank/bank-transfer/enum/transfer-status.enum';
import type { BankPaymentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bank/bank-payment/bank-payment.typeorm.entity';
import type { BaseTypeormEntityPropsInterface } from '@infra/database/implementation/typeorm/schema/entity/base/base/base.typeorm.entity.props.interface';

export interface BankTransferTypeormEntityPropsInterface
  extends BaseTypeormEntityPropsInterface {
  bankExternalId: string;
  description: string;
  transferMethod: TransferMethodEnum;
  value: string;
  netValue: string;
  status: TransferStatusEnum;
  effectiveDate?: Date | null;
  scheduleDate?: Date | null;
  failReason?: string | null;
  bankPayment: BankPaymentTypeormEntity;
}
