import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralTimelineAnalysisInssBenefitId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-inss-benefit/value-object/rural-timeline-analysis-inss-benefit-id/rural-timeline-analysis-inss-benefit-id.value-object';

import type { RuralTimelineAnalysisEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity';
import type { RuralTimelineAnalysisInssBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-inss-benefit/rural-timeline-analysis-inss-benefit.entity.props.interface';

export class RuralTimelineAnalysisInssBenefitEntity extends BaseEntity<RuralTimelineAnalysisInssBenefitId> {
  public readonly inssBenefitNumber: string;
  public readonly ruralTimeline: RuralTimelineAnalysisEntity;

  protected readonly _type = RuralTimelineAnalysisInssBenefitEntity.name;

  public constructor(
    props: RuralTimelineAnalysisInssBenefitEntityPropsInterface,
  ) {
    super(RuralTimelineAnalysisInssBenefitId, props);

    this.inssBenefitNumber = props.inssBenefitNumber;
    this.ruralTimeline = props.ruralTimeline;
  }
}
