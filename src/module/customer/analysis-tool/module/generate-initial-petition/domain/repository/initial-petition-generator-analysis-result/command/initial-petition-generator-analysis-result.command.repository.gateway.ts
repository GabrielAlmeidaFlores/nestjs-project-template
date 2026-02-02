import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { InitialPetitionGeneratorEntity } from '@module/customer/analysis-tool/module/generate-initial-petition/domain/schema/entity/initial-petition-generator-analysis-result/initial-petition-generator-analysis-result.entity';
import type { InitialPetitionGeneratorId } from '@module/customer/analysis-tool/module/generate-initial-petition/domain/schema/entity/initial-petition-generator-analysis-result/value-object/initial-petition-generator-id/initial-petition-generator-id.value-object';

export abstract class InitialPetitionGeneratorCommandRepositoryGateway {
  public abstract createInitialPetitionGenerator(
    props: InitialPetitionGeneratorEntity,
  ): TransactionType;

  public abstract updateInitialPetitionGenerator(
    id: InitialPetitionGeneratorId,
    props: InitialPetitionGeneratorEntity,
  ): TransactionType;
}
