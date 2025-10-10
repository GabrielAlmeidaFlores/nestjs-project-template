import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetAnalysisToolRecordWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/get-analysis-tool-record.query.result';
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
}
