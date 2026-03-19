import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import type { AnalysisTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-analysis-result/enum/analysis-type.enum';
import type { GeneralUrbanRetirementGrantAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-analysis-result/value-object/general-urban-retirement-grant-analysis-result-id.value-object';

export class GetGeneralUrbanRetirementGrantAnalysisResultQueryResult extends BaseBuildableObject {
  public readonly id: GeneralUrbanRetirementGrantAnalysisResultId;
  public readonly analysisType: AnalysisTypeEnum | null;
  public readonly response: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  public readonly generalUrbanRetirementGrant: GeneralUrbanRetirementGrantEntity | null;

  protected override readonly _type =
    GetGeneralUrbanRetirementGrantAnalysisResultQueryResult.name;
}
