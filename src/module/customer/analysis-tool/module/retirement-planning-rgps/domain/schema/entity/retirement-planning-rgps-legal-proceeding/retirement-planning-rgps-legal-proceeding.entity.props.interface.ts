import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import type { RetirementPlanningRgpsLegalProceedingId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-legal-proceeding/value-object/retirement-planning-rgps-legal-proceeding-id.value-object';

export interface RetirementPlanningRgpsLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<RetirementPlanningRgpsLegalProceedingId> {
  legalProceedingNumber: string;
  retirementPlanningRgps: RetirementPlanningRgpsEntity;
}
