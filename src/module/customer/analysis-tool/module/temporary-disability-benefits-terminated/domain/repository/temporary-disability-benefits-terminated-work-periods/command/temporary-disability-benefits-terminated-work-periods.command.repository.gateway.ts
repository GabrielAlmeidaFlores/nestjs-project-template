import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedWorkPeriodsEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/temporary-disability-benefits-terminated-work-periods.entity';

export abstract class TemporaryDisabilityBenefitsTerminatedWorkPeriodsCommandRepositoryGateway {
  public abstract createTemporaryDisabilityBenefitsTerminatedWorkPeriods(
    props: TemporaryDisabilityBenefitsTerminatedWorkPeriodsEntity,
  ): TransactionType;

  public abstract deleteAllByTemporaryDisabilityBenefitsTerminatedId(
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
  ): TransactionType;
}
