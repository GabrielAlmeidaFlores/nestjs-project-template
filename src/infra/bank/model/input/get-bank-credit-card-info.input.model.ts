import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class GetBankCreditCardInfoInputModel {
  public holderName: string;
  public number: string;
  public expiryMonth: string;
  public expiryYear: string;
  public ccv: string;

  protected readonly _type = GetBankCreditCardInfoInputModel.name;

  public constructor(
    props: PublicPropertyType<GetBankCreditCardInfoInputModel>,
  ) {
    this.holderName = props.holderName;
    this.number = props.number;
    this.expiryMonth = props.expiryMonth;
    this.expiryYear = props.expiryYear;
    this.ccv = props.ccv;
  }
}
