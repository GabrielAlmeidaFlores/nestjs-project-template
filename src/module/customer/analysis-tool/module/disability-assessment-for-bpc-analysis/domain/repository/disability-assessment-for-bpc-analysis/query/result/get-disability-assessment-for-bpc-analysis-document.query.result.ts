import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import type { DisabilityAssessmentForBpcAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-document/enum/disability-assessment-for-bpc-analysis-document-type.enum';

export class GetDisabilityAssessmentForBpcAnalysisDocumentQueryResult extends BaseBuildableObject {
  public readonly id: Guid;
  public readonly document: string;
  public readonly type: DisabilityAssessmentForBpcAnalysisDocumentTypeEnum;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetDisabilityAssessmentForBpcAnalysisDocumentQueryResult.name;
}
