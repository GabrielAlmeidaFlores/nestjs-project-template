import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-associated-cid/value-object/retirement-permanent-disability-revision-disability-analysis-associated-cid-id.value-object';

import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis/value-object/retirement-permanent-disability-revision-disability-analysis-id.value-object';
import type { RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-disability-analysis-associated-cid/retirement-permanent-disability-revision-disability-analysis-associated-cid.entity.props.interface';

export class RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidEntity extends BaseEntity<RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidId> {
  public readonly retirementPermanentDisabilityRevisionDisabilityAnalysisId: RetirementPermanentDisabilityRevisionDisabilityAnalysisId;
  public readonly cid: string;

  protected readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidEntity.name;

  public constructor(
    props: RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidEntityPropsInterface,
  ) {
    super(
      RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidId,
      props,
    );

    this.retirementPermanentDisabilityRevisionDisabilityAnalysisId =
      props.retirementPermanentDisabilityRevisionDisabilityAnalysisId;
    this.cid = props.cid;
  }
}
