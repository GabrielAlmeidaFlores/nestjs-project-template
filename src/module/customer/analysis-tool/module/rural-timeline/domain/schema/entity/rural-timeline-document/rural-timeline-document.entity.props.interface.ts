import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralTimelineId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/value-object/rural-timeline-id/rural-timeline-id.value-object';
import type { RuralTimelineDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-document/enum/rural-timeline-document-type.enum';
import type { RuralTimelineDocumentId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-document/value-object/rural-timeline-document-id/rural-timeline-document-id.value-object';

export interface RuralTimelineDocumentEntityPropsInterface extends BaseEntityPropsInterface<RuralTimelineDocumentId> {
  type: RuralTimelineDocumentTypeEnum;
  document: string;
  ruralTimelineId: RuralTimelineId;
}
