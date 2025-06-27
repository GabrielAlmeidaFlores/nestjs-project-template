import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AsaasDiscountTypeEnum } from '@infra/bank/implementation/asaas/enum/asaas-discount-type.enum';

export class AsaasDiscountInputModel extends BaseBuildableObject {
  public value: number;
  public dueDateLimitDays: number | null;
  public type: AsaasDiscountTypeEnum;

  protected override readonly _type = AsaasDiscountInputModel.name;
}
