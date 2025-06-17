import type { TransferMethodEnum } from '@core/domain/schema/entity/bank/bank-transfer/enum/transfer-method.enum';
import type { StatusEnum } from '@core/domain/schema/entity/bank/bank-transfer/enum/transfer-status.enum';
import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export interface BankTransferEntityPropsInterface
  extends BaseEntityPropsInterface {
  bankExternalId: string;
  description: string;
  transferMethod: TransferMethodEnum;
  value: string;
  netValue: number;
  status: StatusEnum;
  effectiveDate: Date | null;
  scheduleDate: Date | null;
  failReason: string | null;
  bankPaynebt: Guid;
}
