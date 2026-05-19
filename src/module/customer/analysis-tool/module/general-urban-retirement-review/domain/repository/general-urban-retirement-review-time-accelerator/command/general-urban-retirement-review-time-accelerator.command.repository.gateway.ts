import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementReviewTimeAcceleratorEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-time-accelerator/general-urban-retirement-review-time-accelerator.entity';
import type { GeneralUrbanRetirementReviewTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-time-accelerator/value-object/general-urban-retirement-review-time-accelerator-id.value-object';

export abstract class GeneralUrbanRetirementReviewTimeAcceleratorCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementReviewTimeAccelerator(
    props: GeneralUrbanRetirementReviewTimeAcceleratorEntity,
  ): TransactionType;

  public abstract updateGeneralUrbanRetirementReviewTimeAccelerator(
    id: GeneralUrbanRetirementReviewTimeAcceleratorId,
    props: GeneralUrbanRetirementReviewTimeAcceleratorEntity,
  ): TransactionType;
}
