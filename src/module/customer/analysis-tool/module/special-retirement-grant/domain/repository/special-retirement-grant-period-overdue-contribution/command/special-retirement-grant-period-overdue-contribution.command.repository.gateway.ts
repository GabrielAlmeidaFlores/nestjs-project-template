import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialRetirementGrantPeriodOverdueContributionEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-overdue-contribution/special-retirement-grant-period-overdue-contribution.entity';

export abstract class SpecialRetirementGrantPeriodOverdueContributionCommandRepositoryGateway {
  public abstract createSpecialRetirementGrantPeriodOverdueContribution(
    props: SpecialRetirementGrantPeriodOverdueContributionEntity,
  ): TransactionType;
}
