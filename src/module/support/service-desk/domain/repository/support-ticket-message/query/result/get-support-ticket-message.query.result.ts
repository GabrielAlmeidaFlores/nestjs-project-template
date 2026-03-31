import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GetSupportTicketMessageQueryResult extends BaseBuildableObject {
  public readonly senderName: string;
  public readonly content: string;
  public readonly createdAt: Date;

  protected override readonly _type = GetSupportTicketMessageQueryResult.name;
}
