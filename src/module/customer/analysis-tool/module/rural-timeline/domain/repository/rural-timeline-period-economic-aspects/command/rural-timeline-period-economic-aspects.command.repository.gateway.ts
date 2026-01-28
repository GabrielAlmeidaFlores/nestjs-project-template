import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralTimelinePeriodEconomicAspectsEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-economic-aspects/rural-timeline-period-economic-aspects.entity';
import type { RuralTimelinePeriodEconomicAspectsId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-economic-aspects/value-object/rural-timeline-period-economic-aspects-id/rural-timeline-period-economic-aspects-id.value-object';

export abstract class RuralTimelinePeriodEconomicAspectsCommandRepositoryGateway {
  public abstract createRuralTimelinePeriodEconomicAspects(
    props: RuralTimelinePeriodEconomicAspectsEntity,
  ): TransactionType;

  public abstract deleteRuralTimelinePeriodEconomicAspects(
    id: RuralTimelinePeriodEconomicAspectsId,
  ): TransactionType;
}
