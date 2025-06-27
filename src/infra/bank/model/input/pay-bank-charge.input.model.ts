import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetBankCreditCardHolderInfoInputModel } from '@infra/bank/model/input/get-bank-credit-card-holder-info.input.model';
import type { GetBankCreditCardInfoInputModel } from '@infra/bank/model/input/get-bank-credit-card-info.input.model';

export class PayBankChargeInputModel extends BaseBuildableObject {
  public chargeId: string;
  public creditCard: GetBankCreditCardInfoInputModel;
  public creditCardHolderInfo: GetBankCreditCardHolderInfoInputModel;

  protected override readonly _type = PayBankChargeInputModel.name;
}
