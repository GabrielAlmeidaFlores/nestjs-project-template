import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GeneralUrbanRetirementAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-document/enum/general-urban-retirement-analysis-document-type.enum';
import type { GeneralUrbanRetirementAnalysisDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-document/value-object/general-urban-retirement-analysis-document-id.value-object';

export class GetGeneralUrbanRetirementAnalysisDocumentQueryResult extends BaseBuildableObject {
  public readonly id: GeneralUrbanRetirementAnalysisDocumentId;
  public readonly type: GeneralUrbanRetirementAnalysisDocumentTypeEnum;
  public readonly document: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetGeneralUrbanRetirementAnalysisDocumentQueryResult.name;
}
