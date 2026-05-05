import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementReviewSpecialPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-special-period/general-urban-retirement-review-special-period.entity';
import type { GeneralUrbanRetirementReviewSpecialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-special-period/value-object/general-urban-retirement-review-special-period-id.value-object';

export abstract class GeneralUrbanRetirementReviewSpecialPeriodCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementReviewSpecialPeriod(
    props: GeneralUrbanRetirementReviewSpecialPeriodEntity,
  ): TransactionType;

  public abstract updateGeneralUrbanRetirementReviewSpecialPeriod(
    id: GeneralUrbanRetirementReviewSpecialPeriodId,
    props: GeneralUrbanRetirementReviewSpecialPeriodEntity,
  ): TransactionType;
}
