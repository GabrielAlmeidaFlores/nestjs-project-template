import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class ObservabilityErrorLogInputModel extends BaseBuildableObject {
  public readonly scope: string;
  public readonly message: string;
  public readonly error?: Error;
  public readonly attributes?: Record<string, unknown>;

  protected override readonly _type = ObservabilityErrorLogInputModel.name;
}
