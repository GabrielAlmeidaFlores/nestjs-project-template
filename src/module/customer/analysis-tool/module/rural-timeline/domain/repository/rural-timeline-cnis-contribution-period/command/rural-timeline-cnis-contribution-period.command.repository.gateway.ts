import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralTimelineCnisContributionPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period/rural-timeline-cnis-contribution-period.entity';
import type { RuralTimelineCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period/value-object/rural-timeline-cnis-contribution-period-id/rural-timeline-cnis-contribution-period-id.value-object';

export abstract class RuralTimelineCnisContributionPeriodCommandRepositoryGateway {
  public abstract createRuralTimelineCnisContributionPeriod(
    props: RuralTimelineCnisContributionPeriodEntity,
  ): TransactionType;

  public abstract deleteRuralTimelineCnisContributionPeriod(
    id: RuralTimelineCnisContributionPeriodId,
  ): TransactionType;
}
