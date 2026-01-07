import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class McpQueryResultModel extends BaseBuildableObject {
  public rows: Array<Record<string, string | number | boolean | null>>;
  public fields: string[];
  public executionTime: number;
  public rowCount: number;

  protected override readonly _type = McpQueryResultModel.name;
}
