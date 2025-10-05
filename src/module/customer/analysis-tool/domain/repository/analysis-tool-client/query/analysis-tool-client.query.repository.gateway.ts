import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class AnalysisToolClientQueryRepositoryGateway {
  public abstract findOneByAnalysisToolClientAndOrganizationIdOrFail(
    analysisToolClientId: AnalysisToolClientId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolClientWithRelationsQueryResult>;
}
