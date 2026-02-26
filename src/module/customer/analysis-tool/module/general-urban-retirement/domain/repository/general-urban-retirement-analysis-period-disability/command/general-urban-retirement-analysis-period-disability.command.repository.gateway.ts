import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementAnalysisPeriodDisabilityEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/general-urban-retirement-analysis-period-disability.entity';
import type { GeneralUrbanRetirementAnalysisPeriodDisabilityId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-disability/value-object/general-urban-retirement-analysis-period-disability-id.value-object';

export abstract class GeneralUrbanRetirementAnalysisPeriodDisabilityCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementAnalysisPeriodDisability(
    props: GeneralUrbanRetirementAnalysisPeriodDisabilityEntity,
  ): TransactionType;

  public abstract deleteGeneralUrbanRetirementAnalysisPeriodDisability(
    id: GeneralUrbanRetirementAnalysisPeriodDisabilityId,
  ): TransactionType;
}
