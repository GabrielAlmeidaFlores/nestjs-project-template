import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-benefit-dependents-document/query/result/get-survivor-pension-analysis-deceased-benefit-dependents-document.query.result';
import type { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import type { SurvivorPensionAnalysisDeceasedBenefitDependentsId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents/value-object/survivor-pension-analysis-deceased-benefit-dependents-id/survivor-pension-analysis-deceased-benefit-dependents-id.value-object';

export class GetSurvivorPensionAnalysisDeceasedBenefitDependentsQueryResult extends BaseBuildableObject {
  public readonly id: SurvivorPensionAnalysisDeceasedBenefitDependentsId;
  public readonly survivorPensionAnalysisId: SurvivorPensionAnalysisId;
  public readonly dependentFullName: string | null;
  public readonly dependencyClassificationLevel: string | null;
  public readonly type: string | null;
  public readonly gender: string | null;
  public readonly dateOfBirth: Date | null;
  public readonly hasDisabilityOrInvalidity: boolean | null;
  public readonly unionCommencementDate: Date | null;
  public readonly documents: GetSurvivorPensionAnalysisDeceasedBenefitDependentsDocumentQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetSurvivorPensionAnalysisDeceasedBenefitDependentsQueryResult.name;
}
