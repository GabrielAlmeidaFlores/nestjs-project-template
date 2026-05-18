import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryDisabilityBenefitsGrantResultEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-result/temporary-disability-benefits-grant-result.entity';

export abstract class TemporaryDisabilityBenefitsGrantResultCommandRepositoryGateway {
  public abstract createTemporaryDisabilityBenefitsGrantResult(
    props: TemporaryDisabilityBenefitsGrantResultEntity,
  ): TransactionType;

  public abstract updateTemporaryDisabilityBenefitsGrantResult(
    props: TemporaryDisabilityBenefitsGrantResultEntity,
  ): TransactionType;
}
