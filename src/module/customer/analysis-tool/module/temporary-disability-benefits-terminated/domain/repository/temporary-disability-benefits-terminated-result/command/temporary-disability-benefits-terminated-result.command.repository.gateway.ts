import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryDisabilityBenefitsTerminatedResultEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-result/temporary-disability-benefits-terminated-result.entity';

export abstract class TemporaryDisabilityBenefitsTerminatedResultCommandRepositoryGateway {
  public abstract createTemporaryDisabilityBenefitsTerminatedResult(
    props: TemporaryDisabilityBenefitsTerminatedResultEntity,
  ): TransactionType;

  public abstract updateTemporaryDisabilityBenefitsTerminatedResult(
    props: TemporaryDisabilityBenefitsTerminatedResultEntity,
  ): TransactionType;
}
