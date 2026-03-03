import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RuralTimelineAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-legal-proceeding/value-object/rural-timeline-analysis-legal-proceeding-id/rural-timeline-analysis-legal-proceeding-id.value-object';

export class GetRuralTimelineAnalysisLegalProceedingQueryResult extends BaseBuildableObject {
  public readonly id: RuralTimelineAnalysisLegalProceedingId;
  public readonly legalProceedingNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetRuralTimelineAnalysisLegalProceedingQueryResult.name;
}
