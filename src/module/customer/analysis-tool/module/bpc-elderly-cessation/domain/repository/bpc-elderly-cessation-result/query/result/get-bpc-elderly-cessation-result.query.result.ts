import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { BpcElderlyCessationResultId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-result/value-object/bpc-elderly-cessation-result-id/bpc-elderly-cessation-result-id.value-object';

export class GetBpcElderlyCessationResultQueryResult extends BaseBuildableObject {
  public readonly id: BpcElderlyCessationResultId;
  public readonly inssDecisionAnalysis: string | null;
  public readonly firstAnalysis: string | null;
  public readonly completeAnalysis: string | null;
  public readonly completeAnalysisDownload: string | null;
  public readonly simplifiedAnalysis: string | null;
  public readonly applicableRules: string | null;
  public readonly benefitSummaries: string | null;
  public readonly analysisDetailedText: string | null;
  public readonly diagnosis: string | null;
  public readonly totalHouseholdIncome: number | null;
  public readonly perCapitaIncome: number | null;
  public readonly legalRequirementsMet: string | null;
  public readonly perCapitaIncomeBelowQuarterMinimumWage: string | null;
  public readonly ageEqualOrAbove65Years: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetBpcElderlyCessationResultQueryResult.name;
}
