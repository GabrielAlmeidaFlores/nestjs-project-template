import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';
import type { RuralTimelineAnalysisPeriodDocumentHolderTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/enum/rural-timeline-analysis-period-document-holder-type.enum';
import type { RuralTimelineAnalysisPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/enum/rural-timeline-analysis-period-document-type.enum';
import type { RuralTimelineAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-document/value-object/rural-timeline-analysis-period-document-id/rural-timeline-analysis-period-document-id.value-object';

export interface RuralTimelineAnalysisPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<RuralTimelineAnalysisPeriodDocumentId> {
  documentYear?: number | null;
  documentHolderType?: RuralTimelineAnalysisPeriodDocumentHolderTypeEnum | null;
  selfOwned?: boolean | null;
  probatoryPurpose?: string | null;
  document: string;
  type: RuralTimelineAnalysisPeriodDocumentTypeEnum;
  ruralTimelinePeriodId: RuralTimelineAnalysisPeriodId;
}
