import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import type { RuralTimelineCnisContributionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-document/rural-timeline-cnis-contribution-period-document.entity';
import type { RuralTimelineCnisContributionPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-document/value-object/rural-timeline-cnis-contribution-period-document-id/rural-timeline-cnis-contribution-period-document-id.value-object';

export abstract class RuralTimelineCnisContributionPeriodDocumentCommandRepositoryGateway {
  public abstract createRuralTimelineCnisContributionPeriodDocument(
    props: RuralTimelineCnisContributionPeriodDocumentEntity,
  ): TransactionType;

  public abstract updateRuralTimelineCnisContributionPeriodDocument(
    props: RuralTimelineCnisContributionPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteRuralTimelineCnisContributionPeriodDocument(
    id: RuralTimelineCnisContributionPeriodDocumentId,
  ): TransactionType;

  public abstract deleteAllByContributionPeriodId(
    contributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId,
  ): TransactionType;
}
