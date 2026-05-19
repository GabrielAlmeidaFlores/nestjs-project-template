import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/value-object/temporary-disability-benefits-terminated-work-periods-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods-earnings-history/temporary-disability-benefits-terminated-work-periods-earnings-history.entity';

export abstract class TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryCommandRepositoryGateway {
  public abstract createTemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistory(
    props: TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryEntity,
  ): TransactionType;

  public abstract deleteAllByTemporaryDisabilityBenefitsTerminatedWorkPeriodsId(
    id: TemporaryDisabilityBenefitsTerminatedWorkPeriodsId,
  ): TransactionType;
}
