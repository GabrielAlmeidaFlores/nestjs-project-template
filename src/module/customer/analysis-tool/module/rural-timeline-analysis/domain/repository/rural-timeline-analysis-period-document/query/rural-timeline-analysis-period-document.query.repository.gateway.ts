import type { RuralTimelineAnalysisPeriodDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/rural-timeline-analysis-period-document.entity';
import type { RuralTimelineAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/value-object/rural-timeline-analysis-period-document-id/rural-timeline-analysis-period-document-id.value-object';

export abstract class RuralTimelineAnalysisPeriodDocumentQueryRepositoryGateway {
  public abstract findOneById(
    id: RuralTimelineAnalysisPeriodDocumentId,
  ): Promise<RuralTimelineAnalysisPeriodDocumentEntity | null>;
}
