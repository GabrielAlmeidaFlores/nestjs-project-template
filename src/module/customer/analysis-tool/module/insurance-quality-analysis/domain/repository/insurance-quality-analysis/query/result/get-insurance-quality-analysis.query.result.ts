import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { InsuranceQualityAnalysisId } from '@module/customer/analysis-tool/module/insurance-quality-analysis/domain/schema/entity/insurance-quality-analysis/value-object/insurance-quality-analysis-id/insurance-quality-analysis-id.value-object';

export class GetInsuranceQualityAnalysisQueryResult extends BaseBuildableObject {
  public readonly id: InsuranceQualityAnalysisId;
  public readonly analysisToolClientId: AnalysisToolClientId;
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

  protected override readonly _type =
    GetInsuranceQualityAnalysisQueryResult.name;
}
