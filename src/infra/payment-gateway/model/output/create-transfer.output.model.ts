import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { PixAddressKeyTypeEnum } from '@infra/payment-gateway/enum/pix-address-key-type.enum';
import type { TransferStatusEnum } from '@infra/payment-gateway/enum/transfer-status.enum';

export class CreateTransferOutputModel extends BaseBuildableObject {
  public readonly id: string;
  public readonly value: DecimalValue;
  public readonly status: TransferStatusEnum;
  public readonly pixAddressKey: string;
  public readonly pixAddressKeyType: PixAddressKeyTypeEnum;

  protected override readonly _type = CreateTransferOutputModel.name;
}
