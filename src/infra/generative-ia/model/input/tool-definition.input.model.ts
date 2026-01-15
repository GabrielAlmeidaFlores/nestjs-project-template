import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class ToolDefinitionInputModel extends BaseBuildableObject {
  public readonly name: string;
  public readonly description: string;
  public readonly parameters: Record<string, unknown>;

  protected override readonly _type = ToolDefinitionInputModel.name;
}
