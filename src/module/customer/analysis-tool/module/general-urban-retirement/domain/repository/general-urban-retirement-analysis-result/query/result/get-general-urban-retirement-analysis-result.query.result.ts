import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GeneralUrbanRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-result/value-object/general-urban-retirement-analysis-result-id.value-object';

export class GetGeneralUrbanRetirementAnalysisResultQueryResult extends BaseBuildableObject {
  public readonly id: GeneralUrbanRetirementAnalysisResultId;
  public readonly generalUrbanRetirementCompleteAnalysis: string | null;
  public readonly generalUrbanRetirementCompleteAnalysisDownload: string | null;
  public readonly generalUrbanRetirementSimplifiedAnalysis: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetGeneralUrbanRetirementAnalysisResultQueryResult.name;
}
