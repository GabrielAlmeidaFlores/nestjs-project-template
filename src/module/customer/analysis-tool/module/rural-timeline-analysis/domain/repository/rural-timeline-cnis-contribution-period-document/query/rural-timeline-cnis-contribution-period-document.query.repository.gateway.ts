import type { GetRuralTimelineCnisContributionPeriodDocumentQueryResultType } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-cnis-contribution-period-document/query/result/get-rural-timeline-cnis-contribution-period-document.query.result';
import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import type { RuralTimelineCnisContributionPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-document/value-object/rural-timeline-cnis-contribution-period-document-id/rural-timeline-cnis-contribution-period-document-id.value-object';

export abstract class RuralTimelineCnisContributionPeriodDocumentQueryRepositoryGateway {
  public abstract findOneRuralTimelineCnisContributionPeriodDocumentById(
    id: RuralTimelineCnisContributionPeriodDocumentId,
  ): Promise<GetRuralTimelineCnisContributionPeriodDocumentQueryResultType | null>;

  public abstract listRuralTimelineCnisContributionPeriodDocumentsByPeriodId(
    periodId: RuralTimelineAnalysisCnisContributionPeriodId,
  ): Promise<GetRuralTimelineCnisContributionPeriodDocumentQueryResultType[]>;
}
