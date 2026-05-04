import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';
import type { BpcElderlyCessationLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-legal-proceeding/value-object/bpc-elderly-cessation-legal-proceeding-id/bpc-elderly-cessation-legal-proceeding-id.value-object';

export interface BpcElderlyCessationLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<BpcElderlyCessationLegalProceedingId> {
  legalProceedingNumber: string;
  bpcElderlyCessationId: BpcElderlyCessationId;
}
