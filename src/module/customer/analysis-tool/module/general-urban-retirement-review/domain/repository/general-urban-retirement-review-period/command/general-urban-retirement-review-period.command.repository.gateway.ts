import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementReviewPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/general-urban-retirement-review-period.entity';
import type { GeneralUrbanRetirementReviewPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/value-object/general-urban-retirement-review-period-id.value-object';

export abstract class GeneralUrbanRetirementReviewPeriodCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementReviewPeriod(
    props: GeneralUrbanRetirementReviewPeriodEntity,
  ): TransactionType;

  public abstract updateGeneralUrbanRetirementReviewPeriod(
    id: GeneralUrbanRetirementReviewPeriodId,
    props: GeneralUrbanRetirementReviewPeriodEntity,
  ): TransactionType;
}
