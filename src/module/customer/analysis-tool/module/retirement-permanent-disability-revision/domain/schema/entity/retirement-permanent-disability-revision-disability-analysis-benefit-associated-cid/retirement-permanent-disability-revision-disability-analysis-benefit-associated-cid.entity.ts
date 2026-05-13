import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit-associated-cid/value-object/retirement-permanent-disability-revision-disability-analysis-benefit-associated-cid-id.value-object';

import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit/value-object/retirement-permanent-disability-revision-disability-analysis-benefit-id.value-object';
import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit-associated-cid/retirement-permanent-disability-revision-disability-analysis-benefit-associated-cid.entity.props.interface';

export class RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidEntity extends BaseEntity<RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidId> {
  public readonly retirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId: RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId;
  public readonly cid: string;

  protected readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidEntity.name;

  public constructor(
    props: RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidEntityPropsInterface,
  ) {
    super(
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidId,
      props,
    );

    this.retirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId =
      props.retirementPermanentDisabilityRevisionDisabilityAnalysisBenefitId;
    this.cid = props.cid;
  }
}
