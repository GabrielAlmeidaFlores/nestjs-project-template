import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { PixAddressKeyTypeEnum } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/enum/pix-address-key-type.enum';
import type { TransferStatusEnum } from '@module/generic/bank/domain/schema/entity/bank-transfer/enum/transfer-status.enum';
import type { BankTransferId } from '@module/generic/bank/domain/schema/entity/bank-transfer/value-object/bank-transfer-id/bank-transfer-id.value-object';

export class GetBankTransferQueryResult extends BaseBuildableObject {
  public readonly id: BankTransferId;
  public readonly bankExternalId: string | null;
  public readonly amount: DecimalValue;
  public readonly status: TransferStatusEnum;
  public readonly pixAddressKey: string;
  public readonly pixAddressKeyType: PixAddressKeyTypeEnum;
  public readonly transferDate: Date | null;
  public readonly description: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type = GetBankTransferQueryResult.name;
}
