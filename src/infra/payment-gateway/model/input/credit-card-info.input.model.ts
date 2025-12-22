import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class CreditCardInfoInputModel extends BaseBuildableObject {
  public readonly holderName: string;
  public readonly number: string;
  public readonly expiryMonth: string;
  public readonly expiryYear: string;
  public readonly ccv: string;

  protected override readonly _type = CreditCardInfoInputModel.name;
}
