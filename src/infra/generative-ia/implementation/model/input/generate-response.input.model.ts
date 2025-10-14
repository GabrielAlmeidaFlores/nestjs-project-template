import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

export class GenerateResponseInputModel extends BaseBuildableDtoObject {
  public readonly prompt?: string;
  public readonly documents?: (Buffer | string)[];

  protected override readonly _type = GenerateResponseInputModel.name;
}
