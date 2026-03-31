import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';

export class GetOrganizationMemberCollaboratorQueryResult extends BaseBuildableObject {
  public readonly organizationMemberId: OrganizationMemberId;
  public readonly name: string;
  public readonly email: Email;
  public readonly federalDocument: FederalDocument;
  public readonly registrationDate: Date;
  public readonly isActive: boolean;

  protected override readonly _type =
    GetOrganizationMemberCollaboratorQueryResult.name;
}
