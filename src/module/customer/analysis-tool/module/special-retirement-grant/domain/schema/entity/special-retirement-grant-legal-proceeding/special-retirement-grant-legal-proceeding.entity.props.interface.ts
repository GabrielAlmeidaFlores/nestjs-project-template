import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SpecialRetirementGrantLegalProceedingId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-legal-proceeding/value-object/special-retirement-grant-legal-proceeding-id/special-retirement-grant-legal-proceeding-id.value-object';

export interface SpecialRetirementGrantLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<SpecialRetirementGrantLegalProceedingId> {
  legalProceedingNumber: string;
}
