import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementAnalysisPeriodSpecialTimeEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-special-time/general-urban-retirement-analysis-period-special-time.entity';
import type { GeneralUrbanRetirementAnalysisPeriodSpecialTimeId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period-special-time/value-object/general-urban-retirement-analysis-period-special-time-id.value-object';

export abstract class GeneralUrbanRetirementAnalysisPeriodSpecialTimeCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementAnalysisPeriodSpecialTime(
    props: GeneralUrbanRetirementAnalysisPeriodSpecialTimeEntity,
  ): TransactionType;

  public abstract deleteGeneralUrbanRetirementAnalysisPeriodSpecialTime(
    id: GeneralUrbanRetirementAnalysisPeriodSpecialTimeId,
  ): TransactionType;

  public abstract updateLawyerObservations(
    id: GeneralUrbanRetirementAnalysisPeriodSpecialTimeId,
    lawyerObservations: string | null,
  ): TransactionType;
}
