import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialRetirementRejectionWorkSpecialPeriodId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-special-period/value-object/special-retirement-rejection-work-special-period-id.value-object';
import type { SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-special-period-legal-framework/value-object/special-retirement-rejection-work-special-period-legal-framework-id.value-object';

export interface SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkEntityPropsInterface extends BaseEntityPropsInterface<SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkId> {
  code?: string | null;
  description?: string | null;
  specialRetirementRejectionWorkSpecialPeriodId?: SpecialRetirementRejectionWorkSpecialPeriodId | null;
}
