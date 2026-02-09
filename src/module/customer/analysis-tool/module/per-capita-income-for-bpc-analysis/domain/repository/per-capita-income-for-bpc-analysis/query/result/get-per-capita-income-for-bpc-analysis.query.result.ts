import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';

export class GetPerCapitaIncomeForBpcAnalysisQueryResult extends BaseBuildableObject {
  public readonly id: PerCapitaIncomeForBpcAnalysisId;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetPerCapitaIncomeForBpcAnalysisQueryResult.name;
}
