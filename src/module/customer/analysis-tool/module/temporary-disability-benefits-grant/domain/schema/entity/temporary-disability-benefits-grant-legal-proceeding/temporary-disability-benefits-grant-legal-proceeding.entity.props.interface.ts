import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import type { TemporaryDisabilityBenefitsGrantLegalProceedingId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-legal-proceeding/value-object/temporary-disability-benefits-grant-legal-proceeding-id.value-object';

export interface TemporaryDisabilityBenefitsGrantLegalProceedingEntityPropsInterface
  extends BaseEntityPropsInterface<TemporaryDisabilityBenefitsGrantLegalProceedingId> {
  legalProceedingNumber: string;
  temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId;
}
