import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { CustomerEmailSentId } from '@module/customer/documents-sent-by-email/domain/schema/entity/customer-email-sent/value-object/customer-email-sent-id/customer-email-sent-id.value-object';

export interface CustomerEmailSentEntityPropsInterface extends BaseEntityPropsInterface<CustomerEmailSentId> {
  emails: string;
  subject: string;
  htmlContent: string;
  isSimplified: boolean;
  sentBy?: OrganizationMemberId | null;
}
