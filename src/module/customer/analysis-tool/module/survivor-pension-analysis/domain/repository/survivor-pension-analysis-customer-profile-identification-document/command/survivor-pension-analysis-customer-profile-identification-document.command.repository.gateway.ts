import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SurvivorPensionAnalysisCustomerProfileIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification/value-object/survivor-pension-analysis-customer-profile-identification-id/survivor-pension-analysis-customer-profile-identification-id.value-object';
import type { SurvivorPensionAnalysisCustomerProfileIdentificationDocumentEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification-document/survivor-pension-analysis-customer-profile-identification-document.entity';
import type { SurvivorPensionAnalysisCustomerProfileIdentificationDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification-document/value-object/survivor-pension-analysis-customer-profile-identification-document-id/survivor-pension-analysis-customer-profile-identification-document-id.value-object';

export abstract class SurvivorPensionAnalysisCustomerProfileIdentificationDocumentCommandRepositoryGateway {
  public abstract createSurvivorPensionAnalysisCustomerProfileIdentificationDocument(
    props: SurvivorPensionAnalysisCustomerProfileIdentificationDocumentEntity,
  ): TransactionType;

  public abstract deleteSurvivorPensionAnalysisCustomerProfileIdentificationDocument(
    id: SurvivorPensionAnalysisCustomerProfileIdentificationDocumentId,
  ): TransactionType;

  public abstract deleteAllBySurvivorPensionAnalysisCustomerProfileIdentificationId(
    survivorPensionAnalysisCustomerProfileIdentificationId: SurvivorPensionAnalysisCustomerProfileIdentificationId,
  ): TransactionType;
}
