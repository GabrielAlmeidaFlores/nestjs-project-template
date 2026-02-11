import type { NotFoundError } from '@core/error/not-found.error';
import type { InitialPetitionGeneratorEntity } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/schema/entity/initial-petition-generator-analysis-result/initial-petition-generator.entity';
import type { InitialPetitionGeneratorId } from '@module/customer/documents-to-be-generated/module/initial-petition/domain/schema/entity/initial-petition-generator-analysis-result/value-object/initial-petition-generator-id/initial-petition-generator-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class InitialPetitionGeneratorQueryRepositoryGateway {
  public abstract findOneByIdOrFail(
    id: InitialPetitionGeneratorId,
    err: ConstructorType<NotFoundError>,
  ): Promise<InitialPetitionGeneratorEntity>;
}
