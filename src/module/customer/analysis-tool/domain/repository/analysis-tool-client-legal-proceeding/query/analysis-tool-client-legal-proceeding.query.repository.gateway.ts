import type { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
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
}
