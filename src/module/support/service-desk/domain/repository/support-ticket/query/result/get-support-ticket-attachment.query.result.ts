import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GetSupportTicketAttachmentQueryResult extends BaseBuildableObject {
  public readonly bucketKey: string;
  public readonly originalFileName: string;

  protected override readonly _type =
    GetSupportTicketAttachmentQueryResult.name;
}
