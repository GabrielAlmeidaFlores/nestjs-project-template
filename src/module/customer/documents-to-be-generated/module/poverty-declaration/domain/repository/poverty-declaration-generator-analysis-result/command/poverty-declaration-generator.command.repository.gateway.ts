import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { PovertyDeclarationGeneratorEntity } from '@module/customer/documents-to-be-generated/module/poverty-declaration/domain/schema/entity/poverty-declaration-generator-analysis-result/poverty-declaration-generator.entity';
import type { PovertyDeclarationGeneratorId } from '@module/customer/documents-to-be-generated/module/poverty-declaration/domain/schema/entity/poverty-declaration-generator-analysis-result/value-object/poverty-declaration-generator-id/poverty-declaration-generator-id.value-object';

export abstract class PovertyDeclarationGeneratorCommandRepositoryGateway {
  public abstract createPovertyDeclarationGenerator(
    props: PovertyDeclarationGeneratorEntity,
  ): TransactionType;

  public abstract updatePovertyDeclarationGenerator(
    id: PovertyDeclarationGeneratorId,
    props: PovertyDeclarationGeneratorEntity,
  ): TransactionType;
}
