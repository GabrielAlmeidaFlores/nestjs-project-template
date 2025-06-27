import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GetBankChargePixInfoOutputModel extends BaseBuildableObject {
  public encodedImage: string;
  public payload: string;
  public expirationDate: Date;

  protected override readonly _type = GetBankChargePixInfoOutputModel.name;
}
