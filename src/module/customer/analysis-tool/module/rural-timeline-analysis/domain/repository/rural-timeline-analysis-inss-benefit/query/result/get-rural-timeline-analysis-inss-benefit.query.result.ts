import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RuralTimelineAnalysisInssBenefitId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-inss-benefit/value-object/rural-timeline-analysis-inss-benefit-id/rural-timeline-analysis-inss-benefit-id.value-object';

export class GetRuralTimelineAnalysisInssBenefitQueryResult extends BaseBuildableObject {
  public readonly id: RuralTimelineAnalysisInssBenefitId;
  public readonly inssBenefitNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetRuralTimelineAnalysisInssBenefitQueryResult.name;
}
