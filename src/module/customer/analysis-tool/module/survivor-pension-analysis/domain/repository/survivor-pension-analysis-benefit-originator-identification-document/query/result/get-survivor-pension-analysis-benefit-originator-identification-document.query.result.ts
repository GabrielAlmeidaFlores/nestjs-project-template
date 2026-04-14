import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification-document/value-object/survivor-pension-analysis-benefit-originator-identification-document-id/survivor-pension-analysis-benefit-originator-identification-document-id.value-object';

export class GetSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentQueryResult extends BaseBuildableObject {
  public readonly id: SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentId;
  public readonly documentType: string;
  public readonly documentName: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetSurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentQueryResult.name;
}
