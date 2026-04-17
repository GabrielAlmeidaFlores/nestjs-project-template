import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetBpcElderlyAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/repository/bpc-elderly-analysis/query/result/get-bpc-elderly-analysis-with-relations.query.result';
import type { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class BpcElderlyAnalysisQueryRepositoryGateway {
  public abstract findOneByBpcElderlyAnalysisIdAndOrganizationIdOrFail(
    bpcElderlyAnalysisId: BpcElderlyAnalysisId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetBpcElderlyAnalysisWithRelationsQueryResult>;
}
