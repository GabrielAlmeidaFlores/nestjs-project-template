import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { GetSurvivorPensionAnalysisCustomerProfileIdentificationDocumentQueryResult } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-customer-profile-identification-document/query/result/get-survivor-pension-analysis-customer-profile-identification-document.query.result';
import type { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import type { SurvivorPensionAnalysisCustomerProfileIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification/value-object/survivor-pension-analysis-customer-profile-identification-id/survivor-pension-analysis-customer-profile-identification-id.value-object';

export class GetSurvivorPensionAnalysisCustomerProfileIdentificationQueryResult extends BaseBuildableObject {
  public readonly id: SurvivorPensionAnalysisCustomerProfileIdentificationId;
  public readonly survivorPensionAnalysisId: SurvivorPensionAnalysisId;
  public readonly analysisToolClientId: AnalysisToolClientId | null;
  public readonly clientJobTitle: string | null;
  public readonly legalProceedingNumber: string | null;
  public readonly inssBenefitNumber: string | null;
  public readonly analysisName: string | null;
  public readonly analysisPurpose: string | null;
  public readonly documents: GetSurvivorPensionAnalysisCustomerProfileIdentificationDocumentQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetSurvivorPensionAnalysisCustomerProfileIdentificationQueryResult.name;
}
