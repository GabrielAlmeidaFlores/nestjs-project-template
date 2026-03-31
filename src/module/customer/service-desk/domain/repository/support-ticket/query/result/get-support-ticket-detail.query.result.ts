import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetSupportTicketDetailAttachmentQueryResult } from '@module/customer/service-desk/domain/repository/support-ticket/query/result/get-support-ticket-detail-attachment.query.result';
import type { GetSupportTicketDetailMessageQueryResult } from '@module/customer/service-desk/domain/repository/support-ticket/query/result/get-support-ticket-detail-message.query.result';
import type { SupportTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-attendant/enum/support-type.enum';
import type { SupportAttendantId } from '@module/customer/service-desk/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import type { SupportTicketStatusEnum } from '@module/customer/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';
import type { SupportTicketId } from '@module/customer/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-id/support-ticket-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

export class GetSupportTicketDetailQueryResult extends BaseBuildableObject {
  public readonly id: SupportTicketId;
  public readonly organizationId: OrganizationId;
  public readonly requesterAuthIdentityId: AuthIdentityId;
  public readonly ticketNumber: string;
  public readonly requesterEmail: string;
  public readonly requesterName: string;
  public readonly subject: string;
  public readonly problem: string;
  public readonly description: string;
  public readonly supportType: SupportTypeEnum;
  public readonly status: SupportTicketStatusEnum;
  public readonly assignedAttendantId: SupportAttendantId | null;
  public readonly assignedAttendantName: string | null;
  public readonly attachments: GetSupportTicketDetailAttachmentQueryResult[];
  public readonly messages: GetSupportTicketDetailMessageQueryResult[];
  public readonly createdAt: Date;

  protected override readonly _type = GetSupportTicketDetailQueryResult.name;
}
