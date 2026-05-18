import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period-document/value-object/survivor-pension-analysis-deceased-work-history-period-document-id/survivor-pension-analysis-deceased-work-history-period-document-id.value-object';

export class GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentQueryResult extends BaseBuildableObject {
  public readonly id: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentId;
  public readonly documentType: string;
  public readonly documentName: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentQueryResult.name;
}
