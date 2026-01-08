import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export interface McpTableStatsInterface {
  tableName: string;
  rowCount: number;
}

export class McpDatabaseStatsModel extends BaseBuildableObject {
  public tables: McpTableStatsInterface[];
  public timestamp: number;

  protected override readonly _type = McpDatabaseStatsModel.name;
}
