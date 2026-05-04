import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementReviewEarningsHistoryEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-earnings-history/general-urban-retirement-review-earnings-history.entity';
import type { GeneralUrbanRetirementReviewEarningsHistoryId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-earnings-history/value-object/general-urban-retirement-review-earnings-history-id.value-object';

export abstract class GeneralUrbanRetirementReviewEarningsHistoryCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementReviewEarningsHistory(
    props: GeneralUrbanRetirementReviewEarningsHistoryEntity,
  ): TransactionType;

  public abstract deleteGeneralUrbanRetirementReviewEarningsHistory(
    id: GeneralUrbanRetirementReviewEarningsHistoryId,
  ): TransactionType;
}
