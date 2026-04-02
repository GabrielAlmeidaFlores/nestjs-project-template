import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { CustomerEmailSentId } from '@module/customer/documents-sent-by-email/domain/schema/entity/customer-email-sent/value-object/customer-email-sent-id/customer-email-sent-id.value-object';

import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { CustomerEmailSentEntityPropsInterface } from '@module/customer/documents-sent-by-email/domain/schema/entity/customer-email-sent/customer-email-sent.entity.props.interface';

export class CustomerEmailSentEntity extends BaseEntity<CustomerEmailSentId> {
  public readonly emails: string;
  public readonly subject: string;
  public readonly htmlContent: string;
  public readonly isSimplified: boolean;
  public readonly sentBy: OrganizationMemberId | null;

  protected readonly _type = CustomerEmailSentEntity.name;

  public constructor(props: CustomerEmailSentEntityPropsInterface) {
    super(CustomerEmailSentId, props);

    this.emails = props.emails;
    this.subject = props.subject;
    this.htmlContent = props.htmlContent;
    this.isSimplified = props.isSimplified;
    this.sentBy = props.sentBy ?? null;
  }
}
