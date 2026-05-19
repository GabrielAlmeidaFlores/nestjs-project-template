import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';
import type { BpcDisabilityDenialLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-legal-proceeding/value-object/bpc-disability-denial-legal-proceeding-id/bpc-disability-denial-legal-proceeding-id.value-object';

export interface BpcDisabilityDenialLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<BpcDisabilityDenialLegalProceedingId> {
  legalProceedingNumber: string;
  bpcDisabilityDenialId: BpcDisabilityDenialId;
}
