import type { RuralTimelineAnalysisPeriodResidenceEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-residence/rural-timeline-analysis-period-residence.entity';
import type { RuralTimelineAnalysisPeriodResidenceId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-residence/value-object/rural-timeline-analysis-period-residence-id/rural-timeline-analysis-period-residence-id.value-object';

export abstract class RuralTimelineAnalysisPeriodResidenceQueryRepositoryGateway {
  public abstract findOneById(
    id: RuralTimelineAnalysisPeriodResidenceId,
  ): Promise<RuralTimelineAnalysisPeriodResidenceEntity | null>;
}
