import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementAnalysisEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/general-urban-retirement-analysis-entity';
import type { GeneralUrbanRetirementAnalysisId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis/value-object/general-urban-retirement-analysis-id.value-object';

export abstract class GeneralUrbanRetirementAnalysisCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementAnalysis(
    props: GeneralUrbanRetirementAnalysisEntity,
  ): TransactionType;

  public abstract updateGeneralUrbanRetirementAnalysis(
    id: GeneralUrbanRetirementAnalysisId,
    props: GeneralUrbanRetirementAnalysisEntity,
  ): TransactionType;

  public abstract deleteGeneralUrbanRetirementAnalysis(
    id: GeneralUrbanRetirementAnalysisId,
  ): TransactionType;
}
