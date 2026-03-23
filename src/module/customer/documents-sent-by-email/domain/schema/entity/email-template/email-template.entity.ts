import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { EmailTemplateId } from '@module/customer/documents-sent-by-email/domain/schema/entity/email-template/value-object/email-template-id/email-template-id.value-object';

import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { EmailTemplateEntityPropsInterface } from '@module/customer/documents-sent-by-email/domain/schema/entity/email-template/email-template.entity.props.interface';

export class EmailTemplateEntity extends BaseEntity<EmailTemplateId> {
  public readonly owner: OrganizationMemberId;
  public readonly title: string;
  public readonly description: string;
  public readonly htmlContent: string;

  protected readonly _type = EmailTemplateEntity.name;

  public constructor(props: EmailTemplateEntityPropsInterface) {
    super(EmailTemplateId, props);

    this.owner = props.owner;
    this.title = props.title;
    this.description = props.description;
    this.htmlContent = props.htmlContent;
  }
}
