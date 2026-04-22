import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import type { DisabilityRetirementPlanningRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-document/enum/disability-retirement-planning-rejection-document-type.enum';
import type { DisabilityRetirementPlanningRejectionDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-document/value-object/disability-retirement-planning-rejection-document-id/disability-retirement-planning-rejection-document-id.value-object';

export interface DisabilityRetirementPlanningRejectionDocumentEntityPropsInterface extends BaseEntityPropsInterface<DisabilityRetirementPlanningRejectionDocumentId> {
  document: string;
  type: DisabilityRetirementPlanningRejectionDocumentTypeEnum;
  disabilityRetirementPlanningRejectionId: DisabilityRetirementPlanningRejectionId;
}
