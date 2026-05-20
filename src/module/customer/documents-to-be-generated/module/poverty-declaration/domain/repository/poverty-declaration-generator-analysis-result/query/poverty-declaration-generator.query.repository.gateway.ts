import type { NotFoundError } from '@core/error/not-found.error';
import type { PovertyDeclarationGeneratorEntity } from '@module/customer/documents-to-be-generated/module/poverty-declaration/domain/schema/entity/poverty-declaration-generator-analysis-result/poverty-declaration-generator.entity';
import type { PovertyDeclarationGeneratorId } from '@module/customer/documents-to-be-generated/module/poverty-declaration/domain/schema/entity/poverty-declaration-generator-analysis-result/value-object/poverty-declaration-generator-id/poverty-declaration-generator-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class PovertyDeclarationGeneratorQueryRepositoryGateway {
  public abstract findOneByIdOrFail(
    id: PovertyDeclarationGeneratorId,
    err: ConstructorType<NotFoundError>,
  ): Promise<PovertyDeclarationGeneratorEntity>;
}
