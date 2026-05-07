import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit/value-object/retirement-permanent-disability-revision-disability-analysis-benefit-id.value-object';
import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit-declaration/value-object/retirement-permanent-disability-revision-disability-analysis-benefit-declaration-id.value-object';

export interface RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationEntityPropsInterface extends BaseEntityPropsInterface<RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationId> {
  retirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId: RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId;
  fileName: string;
}
