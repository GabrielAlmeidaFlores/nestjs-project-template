import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementAnalysisPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/general-urban-retirement-analysis-period.entity';
import type { GeneralUrbanRetirementAnalysisPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-period/value-object/general-urban-retirement-analysis-period-id.value-object';

export abstract class GeneralUrbanRetirementAnalysisPeriodCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementAnalysisPeriod(
    props: GeneralUrbanRetirementAnalysisPeriodEntity,
  ): TransactionType;

  public abstract deleteGeneralUrbanRetirementAnalysisPeriod(
    id: GeneralUrbanRetirementAnalysisPeriodId,
  ): TransactionType;
}
