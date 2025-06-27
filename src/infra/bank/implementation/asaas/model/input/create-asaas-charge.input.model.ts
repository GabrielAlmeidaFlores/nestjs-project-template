import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AsaasBillingTypeEnum } from '@infra/bank/implementation/asaas/enum/asaas-billing-type.enum';
import type { AsaasDiscountInputModel } from '@infra/bank/implementation/asaas/model/input/asaas-discount.input.model';

export class CreateAsaasChargeInputModel extends BaseBuildableObject {
  public customer: string;
  public billingType: AsaasBillingTypeEnum;
  public value: number;
  public dueDate: Date;
  public description: string;
  public externalReference: string;
  public discount: AsaasDiscountInputModel | null;
  public installmentCount: number | null;

  protected override readonly _type = CreateAsaasChargeInputModel.name;
}
