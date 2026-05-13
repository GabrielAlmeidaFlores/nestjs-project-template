import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import type { RetirementPermanentDisabilityRevisionInssBenefitId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-inss-benefit/value-object/retirement-permanent-disability-revision-inss-benefit-id.value-object';

export interface RetirementPermanentDisabilityRevisionInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<RetirementPermanentDisabilityRevisionInssBenefitId> {
  inssBenefitNumber: string;
  retirementPermanentDisabilityRevision: RetirementPermanentDisabilityRevisionId;
}
