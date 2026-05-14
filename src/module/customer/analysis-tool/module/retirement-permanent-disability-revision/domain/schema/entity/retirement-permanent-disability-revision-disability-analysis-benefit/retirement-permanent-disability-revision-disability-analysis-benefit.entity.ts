import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit/value-object/retirement-permanent-disability-revision-disability-analysis-benefit-id.value-object';

import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis/value-object/retirement-permanent-disability-revision-disability-analysis-id.value-object';
import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit/retirement-permanent-disability-revision-disability-analysis-benefit.entity.props.interface';

export class RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitEntity extends BaseEntity<RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId> {
  public readonly retirementPermanentDisabilityRevisionDisabilityAnalysisId: RetirementPermanentDisabilityRevisionDisabilityAnalysisId;
  public readonly hasPreviousBenefit: boolean;
  public readonly benefitNumber: string | null;
  public readonly benefitStartDate: Date | null;
  public readonly benefitEndDate: Date | null;

  protected readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitEntity.name;

  public constructor(
    props: RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitEntityPropsInterface,
  ) {
    super(
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId,
      props,
    );

    this.retirementPermanentDisabilityRevisionDisabilityAnalysisId =
      props.retirementPermanentDisabilityRevisionDisabilityAnalysisId;
    this.hasPreviousBenefit = props.hasPreviousBenefit;
    this.benefitNumber = props.benefitNumber ?? null;
    this.benefitStartDate = props.benefitStartDate ?? null;
    this.benefitEndDate = props.benefitEndDate ?? null;
  }
}
