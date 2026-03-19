import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementAnalysisRemunerationEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-remuneration/general-urban-retirement-analysis-remuneration.entity';
import type { GeneralUrbanRetirementAnalysisRemunerationId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-remuneration/value-object/general-urban-retirement-analysis-remuneration-id.value-object';

export abstract class GeneralUrbanRetirementAnalysisRemunerationCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementAnalysisRemuneration(
    props: GeneralUrbanRetirementAnalysisRemunerationEntity,
  ): TransactionType;

  public abstract updateGeneralUrbanRetirementAnalysisRemuneration(
    id: GeneralUrbanRetirementAnalysisRemunerationId,
    props: GeneralUrbanRetirementAnalysisRemunerationEntity,
  ): TransactionType;

  public abstract deleteGeneralUrbanRetirementAnalysisRemuneration(
    id: GeneralUrbanRetirementAnalysisRemunerationId,
  ): TransactionType;
}
