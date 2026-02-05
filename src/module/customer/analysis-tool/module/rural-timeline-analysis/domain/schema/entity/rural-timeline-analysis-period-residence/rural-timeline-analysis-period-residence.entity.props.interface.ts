import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { RuralTimelineAnalysisPeriodResidenceId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-residence/value-object/rural-timeline-analysis-period-residence-id/rural-timeline-analysis-period-residence-id.value-object';

export interface RuralTimelineAnalysisPeriodResidenceEntityPropsInterface extends BaseEntityPropsInterface<RuralTimelineAnalysisPeriodResidenceId> {
  city: string;
  stateCode: StateCodeEnum;
  distanceToPropertyKm: DecimalValue;
}
