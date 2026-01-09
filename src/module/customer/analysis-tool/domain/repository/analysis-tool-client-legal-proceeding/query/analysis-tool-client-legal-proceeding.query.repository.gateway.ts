import type { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { ListAnalysisToolClientLegalProceedingByLegalProceedingNumberQueryParamGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/param/list-analysis-tool-client-legal-proceeding-by-legal-proceeding-number.query.param.gateway';
import type { ListAnalysisToolClientLegalProceedingCreatedRangeQueryParamGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/param/list-analysis-tool-client-legal-proceeding-created-range.query.param.gateway';
import type { ListAnalysisToolClientLegalProceedingQueryParamGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/param/list-analysis-tool-client-legal-proceeding.query.param.gateway';
import type { GetAnalysisToolClientLegalProceedingWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/result/get-analysis-tool-client-legal-proceeding-with-relations.query.result';
import type { GetAnalysisToolClientLegalProceedingQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/result/get-analysis-tool-client-legal-proceeding.query.result';

export abstract class AnalysisToolClientLegalProceedingQueryRepositoryGateway {
  public abstract listAnalysisToolClient(
    listData: ListDataInputModel,
  ): Promise<
    ListDataOutputModel<GetAnalysisToolClientLegalProceedingQueryResult>
  >;

  public abstract listAnalysisToolClientWithRelations(
    listData: ListDataInputModel,
  ): Promise<
    ListDataOutputModel<GetAnalysisToolClientLegalProceedingWithRelationsQueryResult>
  >;

  public abstract listByOrganizationId(
    organizationId: OrganizationId,
    listData: ListAnalysisToolClientLegalProceedingCreatedRangeQueryParamGateway,
  ): Promise<
    ListDataOutputModel<GetAnalysisToolClientLegalProceedingWithRelationsQueryResult>
  >;

  public abstract listByLegalProceedingNumber(
    organizationId: OrganizationId,
    listData: ListAnalysisToolClientLegalProceedingByLegalProceedingNumberQueryParamGateway,
  ): Promise<
    ListDataOutputModel<GetAnalysisToolClientLegalProceedingWithRelationsQueryResult>
  >;

  public abstract listByOrganizationIdWithCombinedFilters(
    organizationId: OrganizationId,
    listData: ListAnalysisToolClientLegalProceedingQueryParamGateway,
  ): Promise<
    ListDataOutputModel<GetAnalysisToolClientLegalProceedingWithRelationsQueryResult>
  >;
}
