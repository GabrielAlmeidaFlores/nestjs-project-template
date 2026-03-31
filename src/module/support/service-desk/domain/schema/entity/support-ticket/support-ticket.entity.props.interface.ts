import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { SupportAttendantId } from '@module/support/account/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import type { SupportTicketStatusEnum } from '@module/support/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import type { SupportTicketId } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import type { SupportTicketNumber } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-number/support-ticket-number.value-object';
import type { SupportTypeEnum } from '@shared/system/enum/support-type.enum';

export interface SupportTicketEntityPropsInterface extends BaseEntityPropsInterface<SupportTicketId> {
  organizationId: OrganizationId;
  requesterAuthIdentityId: AuthIdentityId;
  requesterEmail: string;
  requesterName: string;
  ticketNumber: SupportTicketNumber;
  supportType: SupportTypeEnum;
  subject: string;
  problem: string;
  description: string;
  status: SupportTicketStatusEnum;
  assignedAttendantId?: SupportAttendantId | null;
}
