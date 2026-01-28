import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralTimelinePeriodId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/value-object/rural-timeline-period-id/rural-timeline-period-id.value-object';
import type { RuralTimelinePeriodEconomicAspectTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-economic-aspects/enum/rural-timeline-period-economic-aspect-type.enum';
import type { RuralTimelinePeriodEconomicAspectsId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-economic-aspects/value-object/rural-timeline-period-economic-aspects-id/rural-timeline-period-economic-aspects-id.value-object';

export interface RuralTimelinePeriodEconomicAspectsEntityPropsInterface extends BaseEntityPropsInterface<RuralTimelinePeriodEconomicAspectsId> {
  type: RuralTimelinePeriodEconomicAspectTypeEnum;
  content?: string | null;
  ruralTimelinePeriodId: RuralTimelinePeriodId;
}
