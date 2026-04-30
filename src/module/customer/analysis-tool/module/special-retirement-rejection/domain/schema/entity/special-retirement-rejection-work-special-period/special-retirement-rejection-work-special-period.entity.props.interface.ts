import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/value-object/special-retirement-rejection-work-period-id.value-object';
import type { SpecialRetirementRejectionWorkSpecialPeriodId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-special-period/value-object/special-retirement-rejection-work-special-period-id.value-object';

export interface SpecialRetirementRejectionWorkSpecialPeriodEntityPropsInterface extends BaseEntityPropsInterface<SpecialRetirementRejectionWorkSpecialPeriodId> {
  recognizedSpecialTime?: boolean | null;
  companyName?: string | null;
  cnpj?: string | null;
  position?: string | null;
  comprobatoryDocument?: string | null;
  linkedToCnis?: boolean | null;
  containsCnisRemunerationInPeriod?: boolean | null;
  technicalJustification?: string | null;
  additionalObservation?: string | null;
  lawyerObservation?: string | null;
  exposureFrequency?: string | null;
  informationSource?: string | null;
  identifiedAgents?: string | null;
  efficientEpi?: boolean | null;
  specialRetirementRejectionWorkPeriodId?: SpecialRetirementRejectionWorkPeriodId | null;
}
