import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-legal-proceeding/general-urban-retirement-analysis-legal-proceeding.entity';
import type { GeneralUrbanRetirementAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-legal-proceeding/value-object/general-urban-retirement-analysis-legal-proceeding-id.value-object';

export abstract class GeneralUrbanRetirementAnalysisLegalProceedingCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementAnalysisLegalProceeding(
    props: GeneralUrbanRetirementAnalysisLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteGeneralUrbanRetirementAnalysisLegalProceeding(
    id: GeneralUrbanRetirementAnalysisLegalProceedingId,
  ): TransactionType;
}
