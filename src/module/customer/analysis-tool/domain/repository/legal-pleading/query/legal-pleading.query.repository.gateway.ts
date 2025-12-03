import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { ListLegalPleadingQueryParam } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/param/list-legal-pleading.query.param';
import type { GetLegalPleadingWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/result/get-legal-pleading-with-relations.query.result';
import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import type { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class LegalPleadingQueryRepositoryGateway {
  public abstract findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail(
    id: LegalPleadingId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetLegalPleadingWithRelationsQueryResult>;

  public abstract findByAnalysisToolClientIdAndOrganizationIdAndAuthIdentityId(
    analysisToolClientId: AnalysisToolClientId,
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
  ): Promise<GetLegalPleadingWithRelationsQueryResult[]>;

  public abstract countByOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
  ): Promise<number>;

  public abstract listByOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    authIdentityId: AuthIdentityId,
    listData: ListLegalPleadingQueryParam,
  ): Promise<ListDataOutputModel<GetLegalPleadingWithRelationsQueryResult>>;

  public abstract countByLegalPleadingIdAndOrganizationIdAndAuthIdentityId(
    organizationId: OrganizationId,
    analysisToolClientId: AnalysisToolClientId,
    authIdentityId: AuthIdentityId,
  ): Promise<number>;
}
