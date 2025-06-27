import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class AsaasCreditCardHolderInfoInputModel extends BaseBuildableObject {
  public name: string;
  public email: string;
  public cpfCnpj: string;
  public postalCode: string;
  public addressNumber: string;
  public phone: string;

  protected override readonly _type = AsaasCreditCardHolderInfoInputModel.name;
}
