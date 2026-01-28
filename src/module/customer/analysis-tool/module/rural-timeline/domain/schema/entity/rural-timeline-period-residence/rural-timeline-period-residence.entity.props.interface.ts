import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { RuralTimelinePeriodResidenceId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-residence/value-object/rural-timeline-period-residence-id/rural-timeline-period-residence-id.value-object';

export interface RuralTimelinePeriodResidenceEntityPropsInterface extends BaseEntityPropsInterface<RuralTimelinePeriodResidenceId> {
  city: string;
  stateCode: StateCodeEnum;
  distanceToPropertyKm: DecimalValue;
}
