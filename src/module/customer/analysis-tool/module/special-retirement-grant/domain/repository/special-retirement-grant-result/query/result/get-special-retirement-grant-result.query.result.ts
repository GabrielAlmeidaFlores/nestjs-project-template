import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { SpecialRetirementGrantResultId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-result/value-object/special-retirement-grant-result-id/special-retirement-grant-result-id.value-object';

export class GetSpecialRetirementGrantResultQueryResult extends BaseBuildableObject {
  public readonly id: SpecialRetirementGrantResultId;
  public readonly specialRetirementGrantCompleteAnalysis: string | null;
  public readonly specialRetirementGrantSimplifiedAnalysis: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetSpecialRetirementGrantResultQueryResult.name;
}
