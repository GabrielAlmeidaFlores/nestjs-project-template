import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AsaasBillingTypeEnum } from '@infra/bank/implementation/asaas/enum/asaas-billing-type.enum';
import type { AsaasSubscriptionCycleEnum } from '@infra/bank/implementation/asaas/enum/asaas-subscription-cycle.enum';
import type { AsaasDiscountInputModel } from '@infra/bank/implementation/asaas/model/input/asaas-discount.input.model';

export class CreateAsaasSubscriptionOutputModel extends BaseBuildableObject {
  public id: string;
  public customer: string;
  public billingType: AsaasBillingTypeEnum;
  public value: number;
  public cycle: AsaasSubscriptionCycleEnum;
  public description: string;
  public discount: AsaasDiscountInputModel | null;

  protected override readonly _type = CreateAsaasSubscriptionOutputModel.name;
}
