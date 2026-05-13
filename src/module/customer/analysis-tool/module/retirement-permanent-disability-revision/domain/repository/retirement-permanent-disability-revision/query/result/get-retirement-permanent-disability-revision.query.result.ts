import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';

export class GetRetirementPermanentDisabilityRevisionQueryResult extends BaseBuildableObject {
  public readonly id: RetirementPermanentDisabilityRevisionId;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  protected override readonly _type =
    GetRetirementPermanentDisabilityRevisionQueryResult.name;
}
