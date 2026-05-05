import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import type { SpecialRetirementRejectionLegalProceedingId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-legal-proceeding/value-object/special-retirement-rejection-legal-proceeding-id.value-object';

export interface SpecialRetirementRejectionLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<SpecialRetirementRejectionLegalProceedingId> {
  number?: string | null;
  specialRetirementRejectionId?: SpecialRetirementRejectionId | null;
}
