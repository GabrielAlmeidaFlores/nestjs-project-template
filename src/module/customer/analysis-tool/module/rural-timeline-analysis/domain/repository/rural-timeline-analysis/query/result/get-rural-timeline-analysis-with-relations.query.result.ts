import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RuralTimelineAnalysisWorkRegimeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/enum/rural-timeline-work-regime.enum';
import type { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';

export class GetRuralTimelineAnalysisWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: RuralTimelineAnalysisId;
  public readonly ruralTimelineAnalysis: string | null;
  public readonly ruralTimelinePeriodDocumentAnalysis: string | null;
  public readonly workRegime: RuralTimelineAnalysisWorkRegimeEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetRuralTimelineAnalysisWithRelationsQueryResult.name;
}
