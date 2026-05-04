import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementReviewLegalProceedingEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-legal-proceeding/general-urban-retirement-review-legal-proceeding.entity';
import type { GeneralUrbanRetirementReviewLegalProceedingId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-legal-proceeding/value-object/general-urban-retirement-review-legal-proceeding-id.value-object';

export abstract class GeneralUrbanRetirementReviewLegalProceedingCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementReviewLegalProceeding(
    props: GeneralUrbanRetirementReviewLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteGeneralUrbanRetirementReviewLegalProceeding(
    id: GeneralUrbanRetirementReviewLegalProceedingId,
  ): TransactionType;
}
