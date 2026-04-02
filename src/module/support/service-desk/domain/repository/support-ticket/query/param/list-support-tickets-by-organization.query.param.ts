import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { SupportTicketStatusEnum } from '@module/support/service-desk/domain/schema/entity/support-ticket/enum/support-ticket-status.enum';

export class ListSupportTicketsByOrganizationQueryParam extends ListDataInputModel {
  public readonly organizationId: OrganizationId;
  public readonly requesterAuthIdentityIdFilter: AuthIdentityId | null;
  public readonly status: SupportTicketStatusEnum | null;
  public override readonly search: string | null;
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;

  protected override readonly _type =
    ListSupportTicketsByOrganizationQueryParam.name;

  public constructor(
    props: Partial<ListSupportTicketsByOrganizationQueryParam> & {
      organizationId: OrganizationId;
    },
  ) {
    super(props);
    this.organizationId = props.organizationId;
    this.requesterAuthIdentityIdFilter =
      props.requesterAuthIdentityIdFilter ?? null;
    this.status = props.status ?? null;
    this.search = props.search ?? null;
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
  }
}
