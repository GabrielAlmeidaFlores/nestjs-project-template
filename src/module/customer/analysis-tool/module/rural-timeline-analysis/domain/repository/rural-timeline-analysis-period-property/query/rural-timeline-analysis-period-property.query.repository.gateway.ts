import type { RuralTimelineAnalysisPeriodPropertyEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/rural-timeline-analysis-period-property.entity';
import type { RuralTimelineAnalysisPeriodPropertyId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/value-object/rural-timeline-analysis-period-property-id/rural-timeline-analysis-period-property-id.value-object';

export abstract class RuralTimelineAnalysisPeriodPropertyQueryRepositoryGateway {
  public abstract findOneById(
    id: RuralTimelineAnalysisPeriodPropertyId,
  ): Promise<RuralTimelineAnalysisPeriodPropertyEntity | null>;
}
