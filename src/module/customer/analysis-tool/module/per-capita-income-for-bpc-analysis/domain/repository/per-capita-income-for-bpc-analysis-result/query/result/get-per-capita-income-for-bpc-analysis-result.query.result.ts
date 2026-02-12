import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { PerCapitaIncomeForBpcAnalysisResultId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis-result/value-object/per-capita-income-for-bpc-analysis-result-id/per-capita-income-for-bpc-analysis-result-id.value-object';

export class GetPerCapitaIncomeForBpcAnalysisResultQueryResult extends BaseBuildableObject {
  public readonly id: PerCapitaIncomeForBpcAnalysisResultId;
  public readonly completeAnalysis: string | null;
  public readonly simplifiedAnalysis: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetPerCapitaIncomeForBpcAnalysisResultQueryResult.name;
}
