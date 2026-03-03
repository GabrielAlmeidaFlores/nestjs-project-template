import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class ObservabilityLogInputModel extends BaseBuildableObject {
  public readonly scope: string;
  public readonly message: string;
  public readonly attributes?: Record<string, unknown>;

  protected override readonly _type = ObservabilityLogInputModel.name;
}
