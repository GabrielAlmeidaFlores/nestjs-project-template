import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementReviewEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/general-urban-retirement-review.entity';
import type { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';

export abstract class GeneralUrbanRetirementReviewCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementReview(
    props: GeneralUrbanRetirementReviewEntity,
  ): TransactionType;

  public abstract updateGeneralUrbanRetirementReview(
    id: GeneralUrbanRetirementReviewId,
    props: GeneralUrbanRetirementReviewEntity,
  ): TransactionType;
}
