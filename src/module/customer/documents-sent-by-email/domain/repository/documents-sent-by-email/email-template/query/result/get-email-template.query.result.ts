import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GetEmailTemplateQueryResult extends BaseBuildableObject {
  public readonly id: string;
  public readonly nome: string;
  public readonly descricao: string;
  public readonly htmlContent: string;

  protected override readonly _type = GetEmailTemplateQueryResult.name;
}
