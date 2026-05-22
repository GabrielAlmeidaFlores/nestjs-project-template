import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history-period/query/result/get-survivor-pension-analysis-deceased-work-history-period.query.result';
import type { GetSurvivorPensionAnalysisDeceasedWorkHistoryRemunerationQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history-remuneration/query/result/get-survivor-pension-analysis-deceased-work-history-remuneration.query.result';
import type { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import type { SurvivorPensionAnalysisDeceasedWorkHistoryId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/value-object/survivor-pension-analysis-deceased-work-history-id/survivor-pension-analysis-deceased-work-history-id.value-object';

export class GetSurvivorPensionAnalysisDeceasedWorkHistoryQueryResult extends BaseBuildableObject {
  public readonly id: SurvivorPensionAnalysisDeceasedWorkHistoryId;
  public readonly survivorPensionAnalysisId: SurvivorPensionAnalysisId;
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly remunerations: GetSurvivorPensionAnalysisDeceasedWorkHistoryRemunerationQueryResult[];
  public readonly periods: GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetSurvivorPensionAnalysisDeceasedWorkHistoryQueryResult.name;
}
