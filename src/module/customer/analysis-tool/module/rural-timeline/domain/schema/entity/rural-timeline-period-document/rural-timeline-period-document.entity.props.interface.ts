import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralTimelinePeriodId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/value-object/rural-timeline-period-id/rural-timeline-period-id.value-object';
import type { RuralTimelinePeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-document/enum/rural-timeline-period-document-type.enum';
import type { RuralTimelinePeriodDocumentId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-document/value-object/rural-timeline-period-document-id/rural-timeline-period-document-id.value-object';

export interface RuralTimelinePeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<RuralTimelinePeriodDocumentId> {
  documentYear?: number | null;
  documentHolderType?: string | null;
  selfOwned?: boolean | null;
  probatoryPurpose?: string | null;
  document: string;
  type: RuralTimelinePeriodDocumentTypeEnum;
  ruralTimelinePeriodId: RuralTimelinePeriodId;
}
