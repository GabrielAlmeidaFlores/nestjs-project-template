import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GeneralUrbanRetirementGrantEarningsHistoryEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-earnings-history/general-urban-retirement-grant-earnings-history.entity';
import type { GeneralUrbanRetirementGrantEarningsHistoryId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-earnings-history/value-object/general-urban-retirement-grant-earnings-history-id.value-object';

export abstract class GeneralUrbanRetirementGrantEarningsHistoryCommandRepositoryGateway {
  public abstract createGeneralUrbanRetirementGrantEarningsHistory(
    props: GeneralUrbanRetirementGrantEarningsHistoryEntity,
  ): TransactionType;

  public abstract deleteGeneralUrbanRetirementGrantEarningsHistory(
    id: GeneralUrbanRetirementGrantEarningsHistoryId,
  ): TransactionType;
}
