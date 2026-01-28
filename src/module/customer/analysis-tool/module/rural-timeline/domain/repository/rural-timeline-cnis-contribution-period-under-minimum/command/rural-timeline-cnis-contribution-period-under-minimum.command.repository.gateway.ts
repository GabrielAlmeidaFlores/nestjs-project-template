import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralTimelineCnisContributionPeriodUnderMinimumEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period-under-minimum/rural-timeline-cnis-contribution-period-under-minimum.entity';
import type { RuralTimelineCnisContributionPeriodUnderMinimumId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period-under-minimum/value-object/rural-timeline-cnis-contribution-period-under-minimum-id/rural-timeline-cnis-contribution-period-under-minimum-id.value-object';

export abstract class RuralTimelineCnisContributionPeriodUnderMinimumCommandRepositoryGateway {
  public abstract createRuralTimelineCnisContributionPeriodUnderMinimum(
    props: RuralTimelineCnisContributionPeriodUnderMinimumEntity,
  ): TransactionType;

  public abstract deleteRuralTimelineCnisContributionPeriodUnderMinimum(
    id: RuralTimelineCnisContributionPeriodUnderMinimumId,
  ): TransactionType;
}
