import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DisabilityRetirementPlanningRejectionPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/value-object/disability-retirement-planning-rejection-period-id/disability-retirement-planning-rejection-period-id.value-object';
import type { DisabilityRetirementPlanningRejectionPeriodDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period-document/value-object/disability-retirement-planning-rejection-period-document-id/disability-retirement-planning-rejection-period-document-id.value-object';

export interface DisabilityRetirementPlanningRejectionPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<DisabilityRetirementPlanningRejectionPeriodDocumentId> {
  document: string;
  disabilityRetirementPlanningRejectionPeriodId: DisabilityRetirementPlanningRejectionPeriodId;
}
