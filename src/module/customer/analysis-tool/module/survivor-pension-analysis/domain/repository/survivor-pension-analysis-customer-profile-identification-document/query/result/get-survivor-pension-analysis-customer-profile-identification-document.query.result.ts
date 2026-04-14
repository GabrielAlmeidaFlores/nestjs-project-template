import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { SurvivorPensionAnalysisCustomerProfileIdentificationDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification-document/value-object/survivor-pension-analysis-customer-profile-identification-document-id/survivor-pension-analysis-customer-profile-identification-document-id.value-object';

export class GetSurvivorPensionAnalysisCustomerProfileIdentificationDocumentQueryResult extends BaseBuildableObject {
  public readonly id: SurvivorPensionAnalysisCustomerProfileIdentificationDocumentId;
  public readonly documentType: string;
  public readonly documentName: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetSurvivorPensionAnalysisCustomerProfileIdentificationDocumentQueryResult.name;
}
