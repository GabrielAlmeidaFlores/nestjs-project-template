import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GetDocumentsSentByEmailQueryResult extends BaseBuildableObject {
  public readonly emails: string;
  public readonly subject: string;
  public readonly createdAt: Date;
  public readonly sentBy: string;

  protected override readonly _type = GetDocumentsSentByEmailQueryResult.name;
}
