import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class AsaasCreditCardHolderInfoInputModel {
  public name: string;
  public email: string;
  public cpfCnpj: string;
  public postalCode: string;
  public addressNumber: string;
  public phone: string;

  protected readonly _type = AsaasCreditCardHolderInfoInputModel.name;

  public constructor(
    props: PublicPropertyType<AsaasCreditCardHolderInfoInputModel>,
  ) {
    this.name = props.name;
    this.email = props.email;
    this.cpfCnpj = props.cpfCnpj;
    this.postalCode = props.postalCode;
    this.addressNumber = props.addressNumber;
    this.phone = props.phone;
  }
}
