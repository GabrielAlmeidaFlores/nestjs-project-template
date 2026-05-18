import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';

import type { RetirementPermanentDisabilityRevisionEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/retirement-permanent-disability-revision.entity.props.interface';
import type { RetirementPermanentDisabilityRevisionResultId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-result/value-object/retirement-permanent-disability-revision-result-id/retirement-permanent-disability-revision-result-id.value-object';

export class RetirementPermanentDisabilityRevisionEntity extends BaseEntity<RetirementPermanentDisabilityRevisionId> {
  public readonly analysisName: string | null;
  public readonly category: string | null;
  public readonly myInssPassword: string | null;
  public readonly retirementPermanentDisabilityRevisionResultId: RetirementPermanentDisabilityRevisionResultId | null;

  protected readonly _type = RetirementPermanentDisabilityRevisionEntity.name;

  public constructor(
    props: RetirementPermanentDisabilityRevisionEntityPropsInterface,
  ) {
    super(RetirementPermanentDisabilityRevisionId, props);
    this.analysisName = props.analysisName ?? null;
    this.category = props.category ?? null;
    this.myInssPassword = props.myInssPassword ?? null;
    this.retirementPermanentDisabilityRevisionResultId =
      props.retirementPermanentDisabilityRevisionResultId ?? null;
  }
}
