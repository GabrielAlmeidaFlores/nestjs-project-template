import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementDenialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period/value-object/general-urban-retirement-denial-period-id/general-urban-retirement-denial-period-id.value-object';
import type { GeneralUrbanRetirementDenialPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-period-earnings-history/general-urban-retirement-denial-period-earnings-history.entity';

export abstract class GeneralUrbanRetirementDenialPeriodEarningsHistoryCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementDenialPeriodEarningsHistory(
    props: GeneralUrbanRetirementDenialPeriodEarningsHistoryEntity,
  ): TransactionType;

  public abstract deleteAllByGeneralUrbanRetirementDenialPeriodId(
    generalUrbanRetirementDenialPeriodId: GeneralUrbanRetirementDenialPeriodId,
  ): TransactionType;
}
