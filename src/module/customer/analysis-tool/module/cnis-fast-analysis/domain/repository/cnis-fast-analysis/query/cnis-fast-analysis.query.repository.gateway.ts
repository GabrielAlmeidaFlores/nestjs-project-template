import type { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetCnisFastAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis-with-relations.query.result';
import type { CnisFastAnalysisId } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class CnisFastAnalysisQueryRepositoryGateway {
  public abstract findOneByCnisFastAnalysisIdAndOrganizationIdWithRelationsOrFail(
    id: CnisFastAnalysisId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetCnisFastAnalysisWithRelationsQueryResult>;

  public abstract listByOrganizationId(
    organizationId: OrganizationId,
    listData: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetCnisFastAnalysisWithRelationsQueryResult>>;
}
