import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralTimelineAnalysisPeriodEconomicAspectsEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/rural-timeline-analysis-period-economic-aspects.entity';
import type { RuralTimelineAnalysisPeriodEconomicAspectsId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/value-object/rural-timeline-analysis-period-economic-aspects-id/rural-timeline-analysis-period-economic-aspects-id.value-object';

export abstract class RuralTimelineAnalysisPeriodEconomicAspectsCommandRepositoryGateway {
  public abstract createRuralTimelineAnalysisPeriodEconomicAspects(
    props: RuralTimelineAnalysisPeriodEconomicAspectsEntity,
  ): TransactionType;

  public abstract updateRuralTimelineAnalysisPeriodEconomicAspects(
    props: RuralTimelineAnalysisPeriodEconomicAspectsEntity,
  ): TransactionType;

  public abstract deleteRuralTimelineAnalysisPeriodEconomicAspects(
    id: RuralTimelineAnalysisPeriodEconomicAspectsId,
  ): TransactionType;
}
