import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { Base64 } from '@core/domain/schema/value-object/base64/base64.value-object';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';

export class CreateBillingOutputModel extends BaseBuildableObject {
  public readonly id: string;
  public readonly value: DecimalValue;
  public readonly installment?: string;
  public readonly pixQrCode?: Base64;
  public readonly pixCopyPaste?: string;

  protected override readonly _type = CreateBillingOutputModel.name;
}
