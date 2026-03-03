import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPlanningRppsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps/retirement-planning-rpps-entity';
import type { RetirementPlanningRppsLegalProceedingId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-legal-proceeding/value-object/retirement-planning-rpps-legal-proceeding-id.value-object';

export interface RetirementPlanningRppsLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<RetirementPlanningRppsLegalProceedingId> {
  legalProceeding: string;
  retirementPlanningRpps: RetirementPlanningRppsEntity;
}
