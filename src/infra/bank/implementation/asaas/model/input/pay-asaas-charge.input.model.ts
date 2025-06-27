import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AsaasCreditCardHolderInfoInputModel } from '@infra/bank/implementation/asaas/model/input/asaas-credit-card-holder-info.input.model';
import type { AsaasCreditCardInfoInputModel } from '@infra/bank/implementation/asaas/model/input/asaas-credit-card-info.input.model';

export class PayAsaasChargeInputModel extends BaseBuildableObject {
  public creditCard: AsaasCreditCardInfoInputModel;
  public creditCardHolderInfo: AsaasCreditCardHolderInfoInputModel;

  protected override readonly _type = PayAsaasChargeInputModel.name;
}
