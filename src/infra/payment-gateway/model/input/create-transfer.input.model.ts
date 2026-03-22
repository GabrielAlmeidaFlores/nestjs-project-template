import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { PixAddressKeyTypeEnum } from '@infra/payment-gateway/enum/pix-address-key-type.enum';

export class CreateTransferInputModel extends BaseBuildableObject {
  public readonly value: DecimalValue;
  public readonly pixAddressKey: string;
  public readonly pixAddressKeyType: PixAddressKeyTypeEnum;
  public readonly description?: string;
  public readonly externalReference?: string;

  protected override readonly _type = CreateTransferInputModel.name;
}
