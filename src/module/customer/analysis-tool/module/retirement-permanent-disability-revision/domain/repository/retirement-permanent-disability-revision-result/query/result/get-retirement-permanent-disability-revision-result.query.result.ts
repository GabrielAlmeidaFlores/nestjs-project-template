import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

import type { RetirementPermanentDisabilityRevisionResultId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-result/value-object/retirement-permanent-disability-revision-result-id/retirement-permanent-disability-revision-result-id.value-object';

export class GetRetirementPermanentDisabilityRevisionResultQueryResult extends BaseBuildableDtoObject {
  public readonly id: RetirementPermanentDisabilityRevisionResultId;
  public readonly retirementPermanentDisabilityRevisionCompleteAnalysis!:
    | string
    | null;
  public readonly retirementPermanentDisabilityRevisionSimplifiedAnalysis!:
    | string
    | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt?: Date | null;

  protected override readonly _type =
    GetRetirementPermanentDisabilityRevisionResultQueryResult.name;
}
