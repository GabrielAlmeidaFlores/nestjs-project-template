import { NotFoundError } from '@core/error/not-found.error';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { GetMiniAdvisorWithRelationsQueryResult } from '@module/customer/mini-advisor/domain/repository/mini-advisor/query/result/get-mini-advisor-with-relations.query.result';
import { MiniAdvisorId } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/value-object/mini-advisor-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class MiniAdvisorQueryRepositoryGateway {
  public abstract findOneByIdOrFail(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    id: MiniAdvisorId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetMiniAdvisorWithRelationsQueryResult>;
}
