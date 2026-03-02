import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DisabilityRetirementPlanningPeriodSpecialTimeEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time/disability-retirement-planning-period-special-time.entity';
import type { DisabilityRetirementPlanningPeriodSpecialTimeDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-special-time-document/value-object/disability-retirement-planning-period-special-time-document-id.value-object';

export interface DisabilityRetirementPlanningPeriodSpecialTimeDocumentEntityPropsInterface extends BaseEntityPropsInterface<DisabilityRetirementPlanningPeriodSpecialTimeDocumentId> {
  disabilityRetirementPlanningPeriodSpecialTime: DisabilityRetirementPlanningPeriodSpecialTimeEntity;
  document: string;
}
