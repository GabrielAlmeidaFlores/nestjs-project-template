import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GeneralUrbanRetirementAnalysisPeriodDocumentTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-document/enum/general-urban-retirement-analysis-period-document-type.enum';
import type { GeneralUrbanRetirementAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-document/value-object/general-urban-retirement-analysis-period-document-id.value-object';

export class GetGeneralUrbanRetirementAnalysisPeriodDocumentQueryResult extends BaseBuildableObject {
  public readonly id: GeneralUrbanRetirementAnalysisPeriodDocumentId;
  public readonly document: string;
  public readonly documentType: GeneralUrbanRetirementAnalysisPeriodDocumentTypeEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetGeneralUrbanRetirementAnalysisPeriodDocumentQueryResult.name;
}
