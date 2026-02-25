import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { RuralTimelineAnalysisCnisContributionPeriodAdjustmentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-adjustment/rural-timeline-analysis-cnis-contribution-period-adjustment.entity';
import { RuralTimelineAnalysisCnisContributionPeriodAdjustmentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-adjustment/value-object/rural-timeline-analysis-cnis-contribution-period-adjustment-id/rural-timeline-analysis-cnis-contribution-period-adjustment-id.value-object';

export abstract class RuralTimelineAnalysisCnisContributionPeriodAdjustmentCommandRepositoryGateway {
  public abstract createRuralTimelineAnalysisCnisContributionPeriodAdjustment(
    props: RuralTimelineAnalysisCnisContributionPeriodAdjustmentEntity,
  ): TransactionType;

  public abstract deleteRuralTimelineAnalysisCnisContributionPeriodAdjustment(
    id: RuralTimelineAnalysisCnisContributionPeriodAdjustmentId,
  ): TransactionType;
}
