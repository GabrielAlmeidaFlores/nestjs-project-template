import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';

import type { DisabilityRetirementPlanningPeriodDisabilityEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/disability-retirement-planning-period-disability.entity';
import type { DisabilityRetirementPlanningPeriodDisabilityDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability-document/value-object/disability-retirement-planning-period-disability-document-id.value-object';

export interface DisabilityRetirementPlanningPeriodDisabilityDocumentEntityPropsInterface
  extends BaseEntityPropsInterface<DisabilityRetirementPlanningPeriodDisabilityDocumentId> {
  disabilityRetirementPlanningPeriodDisability: DisabilityRetirementPlanningPeriodDisabilityEntity;
  document: string;
}
