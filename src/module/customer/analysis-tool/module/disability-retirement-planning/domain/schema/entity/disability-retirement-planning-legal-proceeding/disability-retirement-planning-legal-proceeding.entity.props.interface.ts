import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';
import type { DisabilityRetirementPlanningLegalProceedingId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-legal-proceeding/value-object/disability-retirement-planning-legal-proceeding-id.value-object';

export interface DisabilityRetirementPlanningLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<DisabilityRetirementPlanningLegalProceedingId> {
  disabilityRetirementPlanning: DisabilityRetirementPlanningEntity;
  legalProceedingNumber: string;
}
