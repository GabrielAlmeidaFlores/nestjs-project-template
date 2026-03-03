import type { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';
import type { RuralTimelineAnalysisPeriodEconomicAspectTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/enum/rural-timeline-analysis-period-economic-aspect-type.enum';
import type { RuralTimelineAnalysisPeriodEconomicAspectsEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/rural-timeline-analysis-period-economic-aspects.entity';
import type { RuralTimelineAnalysisPeriodEconomicAspectsId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/value-object/rural-timeline-analysis-period-economic-aspects-id/rural-timeline-analysis-period-economic-aspects-id.value-object';

export abstract class RuralTimelineAnalysisPeriodEconomicAspectsQueryRepositoryGateway {
  public abstract findOneById(
    id: RuralTimelineAnalysisPeriodEconomicAspectsId,
  ): Promise<RuralTimelineAnalysisPeriodEconomicAspectsEntity | null>;
  public abstract findOneByPeriodIdAndType(
    periodId: RuralTimelineAnalysisPeriodId,
    type: RuralTimelineAnalysisPeriodEconomicAspectTypeEnum,
  ): Promise<RuralTimelineAnalysisPeriodEconomicAspectsEntity | null>;
}
