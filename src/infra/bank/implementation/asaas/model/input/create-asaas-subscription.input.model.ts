import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AsaasBillingTypeEnum } from '@infra/bank/implementation/asaas/enum/asaas-billing-type.enum';
import type { AsaasSubscriptionCycleEnum } from '@infra/bank/implementation/asaas/enum/asaas-subscription-cycle.enum';
import type { AsaasCreditCardHolderInfoInputModel } from '@infra/bank/implementation/asaas/model/input/asaas-credit-card-holder-info.input.model';
import type { AsaasCreditCardInfoInputModel } from '@infra/bank/implementation/asaas/model/input/asaas-credit-card-info.input.model';
import type { AsaasDiscountInputModel } from '@infra/bank/implementation/asaas/model/input/asaas-discount.input.model';

export class CreateAsaasSubscriptionInputModel extends BaseBuildableObject {
  public customer: string;
  public billingType: AsaasBillingTypeEnum;
  public value: number;
  public cycle: AsaasSubscriptionCycleEnum;
  public description: string;
  public remoteIp: string;
  public creditCard: AsaasCreditCardInfoInputModel;
  public creditCardHolderInfo: AsaasCreditCardHolderInfoInputModel;
  public discount: AsaasDiscountInputModel | null;

  protected override readonly _type = CreateAsaasSubscriptionInputModel.name;
}
