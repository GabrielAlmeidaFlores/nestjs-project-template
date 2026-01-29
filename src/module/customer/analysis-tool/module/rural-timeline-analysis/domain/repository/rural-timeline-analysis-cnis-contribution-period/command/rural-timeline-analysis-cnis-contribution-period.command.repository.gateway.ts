import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import type { RuralTimelineAnalysisCnisContributionPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/rural-timeline-analysis-cnis-contribution-period.entity';
import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';

export abstract class RuralTimelineAnalysisCnisContributionPeriodCommandRepositoryGateway {
  public abstract createRuralTimelineAnalysisCnisContributionPeriod(
    props: RuralTimelineAnalysisCnisContributionPeriodEntity,
  ): TransactionType;

  public abstract deleteRuralTimelineAnalysisCnisContributionPeriod(
    id: RuralTimelineAnalysisCnisContributionPeriodId,
  ): TransactionType;

  public abstract deleteAllByRuralTimelineId(
    ruralTimelineId: RuralTimelineAnalysisId,
  ): TransactionType;
}
