import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedInsuredStatusEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-insured-status/temporary-disability-benefits-terminated-insured-status.entity';

export abstract class TemporaryDisabilityBenefitsTerminatedInsuredStatusCommandRepositoryGateway {
  public abstract createTemporaryDisabilityBenefitsTerminatedInsuredStatus(
    props: TemporaryDisabilityBenefitsTerminatedInsuredStatusEntity,
  ): TransactionType;

  public abstract deleteAllByTemporaryDisabilityBenefitsTerminatedId(
    temporaryDisabilityBenefitsTerminatedId: TemporaryDisabilityBenefitsTerminatedId,
  ): TransactionType;
}
