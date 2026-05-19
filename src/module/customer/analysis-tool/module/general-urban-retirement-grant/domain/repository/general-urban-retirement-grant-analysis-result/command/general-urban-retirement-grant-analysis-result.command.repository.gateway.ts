import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementGrantAnalysisResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-analysis-result/general-urban-retirement-grant-analysis-result.entity';
import type { GeneralUrbanRetirementGrantAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-analysis-result/value-object/general-urban-retirement-grant-analysis-result-id.value-object';

export abstract class GeneralUrbanRetirementGrantAnalysisResultCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementGrantAnalysisResult(
    props: GeneralUrbanRetirementGrantAnalysisResultEntity,
  ): TransactionType;

  public abstract updateGeneralUrbanRetirementGrantAnalysisResult(
    id: GeneralUrbanRetirementGrantAnalysisResultId,
    props: GeneralUrbanRetirementGrantAnalysisResultEntity,
  ): TransactionType;
}
