import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class GetBankChargePixInfoOutputModel {
  public encodedImage: string;
  public payload: string;
  public expirationDate: Date;

  protected readonly _type = GetBankChargePixInfoOutputModel.name;

  public constructor(
    props: PublicPropertyType<GetBankChargePixInfoOutputModel>,
  ) {
    this.encodedImage = props.encodedImage;
    this.payload = props.payload;
    this.expirationDate = props.expirationDate;
  }
}
