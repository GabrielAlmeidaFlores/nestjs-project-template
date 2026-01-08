import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import type { RetirementPlanningRgpsInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-benefit/value-object/retirement-planning-rgps-inss-benefit-id.value-object';

export interface RetirementPlanningRgpsInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<RetirementPlanningRgpsInssBenefitId> {
  inssBenefitNumber: string;
  retirementPlanningRgps: RetirementPlanningRgpsEntity;
}
