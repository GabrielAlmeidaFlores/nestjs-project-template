import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import type { BpcDisabilityTerminationInssBenefitId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-inss-benefit/value-object/bpc-disability-termination-inss-benefit-id/bpc-disability-termination-inss-benefit-id.value-object';

export interface BpcDisabilityTerminationInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<BpcDisabilityTerminationInssBenefitId> {
  inssBenefitNumber: string;
  bpcDisabilityTerminationId: BpcDisabilityTerminationId;
}
