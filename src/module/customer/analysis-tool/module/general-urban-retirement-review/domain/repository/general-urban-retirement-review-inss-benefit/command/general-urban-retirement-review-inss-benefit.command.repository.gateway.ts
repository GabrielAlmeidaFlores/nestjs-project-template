import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementReviewInssBenefitEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-inss-benefit/general-urban-retirement-review-inss-benefit.entity';

export abstract class GeneralUrbanRetirementReviewInssBenefitCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementReviewInssBenefit(
    props: GeneralUrbanRetirementReviewInssBenefitEntity,
  ): TransactionType;
}
