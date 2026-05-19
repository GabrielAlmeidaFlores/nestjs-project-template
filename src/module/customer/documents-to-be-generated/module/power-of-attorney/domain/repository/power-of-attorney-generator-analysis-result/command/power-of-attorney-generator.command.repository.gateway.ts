import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { PowerOfAttorneyGeneratorEntity } from '@module/customer/documents-to-be-generated/module/power-of-attorney/domain/schema/entity/power-of-attorney-generator-analysis-result/power-of-attorney-generator.entity';
import type { PowerOfAttorneyGeneratorId } from '@module/customer/documents-to-be-generated/module/power-of-attorney/domain/schema/entity/power-of-attorney-generator-analysis-result/value-object/power-of-attorney-generator-id/power-of-attorney-generator-id.value-object';

export abstract class PowerOfAttorneyGeneratorCommandRepositoryGateway {
  public abstract createPowerOfAttorneyGenerator(
    props: PowerOfAttorneyGeneratorEntity,
  ): TransactionType;

  public abstract updatePowerOfAttorneyGenerator(
    id: PowerOfAttorneyGeneratorId,
    props: PowerOfAttorneyGeneratorEntity,
  ): TransactionType;
}
