import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import type { TemporaryDisabilityBenefitsGrantInsuredStatusEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status/temporary-disability-benefits-grant-insured-status.entity';
import type { TemporaryDisabilityBenefitsGrantInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-insured-status/value-object/temporary-disability-benefits-grant-insured-status-id.value-object';

export abstract class TemporaryDisabilityBenefitsGrantInsuredStatusCommandRepositoryGateway {
  public abstract createTemporaryDisabilityBenefitsGrantInsuredStatus(
    props: TemporaryDisabilityBenefitsGrantInsuredStatusEntity,
  ): TransactionType;

  public abstract updateTemporaryDisabilityBenefitsGrantInsuredStatus(
    id: TemporaryDisabilityBenefitsGrantInsuredStatusId,
    props: TemporaryDisabilityBenefitsGrantInsuredStatusEntity,
  ): TransactionType;

  public abstract deleteAllByTemporaryDisabilityBenefitsGrantId(
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
  ): TransactionType;
}
