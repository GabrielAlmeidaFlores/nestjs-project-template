import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';

import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { SupportAttendantId } from '@module/support/account/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import type { SupportTicketEntityPropsInterface } from '@module/support/service-desk/domain/schema/entity/support-ticket/support-ticket.entity.props.interface';
import type { SupportTypeEnum } from '@shared/system/enum/support-type.enum';

export class SupportTicketEntity extends BaseEntity<SupportTicketId> {
  public readonly organizationId: OrganizationId;
  public readonly requesterAuthIdentityId: AuthIdentityId;
  public readonly requesterEmail: string;
  public readonly requesterName: string;
  public readonly ticketNumber: string;
  public readonly supportType: SupportTypeEnum;
  public readonly subject: string;
  public readonly problem: string;
  public readonly description: string;
  public readonly status: string;
  public readonly assignedAttendantId: SupportAttendantId | null;

  protected readonly _type = SupportTicketEntity.name;

  public constructor(props: SupportTicketEntityPropsInterface) {
    super(SupportTicketId, props);

    this.organizationId = props.organizationId;
    this.requesterAuthIdentityId = props.requesterAuthIdentityId;
    this.requesterEmail = props.requesterEmail;
    this.requesterName = props.requesterName;
    this.ticketNumber = props.ticketNumber;
    this.supportType = props.supportType;
    this.subject = props.subject;
    this.problem = props.problem;
    this.description = props.description;
    this.status = props.status;
    this.assignedAttendantId = props.assignedAttendantId ?? null;
  }
}
