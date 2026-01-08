import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class MessageHistoryItemModel extends BaseBuildableObject {
  public role: string;
  public content: string;

  protected override readonly _type = MessageHistoryItemModel.name;
}
