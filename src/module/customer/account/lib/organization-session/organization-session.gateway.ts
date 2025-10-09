import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { OrganizationSessionJwtOutputModel } from '@module/customer/account/lib/organization-session/model/output/organization-session-jwt.output.model';

export abstract class OrganizationSessionGateway {
  public abstract createSession(organizationId: OrganizationId): string;
  public abstract getSessionDataFromJwt(
    jwt: string,
  ): OrganizationSessionJwtOutputModel | null;
}
