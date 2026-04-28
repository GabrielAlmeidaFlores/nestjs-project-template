import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementReviewAnalysisResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-analysis-result/general-urban-retirement-review-analysis-result.entity';
import type { GeneralUrbanRetirementReviewAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-analysis-result/value-object/general-urban-retirement-review-analysis-result-id.value-object';

export abstract class GeneralUrbanRetirementReviewAnalysisResultCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementReviewAnalysisResult(
    props: GeneralUrbanRetirementReviewAnalysisResultEntity,
  ): TransactionType;

  public abstract updateGeneralUrbanRetirementReviewAnalysisResult(
    id: GeneralUrbanRetirementReviewAnalysisResultId,
    props: GeneralUrbanRetirementReviewAnalysisResultEntity,
  ): TransactionType;
}
