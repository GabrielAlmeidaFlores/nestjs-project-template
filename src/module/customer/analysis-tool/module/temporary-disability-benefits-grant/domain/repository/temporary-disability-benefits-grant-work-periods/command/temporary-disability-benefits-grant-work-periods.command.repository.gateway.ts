import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import type { TemporaryDisabilityBenefitsGrantWorkPeriodsEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/temporary-disability-benefits-grant-work-periods.entity';
import type { TemporaryDisabilityBenefitsGrantWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-work-periods/value-object/temporary-disability-benefits-grant-work-periods-id.value-object';

export abstract class TemporaryDisabilityBenefitsGrantWorkPeriodsCommandRepositoryGateway {
  public abstract createTemporaryDisabilityBenefitsGrantWorkPeriods(
    props: TemporaryDisabilityBenefitsGrantWorkPeriodsEntity,
  ): TransactionType;

  public abstract updateTemporaryDisabilityBenefitsGrantWorkPeriods(
    id: TemporaryDisabilityBenefitsGrantWorkPeriodsId,
    props: TemporaryDisabilityBenefitsGrantWorkPeriodsEntity,
  ): TransactionType;

  public abstract deleteAllByTemporaryDisabilityBenefitsGrantId(
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
  ): TransactionType;
}
