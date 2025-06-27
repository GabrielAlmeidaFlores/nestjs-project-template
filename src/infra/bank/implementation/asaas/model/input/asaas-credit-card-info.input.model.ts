import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class AsaasCreditCardInfoInputModel extends BaseBuildableObject {
  public holderName: string;
  public number: string;
  public expiryMonth: string;
  public expiryYear: string;
  public ccv: string;

  protected override readonly _type = AsaasCreditCardInfoInputModel.name;
}
