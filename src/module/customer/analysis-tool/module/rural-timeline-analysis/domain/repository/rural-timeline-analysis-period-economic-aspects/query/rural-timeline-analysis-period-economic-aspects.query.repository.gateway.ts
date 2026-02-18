import type { RuralTimelineAnalysisPeriodEconomicAspectsEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/rural-timeline-analysis-period-economic-aspects.entity';
import type { RuralTimelineAnalysisPeriodEconomicAspectsId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/value-object/rural-timeline-analysis-period-economic-aspects-id/rural-timeline-analysis-period-economic-aspects-id.value-object';

export abstract class RuralTimelineAnalysisPeriodEconomicAspectsQueryRepositoryGateway {
  public abstract findOneById(
    id: RuralTimelineAnalysisPeriodEconomicAspectsId,
  ): Promise<RuralTimelineAnalysisPeriodEconomicAspectsEntity | null>;
}
