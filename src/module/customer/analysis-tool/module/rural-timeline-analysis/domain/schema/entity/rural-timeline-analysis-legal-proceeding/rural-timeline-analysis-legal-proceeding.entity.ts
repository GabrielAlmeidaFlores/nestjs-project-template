import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralTimelineAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-legal-proceeding/value-object/rural-timeline-analysis-legal-proceeding-id/rural-timeline-analysis-legal-proceeding-id.value-object';

import type { RuralTimelineAnalysisEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity';
import type { RuralTimelineAnalysisLegalProceedingEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-legal-proceeding/rural-timeline-analysis-legal-proceeding.entity.props.interface';

export class RuralTimelineAnalysisLegalProceedingEntity extends BaseEntity<RuralTimelineAnalysisLegalProceedingId> {
  public readonly legalProceedingNumber: string;
  public readonly ruralTimeline: RuralTimelineAnalysisEntity;

  protected readonly _type = RuralTimelineAnalysisLegalProceedingEntity.name;

  public constructor(
    props: RuralTimelineAnalysisLegalProceedingEntityPropsInterface,
  ) {
    super(RuralTimelineAnalysisLegalProceedingId, props);

    this.legalProceedingNumber = props.legalProceedingNumber;
    this.ruralTimeline = props.ruralTimeline;
  }
}
