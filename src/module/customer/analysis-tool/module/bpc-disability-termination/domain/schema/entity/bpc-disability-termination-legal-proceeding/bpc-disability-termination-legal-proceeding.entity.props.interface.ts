import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import type { BpcDisabilityTerminationLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-legal-proceeding/value-object/bpc-disability-termination-legal-proceeding-id/bpc-disability-termination-legal-proceeding-id.value-object';

export interface BpcDisabilityTerminationLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<BpcDisabilityTerminationLegalProceedingId> {
  legalProceedingNumber: string;
  bpcDisabilityTerminationId: BpcDisabilityTerminationId;
}
