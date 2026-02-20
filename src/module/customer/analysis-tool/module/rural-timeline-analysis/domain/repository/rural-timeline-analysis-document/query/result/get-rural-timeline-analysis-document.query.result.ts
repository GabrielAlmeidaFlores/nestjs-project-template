import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RuralTimelineAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/enum/rural-timeline-analysis-document-type.enum';
import type { RuralTimelineAnalysisDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-document/value-object/rural-timeline-analysis-document-id/rural-timeline-analysis-document-id.value-object';

export class GetRuralTimelineAnalysisDocumentQueryResult extends BaseBuildableObject {
  public readonly id: RuralTimelineAnalysisDocumentId;
  public readonly type: RuralTimelineAnalysisDocumentTypeEnum;
  public readonly document: string;

  protected override readonly _type =
    GetRuralTimelineAnalysisDocumentQueryResult.name;
}
