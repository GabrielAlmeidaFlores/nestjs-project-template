import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';

import type { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';
import type { DisabilityRetirementPlanningDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-document/enum/disability-retirement-planning-document-type.enum';
import type { DisabilityRetirementPlanningDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-document/value-object/disability-retirement-planning-document-id.value-object';

export interface DisabilityRetirementPlanningDocumentEntityPropsInterface
  extends BaseEntityPropsInterface<DisabilityRetirementPlanningDocumentId> {
  disabilityRetirementPlanning: DisabilityRetirementPlanningEntity;
  document: string;
  type: DisabilityRetirementPlanningDocumentTypeEnum;
}
