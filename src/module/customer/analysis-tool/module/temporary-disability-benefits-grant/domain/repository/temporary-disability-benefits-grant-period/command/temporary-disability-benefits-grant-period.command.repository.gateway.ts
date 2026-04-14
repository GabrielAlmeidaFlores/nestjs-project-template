import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import type { TemporaryDisabilityBenefitsGrantPeriodEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/temporary-disability-benefits-grant-period.entity';
import type { TemporaryDisabilityBenefitsGrantPeriodId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/value-object/temporary-disability-benefits-grant-period-id.value-object';

export abstract class TemporaryDisabilityBenefitsGrantPeriodCommandRepositoryGateway {
  public abstract createTemporaryDisabilityBenefitsGrantPeriod(
    props: TemporaryDisabilityBenefitsGrantPeriodEntity,
  ): TransactionType;

  public abstract updateTemporaryDisabilityBenefitsGrantPeriod(
    id: TemporaryDisabilityBenefitsGrantPeriodId,
    props: TemporaryDisabilityBenefitsGrantPeriodEntity,
  ): TransactionType;

  public abstract deleteAllByTemporaryDisabilityBenefitsGrantId(
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
  ): TransactionType;
}
