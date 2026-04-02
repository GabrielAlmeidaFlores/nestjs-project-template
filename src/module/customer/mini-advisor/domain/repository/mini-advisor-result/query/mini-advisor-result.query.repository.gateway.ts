import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetMiniAdvisorResultQueryResult } from '@module/customer/mini-advisor/domain/repository/mini-advisor-result/query/result/get-mini-advisor-result.query.result';
import type { MiniAdvisorResultId } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor-result/value-object/mini-advisor-result-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class MiniAdvisorResultQueryRepositoryGateway {
  public abstract findOneByIdOrFail(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    id: MiniAdvisorResultId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetMiniAdvisorResultQueryResult>;
}
