import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';
import type { BpcElderlyCessationInssBenefitId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-inss-benefit/value-object/bpc-elderly-cessation-inss-benefit-id/bpc-elderly-cessation-inss-benefit-id.value-object';

export interface BpcElderlyCessationInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<BpcElderlyCessationInssBenefitId> {
  inssBenefitNumber: string;
  bpcElderlyCessationId: BpcElderlyCessationId;
}
