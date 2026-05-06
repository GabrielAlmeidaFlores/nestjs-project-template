import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import type { SpecialRetirementRejectionResultId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-result/value-object/special-retirement-rejection-result-id.value-object';

export interface SpecialRetirementRejectionEntityPropsInterface extends BaseEntityPropsInterface<SpecialRetirementRejectionId> {
  analysisName?: string | null;
  category?: string | null;
  requirementStartDate?: Date | null;
  rejectionDate?: Date | null;
  harmfulAgents?: string[] | null;
  otherAgents?: string | null;
  rejectionReason?: string | null;
  otherRejectionReason?: string | null;
  specialRetirementRejectionResultId?: SpecialRetirementRejectionResultId | null;
}
