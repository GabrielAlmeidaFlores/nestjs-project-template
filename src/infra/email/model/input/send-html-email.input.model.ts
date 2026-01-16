import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class SendHTMLEmailInputModel extends BaseBuildableObject {
  public to: string | string[];
  public subject: string;
  public emailTemplateName: string;
  public emailTemplateParameters: Record<string, string>;

  protected override readonly _type = SendHTMLEmailInputModel.name;
}
