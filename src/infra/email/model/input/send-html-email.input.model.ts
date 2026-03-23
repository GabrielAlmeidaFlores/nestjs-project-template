import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export type SendHTMLEmailAttachmentInputModelType = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

export class SendHTMLEmailInputModel extends BaseBuildableObject {
  public to: string | string[];
  public subject: string;
  public emailTemplateName: string;
  public emailTemplateParameters: Record<string, string>;
  public attachments?: SendHTMLEmailAttachmentInputModelType[];

  protected override readonly _type = SendHTMLEmailInputModel.name;
}
