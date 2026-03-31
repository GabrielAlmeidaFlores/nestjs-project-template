import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { EmailTemplateId } from '@module/customer/documents-sent-by-email/domain/schema/entity/email-template/value-object/email-template-id/email-template-id.value-object';

export interface EmailTemplateEntityPropsInterface extends BaseEntityPropsInterface<EmailTemplateId> {
  owner: OrganizationMemberId;
  title: string;
  description: string;
  htmlContent: string;
}
