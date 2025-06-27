import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AsaasBillingTypeEnum } from '@infra/bank/implementation/asaas/enum/asaas-billing-type.enum';
import type { AsaasDiscountInputModel } from '@infra/bank/implementation/asaas/model/input/asaas-discount.input.model';

export class CreateAsaasChargeOutputModel extends BaseBuildableObject {
  public id: string;
  public customer: string;
  public billingType: AsaasBillingTypeEnum;
  public value: number;
  public netValue: number;
  public dueDate: Date;
  public dateCreated: Date;
  public description: string;
  public externalReference: string;
  public discount: AsaasDiscountInputModel | null;

  protected override readonly _type = CreateAsaasChargeOutputModel.name;
}
