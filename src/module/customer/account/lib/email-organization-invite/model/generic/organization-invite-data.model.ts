import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';

export class OrganizationInviteDataModel {
  public readonly organizationId: OrganizationId;
  public readonly invitedEmail: string;
  public readonly invitedName: string;

  protected readonly _type = OrganizationInviteDataModel.name;

  public constructor(props: {
    organizationId: OrganizationId;
    invitedEmail: string;
    invitedName: string;
  }) {
    this.organizationId = props.organizationId;
    this.invitedEmail = props.invitedEmail;
    this.invitedName = props.invitedName;
  }
}
