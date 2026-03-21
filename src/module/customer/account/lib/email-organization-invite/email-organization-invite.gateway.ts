import type { OrganizationInviteDataModel } from '@module/customer/account/lib/email-organization-invite/model/generic/organization-invite-data.model';

export abstract class EmailOrganizationInviteGateway {
  public abstract generatePersistAndSendInviteCode(
    organizationId: string,
    organizationName: string,
    invitedEmail: string,
    invitedName: string,
  ): Promise<string>;

  public abstract getInviteData(
    code: string,
  ): Promise<OrganizationInviteDataModel | null>;

  public abstract deleteInviteData(code: string): Promise<void>;
}
