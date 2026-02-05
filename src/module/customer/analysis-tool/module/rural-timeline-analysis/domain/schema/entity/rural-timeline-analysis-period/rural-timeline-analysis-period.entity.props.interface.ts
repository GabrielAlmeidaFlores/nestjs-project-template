import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import type { ProductionDestinationEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/enum/production-destination.enum';
import type { RuralTimelineAnalysisPeriodWorkRegimeTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/enum/rural-timeline-analysis-period-work-regime-type.enum';
import type { RuralTimelineAnalysisPeriodWorkerTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/enum/rural-timeline-analysis-period-worker-type.enum';
import type { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';
import type { RuralTimelineAnalysisPeriodPropertyId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/value-object/rural-timeline-analysis-period-property-id/rural-timeline-analysis-period-property-id.value-object';
import type { RuralTimelineAnalysisPeriodResidenceId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-residence/value-object/rural-timeline-analysis-period-residence-id/rural-timeline-analysis-period-residence-id.value-object';

export interface RuralTimelineAnalysisPeriodEntityPropsInterface extends BaseEntityPropsInterface<RuralTimelineAnalysisPeriodId> {
  startDate: Date;
  endDate: Date;
  workerType: RuralTimelineAnalysisPeriodWorkerTypeEnum;
  workRegimeType: RuralTimelineAnalysisPeriodWorkRegimeTypeEnum;
  productionDestination?: ProductionDestinationEnum | null;
  documentAnalysis?: string | null;
  ruralTimelineId: RuralTimelineAnalysisId;
  ruralTimelinePeriodPropertyId?: RuralTimelineAnalysisPeriodPropertyId | null;
  ruralTimelinePeriodResidenceId?: RuralTimelineAnalysisPeriodResidenceId | null;
}
