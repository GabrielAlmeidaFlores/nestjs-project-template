import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GeneralUrbanRetirementGrantSpecialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-special-period/value-object/general-urban-retirement-grant-special-period-id.value-object';

export class GetGeneralUrbanRetirementGrantSpecialPeriodQueryResult extends BaseBuildableObject {
  public readonly id: GeneralUrbanRetirementGrantSpecialPeriodId;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly response: string;

  protected override readonly _type =
    GetGeneralUrbanRetirementGrantSpecialPeriodQueryResult.name;
}
