import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import type { DisabilityRetirementPlanningGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-document/enum/disability-retirement-planning-grant-document-type.enum';
import type { DisabilityRetirementPlanningGrantDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-document/value-object/disability-retirement-planning-grant-document-id.value-object';

export interface DisabilityRetirementPlanningGrantDocumentEntityPropsInterface extends BaseEntityPropsInterface<DisabilityRetirementPlanningGrantDocumentId> {
  document: string;
  type: DisabilityRetirementPlanningGrantDocumentTypeEnum;
  disabilityRetirementPlanningGrantId: DisabilityRetirementPlanningGrantId;
}
