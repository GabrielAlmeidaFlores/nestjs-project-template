import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import type { RetirementPlanningRgpsSpecialPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-special-period/value-object/retirement-planning-rgps-special-period-id.value-object';

export interface RetirementPlanningRgpsSpecialPeriodEntityPropsInterface extends BaseEntityPropsInterface<RetirementPlanningRgpsSpecialPeriodId> {
  response: string;
  retirementPlanningRgps?: RetirementPlanningRgpsEntity | null;
}
