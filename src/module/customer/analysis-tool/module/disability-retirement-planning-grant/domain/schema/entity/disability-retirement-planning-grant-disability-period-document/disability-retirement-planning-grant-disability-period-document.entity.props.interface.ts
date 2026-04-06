import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DisabilityRetirementPlanningGrantDisabilityPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/value-object/disability-retirement-planning-grant-disability-period-id.value-object';
import type { DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period-document/enum/disability-retirement-planning-grant-disability-period-document-type.enum';
import type { DisabilityRetirementPlanningGrantDisabilityPeriodDocumentId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period-document/value-object/disability-retirement-planning-grant-disability-period-document-id.value-object';

export interface DisabilityRetirementPlanningGrantDisabilityPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<DisabilityRetirementPlanningGrantDisabilityPeriodDocumentId> {
  document: string;
  type: DisabilityRetirementPlanningGrantDisabilityPeriodDocumentTypeEnum;
  disabilityRetirementPlanningGrantDisabilityPeriodId: DisabilityRetirementPlanningGrantDisabilityPeriodId;
}
