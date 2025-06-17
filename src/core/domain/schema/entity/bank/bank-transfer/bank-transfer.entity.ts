import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';

import type { BankTransferEntityPropsInterface } from '@core/domain/schema/entity/bank/bank-transfer/bank-transfer.entity.props.interface';
import type { TransferMethodEnum } from '@core/domain/schema/entity/bank/bank-transfer/enum/transfer-method.enum';
import type { StatusEnum } from '@core/domain/schema/entity/bank/bank-transfer/enum/transfer-status.enum';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BankTransferEntity extends BaseEntity {
  public readonly bankExternalId: string;
  public readonly description: string;
  public readonly transferMethod: TransferMethodEnum;
  public readonly value: string;
  public readonly netValue: number;
  public readonly status: StatusEnum;
  public readonly effectiveDate: Date | null;
  public readonly scheduleDate: Date | null;
  public readonly failReason: string | null;
  public readonly bankPaynebt: Guid;

  protected readonly _type = BankTransferEntity.name;

  public constructor(props: BankTransferEntityPropsInterface) {
    super(props);

    this.bankExternalId = props.bankExternalId;
    this.description = props.description;
    this.transferMethod = props.transferMethod;
    this.value = props.value;
    this.netValue = props.netValue;
    this.status = props.status;
    this.effectiveDate = props.effectiveDate;
    this.scheduleDate = props.scheduleDate;
    this.failReason = props.failReason;
    this.bankPaynebt = props.bankPaynebt;
  }
}
