import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class McpToolModel extends BaseBuildableObject {
  public name: string;
  public description: string;
  public parameters: Record<string, unknown>;

  protected override readonly _type = McpToolModel.name;
}
