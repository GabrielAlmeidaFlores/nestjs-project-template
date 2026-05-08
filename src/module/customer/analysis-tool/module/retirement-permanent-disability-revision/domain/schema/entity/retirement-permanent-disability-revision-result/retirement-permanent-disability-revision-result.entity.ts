import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPermanentDisabilityRevisionResultId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-result/value-object/retirement-permanent-disability-revision-result-id/retirement-permanent-disability-revision-result-id.value-object';

import type { RetirementPermanentDisabilityRevisionResultEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-result/retirement-permanent-disability-revision-result.entity.props.interface';

export class RetirementPermanentDisabilityRevisionResultEntity extends BaseEntity<RetirementPermanentDisabilityRevisionResultId> {
  public readonly retirementPermanentDisabilityRevisionFirstAnalysis:
    | string
    | null;
  public readonly retirementPermanentDisabilityRevisionCompleteAnalysis:
    | string
    | null;
  public readonly retirementPermanentDisabilityRevisionSimplifiedAnalysis:
    | string
    | null;

  protected readonly _type =
    RetirementPermanentDisabilityRevisionResultEntity.name;

  public constructor(
    props: RetirementPermanentDisabilityRevisionResultEntityPropsInterface,
  ) {
    super(RetirementPermanentDisabilityRevisionResultId, props);

    this.retirementPermanentDisabilityRevisionFirstAnalysis =
      props.retirementPermanentDisabilityRevisionFirstAnalysis ?? null;
    this.retirementPermanentDisabilityRevisionCompleteAnalysis =
      props.retirementPermanentDisabilityRevisionCompleteAnalysis ?? null;
    this.retirementPermanentDisabilityRevisionSimplifiedAnalysis =
      props.retirementPermanentDisabilityRevisionSimplifiedAnalysis ?? null;
  }
}
