import { BaseEntity } from '@core/domain/schema/entity/base/base/base.entity';

import type { BankPaymentEntity } from '@core/domain/schema/entity/bank/bank-payment/bank-payment.entity';
import type { BankTransferEntityPropsInterface } from '@core/domain/schema/entity/bank/bank-transfer/bank-transfer.entity.props.interface';
import type { TransferMethodEnum } from '@core/domain/schema/entity/bank/bank-transfer/enum/transfer-method.enum';
import type { TransferStatusEnum } from '@core/domain/schema/entity/bank/bank-transfer/enum/transfer-status.enum';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';

export class BankTransferEntity extends BaseEntity {
  public readonly bankExternalId: string;
  public readonly description: string;
  public readonly transferMethod: TransferMethodEnum;
  public readonly value: DecimalValue;
  public readonly netValue: DecimalValue;
  public readonly status: TransferStatusEnum;
  public readonly effectiveDate: Date | null;
  public readonly scheduleDate: Date | null;
  public readonly failReason: string | null;
  public readonly bankPayment: BankPaymentEntity;

  protected readonly _type = BankTransferEntity.name;

  public constructor(props: BankTransferEntityPropsInterface) {
    super(props);

    this.bankExternalId = props.bankExternalId;
    this.description = props.description;
    this.transferMethod = props.transferMethod;
    this.value = props.value;
    this.netValue = props.netValue;
    this.status = props.status;
    this.effectiveDate = props.effectiveDate ?? null;
    this.scheduleDate = props.scheduleDate ?? null;
    this.failReason = props.failReason ?? null;
    this.bankPayment = props.bankPayment;
  }
}
