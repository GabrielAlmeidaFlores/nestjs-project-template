import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementAnalysisResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-result/general-urban-retirement-analysis-result.entity';
import type { GeneralUrbanRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-result/value-object/general-urban-retirement-analysis-result-id.value-object';

export abstract class GeneralUrbanRetirementAnalysisResultCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementAnalysisResult(
    props: GeneralUrbanRetirementAnalysisResultEntity,
  ): TransactionType;

  public abstract updateGeneralUrbanRetirementAnalysisResult(
    id: GeneralUrbanRetirementAnalysisResultId,
    props: GeneralUrbanRetirementAnalysisResultEntity,
  ): TransactionType;
}
