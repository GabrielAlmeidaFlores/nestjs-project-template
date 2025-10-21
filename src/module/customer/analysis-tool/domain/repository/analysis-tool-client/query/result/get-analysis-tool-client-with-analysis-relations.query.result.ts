import { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import { GetAnalysisToolRecordWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/get-analysis-tool-record.query.result';
import { GetLegalPleadingQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/result/get-legal-pleading.query.result';

export class GetAnalysisToolClientWithAnalysisRelationsQueryResult extends GetAnalysisToolClientWithRelationsQueryResult {
  legalPleadings: GetLegalPleadingQueryResult[];
  analysisToolRecords: GetAnalysisToolRecordWithRelationsQueryResult[];
}
