import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryDisabilityBenefitsTerminatedEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/temporary-disability-benefits-terminated.entity';
import type { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import type { TemporaryDisabilityBenefitsTerminatedResultId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-result/value-object/temporary-disability-benefits-terminated-result-id.value-object';

export abstract class TemporaryDisabilityBenefitsTerminatedCommandRepositoryGateway {
  public abstract createTemporaryDisabilityBenefitsTerminated(
    props: TemporaryDisabilityBenefitsTerminatedEntity,
  ): TransactionType;

  public abstract updateTemporaryDisabilityBenefitsTerminated(
    id: TemporaryDisabilityBenefitsTerminatedId,
    props: TemporaryDisabilityBenefitsTerminatedEntity,
  ): TransactionType;

  public abstract updateTemporaryDisabilityBenefitsTerminatedResultId(
    id: TemporaryDisabilityBenefitsTerminatedId,
    resultId: TemporaryDisabilityBenefitsTerminatedResultId,
  ): TransactionType;
}
