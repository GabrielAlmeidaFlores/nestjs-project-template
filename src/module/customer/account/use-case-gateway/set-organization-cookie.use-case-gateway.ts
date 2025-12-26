import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { FastifyReply } from 'fastify';

export abstract class SetOrganizationCookieUseCaseGateway {
  public abstract execute(
    reply: FastifyReply,
    organizationId: OrganizationId,
    owner: boolean,
  ): void;
}
