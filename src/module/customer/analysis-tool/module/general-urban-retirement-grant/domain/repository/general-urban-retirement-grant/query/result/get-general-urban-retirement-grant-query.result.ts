import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
import type { GeneralUrbanRetirementGrantResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-result/general-urban-retirement-grant-result.entity';

export class GetGeneralUrbanRetirementGrantQueryResult extends BaseBuildableObject {
  public readonly id: GeneralUrbanRetirementGrantId;
  public readonly cnisDocument: string | null;
  public readonly generalUrbanRetirementGrantResult: GeneralUrbanRetirementGrantResultEntity | null;

  protected override readonly _type =
    GetGeneralUrbanRetirementGrantQueryResult.name;
}
