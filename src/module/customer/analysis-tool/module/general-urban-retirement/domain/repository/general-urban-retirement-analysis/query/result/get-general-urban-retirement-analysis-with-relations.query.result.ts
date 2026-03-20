import { GetGeneralUrbanRetirementAnalysisQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis/query/result/get-general-urban-retirement-analysis.query.result';

import type { GetGeneralUrbanRetirementAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-document/query/result/get-general-urban-retirement-analysis-document.query.result';
import type { GetGeneralUrbanRetirementAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-legal-proceeding/query/result/get-general-urban-retirement-analysis-legal-proceeding.query.result';
import type { GetGeneralUrbanRetirementAnalysisPeriodQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-period/query/result/get-general-urban-retirement-analysis-period.query.result';
import type { GetGeneralUrbanRetirementAnalysisRemunerationQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-remuneration/query/result/get-general-urban-retirement-analysis-remuneration.query.result';
import type { GetGeneralUrbanRetirementAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/repository/general-urban-retirement-analysis-result/query/result/get-general-urban-retirement-analysis-result.query.result';

export class GetGeneralUrbanRetirementAnalysisWithRelationsQueryResult extends GetGeneralUrbanRetirementAnalysisQueryResult {
  public readonly generalUrbanRetirementAnalysisResult: GetGeneralUrbanRetirementAnalysisResultQueryResult | null;
  public readonly remunerations: GetGeneralUrbanRetirementAnalysisRemunerationQueryResult[];
  public readonly periods: GetGeneralUrbanRetirementAnalysisPeriodQueryResult[];
  public readonly documents: GetGeneralUrbanRetirementAnalysisDocumentQueryResult[];
  public readonly legalProceedings: GetGeneralUrbanRetirementAnalysisLegalProceedingQueryResult[];

  protected override readonly _type =
    GetGeneralUrbanRetirementAnalysisWithRelationsQueryResult.name;
}
