import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import type { RetirementPlanningRppsInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-inss-benefit/value-object/retirement-planning-rpps-inss-benefit-id.value-object';

export interface RetirementPlanningRppsInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<RetirementPlanningRppsInssBenefitId> {
  inssBenefitNumber: string;
  retirementPlanningRpps: RetirementPlanningRppsEntity;
}
