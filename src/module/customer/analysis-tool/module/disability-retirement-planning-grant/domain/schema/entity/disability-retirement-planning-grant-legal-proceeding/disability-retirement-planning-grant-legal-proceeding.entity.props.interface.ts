import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import type { DisabilityRetirementPlanningGrantLegalProceedingId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-legal-proceeding/value-object/disability-retirement-planning-grant-legal-proceeding-id.value-object';

export interface DisabilityRetirementPlanningGrantLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<DisabilityRetirementPlanningGrantLegalProceedingId> {
  legalProceedingNumber: string;
  disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId;
}
