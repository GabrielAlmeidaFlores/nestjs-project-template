import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SurvivorPensionAnalysisCustomerProfileIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification/value-object/survivor-pension-analysis-customer-profile-identification-id/survivor-pension-analysis-customer-profile-identification-id.value-object';
import type { SurvivorPensionAnalysisCustomerProfileIdentificationDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification-document/value-object/survivor-pension-analysis-customer-profile-identification-document-id/survivor-pension-analysis-customer-profile-identification-document-id.value-object';

export interface SurvivorPensionAnalysisCustomerProfileIdentificationDocumentEntityPropsInterface extends BaseEntityPropsInterface<SurvivorPensionAnalysisCustomerProfileIdentificationDocumentId> {
  documentType: string;
  documentName: string;
  survivorPensionAnalysisCustomerProfileIdentificationId: SurvivorPensionAnalysisCustomerProfileIdentificationId;
}
