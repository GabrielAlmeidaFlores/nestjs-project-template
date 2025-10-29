import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { ListAnalysisToolRecordQueryParam } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/param/list-analysis-tool-record.query.param';
import type { GetAnalysisToolRecordWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/get-analysis-tool-record-with-relations.query.result';
import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class AnalysisToolRecordQueryRepositoryGateway {
  public abstract findOneByIdWithRelationsOrFail(
    id: AnalysisToolRecordId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult>;

  public abstract countByOrganizationId(
    organizationId: OrganizationId,
  ): Promise<number>;

  public abstract listByOrganizationId(
    organizationId: OrganizationId,
    listData: ListAnalysisToolRecordQueryParam,
  ): Promise<
    ListDataOutputModel<GetAnalysisToolRecordWithRelationsQueryResult>
  >;

  public abstract countAnalysisByAnalysisToolClientId(
    organizationId: OrganizationId,
    analysisToolClientId: AnalysisToolClientId,
  ): Promise<number>;

  public abstract findByAnalysisToolClientAndOrganizationIdWithRelations(
    analysisToolClientId: AnalysisToolClientId,
    organizationId: OrganizationId,
  ): Promise<GetAnalysisToolRecordWithRelationsQueryResult[]>;
}
