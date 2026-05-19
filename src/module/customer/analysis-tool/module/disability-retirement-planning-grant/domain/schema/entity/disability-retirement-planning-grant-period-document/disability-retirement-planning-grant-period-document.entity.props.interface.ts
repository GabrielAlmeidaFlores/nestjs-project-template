import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DisabilityRetirementPlanningGrantPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/value-object/disability-retirement-planning-grant-period-id.value-object';
import type { DisabilityRetirementPlanningGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period-document/value-object/disability-retirement-planning-grant-period-document-id.value-object';

export interface DisabilityRetirementPlanningGrantPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<DisabilityRetirementPlanningGrantPeriodDocumentId> {
  document: string;
  disabilityRetirementPlanningGrantPeriodId: DisabilityRetirementPlanningGrantPeriodId;
}
