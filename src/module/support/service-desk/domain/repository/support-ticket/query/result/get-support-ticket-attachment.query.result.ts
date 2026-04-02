import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GetSupportTicketAttachmentQueryResult extends BaseBuildableObject {
  public readonly fileName: string;

  protected override readonly _type =
    GetSupportTicketAttachmentQueryResult.name;
}
