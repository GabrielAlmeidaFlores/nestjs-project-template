import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class ConversationHistoryItemInputModel extends BaseBuildableObject {
  public readonly role: string;
  public readonly content: string;

  protected override readonly _type = ConversationHistoryItemInputModel.name;
}
