import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import type { GetInsuranceQualityAnalysisInssBenefitQueryResult } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis-inss-benefit/query/result/get-insurance-quality-analysis-inss-benefit.query.result';
import type { GetInsuranceQualityAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis-legal-proceeding/query/result/get-insurance-quality-analysis-legal-proceeding.query.result';
import type { GetInsuranceQualityAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/repository/insurance-quality-analysis-result/query/result/get-insurance-quality-analysis-result.query.result';
import type { InsuranceQualityAnalysisId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/value-object/insurance-quality-analysis-id/insurance-quality-analysis-id.value-object';

export class GetInsuranceQualityAnalysisWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: InsuranceQualityAnalysisId;
  public readonly cnisDocument: string | null;
  public readonly ruralDocument: string | null;
  public readonly complementaryDocument: string | null;
  public readonly analysisBenefitNumber: string | null;
  public readonly analysisBenefitType: string | null;
  public readonly analysisBenefitConcessionDate: Date | null;
  public readonly analysisBenefitCessationDate: Date | null;
  public readonly analysisHasPreviousBenefit: boolean | null;
  public readonly analysisPreviousBenefitDetails: string | null;
  public readonly analysisContributionSituation: string | null;
  public readonly analysisHasRuralActivity: boolean | null;
  public readonly analysisRuralActivityDetails: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly analysisToolClient: GetAnalysisToolClientWithRelationsQueryResult;
  public readonly insuranceQualityAnalysisResult: GetInsuranceQualityAnalysisResultQueryResult | null;
  public readonly insuranceQualityAnalysisInssBenefit: GetInsuranceQualityAnalysisInssBenefitQueryResult[];
  public readonly insuranceQualityAnalysisLegalProceeding: GetInsuranceQualityAnalysisLegalProceedingQueryResult[];

  protected override readonly _type =
    GetInsuranceQualityAnalysisWithRelationsQueryResult.name;
}
