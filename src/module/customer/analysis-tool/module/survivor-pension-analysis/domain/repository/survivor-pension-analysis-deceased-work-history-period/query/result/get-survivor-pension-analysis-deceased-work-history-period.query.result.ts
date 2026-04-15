import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history-period-document/query/result/get-survivor-pension-analysis-deceased-work-history-period-document.query.result';
import type { SurvivorPensionAnalysisDeceasedWorkHistoryId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/value-object/survivor-pension-analysis-deceased-work-history-id/survivor-pension-analysis-deceased-work-history-id.value-object';
import type { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period/value-object/survivor-pension-analysis-deceased-work-history-period-id/survivor-pension-analysis-deceased-work-history-period-id.value-object';

export class GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryResult extends BaseBuildableObject {
  public readonly id: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId;
  public readonly survivorPensionAnalysisDeceasedWorkHistoryId: SurvivorPensionAnalysisDeceasedWorkHistoryId;
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly specialPeriodStartDate: Date | null;
  public readonly specialPeriodEndDate: Date | null;
  public readonly specialTimeType: string | null;
  public readonly jobTitle: string | null;
  public readonly careerName: string | null;
  public readonly serviceType: string | null;
  public readonly department: string | null;
  public readonly documents: GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodQueryResult.name;
}
