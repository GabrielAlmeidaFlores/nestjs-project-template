import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DisabilityRetirementPlanningRejectionCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/enum/disability-retirement-planning-rejection-category.enum';
import type { DisabilityRetirementPlanningRejectionDenialReasonEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/enum/disability-retirement-planning-rejection-denial-reason.enum';
import type { DisabilityRetirementPlanningRejectionRetirementTypeEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/enum/disability-retirement-planning-rejection-retirement-type.enum';
import type { DisabilityRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection/value-object/disability-retirement-planning-rejection-id/disability-retirement-planning-rejection-id.value-object';
import type { DisabilityRetirementPlanningRejectionResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-result/value-object/disability-retirement-planning-rejection-result-id/disability-retirement-planning-rejection-result-id.value-object';

export interface DisabilityRetirementPlanningRejectionEntityPropsInterface extends BaseEntityPropsInterface<DisabilityRetirementPlanningRejectionId> {
  analysisName?: string | null;
  requestEntryDate?: Date | null;
  denialDate?: Date | null;
  disabilityRetirementPlanningRejectionResultId?: DisabilityRetirementPlanningRejectionResultId | null;
  requestedBenefitType?: string | null;
  category?: DisabilityRetirementPlanningRejectionCategoryEnum | null;
  retirementType?: DisabilityRetirementPlanningRejectionRetirementTypeEnum | null;
  denialReason?: DisabilityRetirementPlanningRejectionDenialReasonEnum | null;
  denialReasonDescription?: string | null;
}
