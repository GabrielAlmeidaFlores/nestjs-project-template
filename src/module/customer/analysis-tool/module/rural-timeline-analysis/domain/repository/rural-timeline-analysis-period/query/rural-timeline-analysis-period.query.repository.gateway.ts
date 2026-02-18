import type { RuralTimelineAnalysisPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/rural-timeline-analysis-period.entity';
import type { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';

export abstract class RuralTimelineAnalysisPeriodQueryRepositoryGateway {
  public abstract findOneById(
    id: RuralTimelineAnalysisPeriodId,
  ): Promise<RuralTimelineAnalysisPeriodEntity | null>;
}
