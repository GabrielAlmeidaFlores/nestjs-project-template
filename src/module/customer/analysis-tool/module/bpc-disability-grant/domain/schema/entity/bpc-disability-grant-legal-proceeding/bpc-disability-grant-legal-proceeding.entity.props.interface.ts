import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import type { BpcDisabilityGrantLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-proceeding/value-object/bpc-disability-grant-legal-proceeding-id/bpc-disability-grant-legal-proceeding-id.value-object';

export interface BpcDisabilityGrantLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<BpcDisabilityGrantLegalProceedingId> {
  legalProceedingNumber: string;
  BpcDisabilityGrantId: BpcDisabilityGrantId;
}
