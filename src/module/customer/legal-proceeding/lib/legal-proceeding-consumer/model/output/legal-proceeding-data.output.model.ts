import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class LegalProceedingDataOutputModel extends BaseBuildableObject {
  public readonly recipient: string[];
  public readonly recipientLawyer: string[];
  protected override readonly _type = LegalProceedingDataOutputModel.name;
}
