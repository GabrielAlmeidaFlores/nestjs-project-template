import type { NotFoundError } from '@core/error/not-found.error';
import type { JefWaiverDeclarationGeneratorEntity } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/domain/schema/entity/jef-waiver-declaration-generator-analysis-result/jef-waiver-declaration-generator.entity';
import type { JefWaiverDeclarationGeneratorId } from '@module/customer/documents-to-be-generated/module/jef-waiver-declaration/domain/schema/entity/jef-waiver-declaration-generator-analysis-result/value-object/jef-waiver-declaration-generator-id/jef-waiver-declaration-generator-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class JefWaiverDeclarationGeneratorQueryRepositoryGateway {
  public abstract findOneByIdOrFail(
    id: JefWaiverDeclarationGeneratorId,
    err: ConstructorType<NotFoundError>,
  ): Promise<JefWaiverDeclarationGeneratorEntity>;
}
