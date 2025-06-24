import type { GetBankCreditCardHolderInfoInputModel } from '@infra/bank/model/input/get-bank-credit-card-holder-info.input.model';
import type { GetBankCreditCardInfoInputModel } from '@infra/bank/model/input/get-bank-credit-card-info.input.model';
import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class PayBankChargeInputModel {
  public chargeId: string;
  public creditCard: GetBankCreditCardInfoInputModel;
  public creditCardHolderInfo: GetBankCreditCardHolderInfoInputModel;

  protected readonly _type = PayBankChargeInputModel.name;

  public constructor(props: PublicPropertyType<PayBankChargeInputModel>) {
    this.chargeId = props.chargeId;
    this.creditCard = props.creditCard;
    this.creditCardHolderInfo = props.creditCardHolderInfo;
  }
}
