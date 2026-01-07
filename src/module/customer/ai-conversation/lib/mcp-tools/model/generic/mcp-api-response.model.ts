import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class McpApiResponseModel<T> extends BaseBuildableObject {
  public success: boolean;
  public data?: T;
  public error?: string;

  protected override readonly _type = McpApiResponseModel.name;
}
