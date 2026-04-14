import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SurvivorPensionAnalysisCustomerProfileIdentificationEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification/survivor-pension-analysis-customer-profile-identification.entity';
import type { SurvivorPensionAnalysisCustomerProfileIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification/value-object/survivor-pension-analysis-customer-profile-identification-id/survivor-pension-analysis-customer-profile-identification-id.value-object';

export abstract class SurvivorPensionAnalysisCustomerProfileIdentificationCommandRepositoryGateway {
  public abstract createSurvivorPensionAnalysisCustomerProfileIdentification(
    props: SurvivorPensionAnalysisCustomerProfileIdentificationEntity,
  ): TransactionType;

  public abstract updateSurvivorPensionAnalysisCustomerProfileIdentification(
    id: SurvivorPensionAnalysisCustomerProfileIdentificationId,
    props: SurvivorPensionAnalysisCustomerProfileIdentificationEntity,
  ): TransactionType;

  public abstract deleteSurvivorPensionAnalysisCustomerProfileIdentification(
    id: SurvivorPensionAnalysisCustomerProfileIdentificationId,
  ): TransactionType;
}
