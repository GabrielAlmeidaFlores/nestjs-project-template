import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetSurvivorPensionAnalysisBenefitOriginatorIdentificationQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-benefit-originator-identification/query/result/get-survivor-pension-analysis-benefit-originator-identification.query.result';
import type { GetSurvivorPensionAnalysisCustomerProfileIdentificationQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-customer-profile-identification/query/result/get-survivor-pension-analysis-customer-profile-identification.query.result';
import type { GetSurvivorPensionAnalysisDeceasedBenefitDependentsQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-benefit-dependents/query/result/get-survivor-pension-analysis-deceased-benefit-dependents.query.result';
import type { GetSurvivorPensionAnalysisDeceasedWorkHistoryQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-deceased-work-history/query/result/get-survivor-pension-analysis-deceased-work-history.query.result';
import type { GetSurvivorPensionAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-result/query/result/get-survivor-pension-analysis-result.query.result';
import type { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';

export class GetSurvivorPensionAnalysisWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: SurvivorPensionAnalysisId;
  public readonly customerProfileIdentification: GetSurvivorPensionAnalysisCustomerProfileIdentificationQueryResult | null;
  public readonly benefitOriginatorIdentification: GetSurvivorPensionAnalysisBenefitOriginatorIdentificationQueryResult | null;
  public readonly deceasedWorkHistory: GetSurvivorPensionAnalysisDeceasedWorkHistoryQueryResult | null;
  public readonly deceasedBenefitDependents: GetSurvivorPensionAnalysisDeceasedBenefitDependentsQueryResult[];
  public readonly result: GetSurvivorPensionAnalysisResultQueryResult | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetSurvivorPensionAnalysisWithRelationsQueryResult.name;
}
