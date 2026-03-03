import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { FullOpinionGeneratorEntity } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/schema/entity/full-opinion-generator-analysis-result/full-opinion-generator.entity';
import type { FullOpinionGeneratorId } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/schema/entity/full-opinion-generator-analysis-result/value-object/full-opinion-generator-id/full-opinion-generator-id.value-object';

export abstract class FullOpinionGeneratorCommandRepositoryGateway {
  public abstract createFullOpinionGenerator(
    props: FullOpinionGeneratorEntity,
  ): TransactionType;

  public abstract updateFullOpinionGenerator(
    id: FullOpinionGeneratorId,
    props: FullOpinionGeneratorEntity,
  ): TransactionType;
}
