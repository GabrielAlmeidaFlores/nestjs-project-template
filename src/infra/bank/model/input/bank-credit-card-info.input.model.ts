import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class BankCreditCardInfoInputModel {
  public holderName: string;
  public number: string;
  public expiryMonth: string;
  public expiryYear: string;
  public ccv: string;

  protected readonly _type = BankCreditCardInfoInputModel.name;

  public constructor(props: PublicPropertyType<BankCreditCardInfoInputModel>) {
    this.holderName = props.holderName;
    this.number = props.number;
    this.expiryMonth = props.expiryMonth;
    this.expiryYear = props.expiryYear;
    this.ccv = props.ccv;
  }
}
