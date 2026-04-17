import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { AccidentBenefitRejectionWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-earnings-history/accident-benefit-rejection-work-period-earnings-history.entity';
import type { AccidentBenefitRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/value-object/accident-benefit-rejection-work-period-id.value-object';

export abstract class AccidentBenefitRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway {
  public abstract createAccidentBenefitRejectionWorkPeriodEarningsHistory(
    props: AccidentBenefitRejectionWorkPeriodEarningsHistoryEntity,
  ): TransactionType;

  public abstract deleteAllAccidentBenefitRejectionWorkPeriodEarningsHistoryByAccidentBenefitRejectionWorkPeriodId(
    id: AccidentBenefitRejectionWorkPeriodId,
  ): TransactionType;
}
