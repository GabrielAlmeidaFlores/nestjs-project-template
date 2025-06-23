import type { BankCreditCardHolderInfoInputModel } from '@infra/bank/model/input/bank-credit-card-holder-info.input.model';
import type { BankCreditCardInfoInputModel } from '@infra/bank/model/input/bank-credit-card-info.input.model';
import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class PayBankChargeInputModel {
  public customerId: string;
  public creditCard: BankCreditCardInfoInputModel;
  public creditCardHolderInfo: BankCreditCardHolderInfoInputModel;

  protected readonly _type = PayBankChargeInputModel.name;

  public constructor(props: PublicPropertyType<PayBankChargeInputModel>) {
    this.customerId = props.customerId;
    this.creditCard = props.creditCard;
    this.creditCardHolderInfo = props.creditCardHolderInfo;
  }
}
