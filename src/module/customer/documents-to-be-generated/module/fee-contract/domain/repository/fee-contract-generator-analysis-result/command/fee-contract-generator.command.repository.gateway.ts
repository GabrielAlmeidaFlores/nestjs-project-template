import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { FeeContractGeneratorEntity } from '@module/customer/documents-to-be-generated/module/fee-contract/domain/schema/entity/fee-contract-generator-analysis-result/fee-contract-generator.entity';
import type { FeeContractGeneratorId } from '@module/customer/documents-to-be-generated/module/fee-contract/domain/schema/entity/fee-contract-generator-analysis-result/value-object/fee-contract-generator-id/fee-contract-generator-id.value-object';

export abstract class FeeContractGeneratorCommandRepositoryGateway {
  public abstract createFeeContractGenerator(
    props: FeeContractGeneratorEntity,
  ): TransactionType;

  public abstract updateFeeContractGenerator(
    id: FeeContractGeneratorId,
    props: FeeContractGeneratorEntity,
  ): TransactionType;
}
