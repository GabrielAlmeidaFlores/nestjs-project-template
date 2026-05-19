import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents-document/value-object/survivor-pension-analysis-deceased-benefit-dependents-document-id/survivor-pension-analysis-deceased-benefit-dependents-document-id.value-object';

export class GetSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentQueryResult extends BaseBuildableObject {
  public readonly id: SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentId;
  public readonly documentType: string;
  public readonly documentName: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentQueryResult.name;
}
