import type { NotFoundError } from '@core/error/not-found.error';
import type { FeeContractGeneratorEntity } from '@module/customer/documents-to-be-generated/module/fee-contract/domain/schema/entity/fee-contract-generator-analysis-result/fee-contract-generator.entity';
import type { FeeContractGeneratorId } from '@module/customer/documents-to-be-generated/module/fee-contract/domain/schema/entity/fee-contract-generator-analysis-result/value-object/fee-contract-generator-id/fee-contract-generator-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class FeeContractGeneratorQueryRepositoryGateway {
  public abstract findOneByIdOrFail(
    id: FeeContractGeneratorId,
    err: ConstructorType<NotFoundError>,
  ): Promise<FeeContractGeneratorEntity>;
}
