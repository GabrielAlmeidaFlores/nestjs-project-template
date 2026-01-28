import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralTimelineId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/value-object/rural-timeline-id/rural-timeline-id.value-object';
import type { ProductionDestinationEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/enum/production-destination.enum';
import type { RuralTimelinePeriodWorkRegimeTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/enum/rural-timeline-period-work-regime-type.enum';
import type { RuralTimelinePeriodWorkerTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/enum/rural-timeline-period-worker-type.enum';
import type { RuralTimelinePeriodId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/value-object/rural-timeline-period-id/rural-timeline-period-id.value-object';
import type { RuralTimelinePeriodPropertyId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-property/value-object/rural-timeline-period-property-id/rural-timeline-period-property-id.value-object';
import type { RuralTimelinePeriodResidenceId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-residence/value-object/rural-timeline-period-residence-id/rural-timeline-period-residence-id.value-object';

export interface RuralTimelinePeriodEntityPropsInterface extends BaseEntityPropsInterface<RuralTimelinePeriodId> {
  startDate: Date;
  endDate: Date;
  workerType: RuralTimelinePeriodWorkerTypeEnum;
  workRegimeType: RuralTimelinePeriodWorkRegimeTypeEnum;
  productionDestination?: ProductionDestinationEnum | null;
  documentAnalysis?: string | null;
  ruralTimelineId: RuralTimelineId;
  ruralTimelinePeriodPropertyId?: RuralTimelinePeriodPropertyId | null;
  ruralTimelinePeriodResidenceId?: RuralTimelinePeriodResidenceId | null;
}
