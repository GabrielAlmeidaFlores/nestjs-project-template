import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { CreditCardHolderInfoInputModel } from '@infra/payment-gateway/model/input/credit-card-holder.input.model';
import type { CreditCardInfoInputModel } from '@infra/payment-gateway/model/input/credit-card-info.input.model';

export class PayBillingInputModel extends BaseBuildableObject {
  public readonly billingId: string;
  public readonly creditCardInfo: CreditCardInfoInputModel;
  public readonly creditCardHolderInfo: CreditCardHolderInfoInputModel;

  protected override readonly _type = PayBillingInputModel.name;
}
