import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RuralTimelineAnalysisPeriodDocumentHolderTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/enum/rural-timeline-analysis-period-document-holder-type.enum';
import type { RuralTimelineAnalysisPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/enum/rural-timeline-analysis-period-document-type.enum';
import type { RuralTimelineAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/value-object/rural-timeline-analysis-period-document-id/rural-timeline-analysis-period-document-id.value-object';

export class GetRuralTimelineAnalysisPeriodDocumentQueryResult extends BaseBuildableObject {
  public readonly id: RuralTimelineAnalysisPeriodDocumentId;
  public readonly documentYear: number | null;
  public readonly documentHolderType: RuralTimelineAnalysisPeriodDocumentHolderTypeEnum | null;
  public readonly selfOwned: boolean | null;
  public readonly probatoryPurpose: string | null;
  public readonly analyzedAt: Date | null;
  public readonly document: string;
  public readonly type: RuralTimelineAnalysisPeriodDocumentTypeEnum;

  protected override readonly _type =
    GetRuralTimelineAnalysisPeriodDocumentQueryResult.name;
}
