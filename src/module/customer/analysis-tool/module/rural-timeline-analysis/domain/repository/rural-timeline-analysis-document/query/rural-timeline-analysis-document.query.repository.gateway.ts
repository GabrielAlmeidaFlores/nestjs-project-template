import type { RuralTimelineAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/rural-timeline-analysis-document.entity';
import type { RuralTimelineAnalysisDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/value-object/rural-timeline-analysis-document-id/rural-timeline-analysis-document-id.value-object';

export abstract class RuralTimelineAnalysisDocumentQueryRepositoryGateway {
  public abstract findOneById(
    id: RuralTimelineAnalysisDocumentId,
  ): Promise<RuralTimelineAnalysisDocumentEntity | null>;
}
