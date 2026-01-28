import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RuralTimelineWorkRegimeEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/enum/rural-timeline-work-regime.enum';
import type { RuralTimelineId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/value-object/rural-timeline-id/rural-timeline-id.value-object';

export class GetRuralTimelineWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: RuralTimelineId;
  public readonly ruralTimelineAnalysis: string | null;
  public readonly ruralTimelinePeriodDocumentAnalysis: string | null;
  public readonly workRegime: RuralTimelineWorkRegimeEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetRuralTimelineWithRelationsQueryResult.name;
}
