import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RetirementPermanentDisabilityRevisionInssBenefitId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-inss-benefit/value-object/retirement-permanent-disability-revision-inss-benefit-id.value-object';

export class GetRetirementPermanentDisabilityRevisionInssBenefitQueryResult extends BaseBuildableObject {
  public readonly id: RetirementPermanentDisabilityRevisionInssBenefitId;
  public readonly inssBenefitNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt?: Date | null;

  protected override readonly _type =
    GetRetirementPermanentDisabilityRevisionInssBenefitQueryResult.name;
}
