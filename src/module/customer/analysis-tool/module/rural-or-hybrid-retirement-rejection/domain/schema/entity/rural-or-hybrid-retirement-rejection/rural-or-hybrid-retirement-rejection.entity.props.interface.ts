import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';

import type { RuralOrHybridRetirementRejectionActivityTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/enum/rural-or-hybrid-retirement-rejection-activity-type.enum';
import type { RuralOrHybridRetirementRejectionRequestedBenefitEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/enum/rural-or-hybrid-retirement-rejection-requested-benefit.enum';
import type { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import type { RuralOrHybridRetirementRejectionResultId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-result/value-object/rural-or-hybrid-retirement-rejection-result-id.value-object';

export interface RuralOrHybridRetirementRejectionEntityPropsInterface
  extends BaseEntityPropsInterface<RuralOrHybridRetirementRejectionId> {
  analysisName?: string | null;
  activityType?: RuralOrHybridRetirementRejectionActivityTypeEnum | null;
  applicationSubmissionDate?: Date | null;
  requestedBenefit?: RuralOrHybridRetirementRejectionRequestedBenefitEnum | null;
  dateOfRejection?: Date | null;
  ruralOrHybridRetirementRejectionResultId?: RuralOrHybridRetirementRejectionResultId | null;
}
