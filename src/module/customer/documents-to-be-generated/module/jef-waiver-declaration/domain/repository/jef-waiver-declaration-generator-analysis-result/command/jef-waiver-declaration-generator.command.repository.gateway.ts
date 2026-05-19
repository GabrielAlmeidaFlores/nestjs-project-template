import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { JefWaiverDeclarationGeneratorEntity } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/domain/schema/entity/jef-waiver-declaration-generator-analysis-result/jef-waiver-declaration-generator.entity';
import type { JefWaiverDeclarationGeneratorId } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/domain/schema/entity/jef-waiver-declaration-generator-analysis-result/value-object/jef-waiver-declaration-generator-id/jef-waiver-declaration-generator-id.value-object';

export abstract class JefWaiverDeclarationGeneratorCommandRepositoryGateway {
  public abstract createJefWaiverDeclarationGenerator(
    props: JefWaiverDeclarationGeneratorEntity,
  ): TransactionType;

  public abstract updateJefWaiverDeclarationGenerator(
    id: JefWaiverDeclarationGeneratorId,
    props: JefWaiverDeclarationGeneratorEntity,
  ): TransactionType;
}
