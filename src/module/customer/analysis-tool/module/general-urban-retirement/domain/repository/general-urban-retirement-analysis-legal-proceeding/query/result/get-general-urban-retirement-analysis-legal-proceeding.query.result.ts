import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GeneralUrbanRetirementAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-legal-proceeding/value-object/general-urban-retirement-analysis-legal-proceeding-id.value-object';

export class GetGeneralUrbanRetirementAnalysisLegalProceedingQueryResult extends BaseBuildableObject {
  public readonly id: GeneralUrbanRetirementAnalysisLegalProceedingId;
  public readonly legalProceeding: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetGeneralUrbanRetirementAnalysisLegalProceedingQueryResult.name;
}
