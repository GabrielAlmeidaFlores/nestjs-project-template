import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementReviewResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/general-urban-retirement-review-result.entity';
import type { GeneralUrbanRetirementReviewResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-result/value-object/general-urban-retirement-review-result-id.value-object';

export abstract class GeneralUrbanRetirementReviewResultCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementReviewResult(
    props: GeneralUrbanRetirementReviewResultEntity,
  ): TransactionType;

  public abstract updateGeneralUrbanRetirementReviewResult(
    id: GeneralUrbanRetirementReviewResultId,
    props: GeneralUrbanRetirementReviewResultEntity,
  ): TransactionType;
}
