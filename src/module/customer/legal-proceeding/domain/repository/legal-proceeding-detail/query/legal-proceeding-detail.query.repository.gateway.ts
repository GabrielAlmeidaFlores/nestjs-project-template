import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';
import type { ListLegalProceedingDetailQueryParam } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/param/list-legal-proceeding-detail.query.param';
import type { GetLegalProceedingDetailWithRelationsQueryResult } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/result/get-legal-proceeding-detail-with-relations.query.result';
import type { GetLegalProceedingDetailQueryResult } from '@module/customer/legal-proceeding/domain/repository/legal-proceeding-detail/query/result/get-legal-proceeding-detail.query.result';

export abstract class LegalProceedingDetailQueryRepositoryGateway {
  public abstract findOneByLegalProceeding(
    legalProceedingNumber: string,
  ): Promise<GetLegalProceedingDetailQueryResult>;

  public abstract listByOrganizationIdAndAnalysisToolClientId(
    organizationId: OrganizationId,
    listData: ListLegalProceedingDetailQueryParam,
  ): Promise<
    ListDataOutputModel<GetLegalProceedingDetailWithRelationsQueryResult>
  >;

  public abstract findLastCreated(
    analysisToolClientLegalProceedingId: AnalysisToolClientLegalProceedingId,
    legalProceedingNumber: string,
  ): Promise<GetLegalProceedingDetailQueryResult | null>;
}
