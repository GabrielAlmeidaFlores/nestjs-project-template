import type { NotFoundError } from '@core/error/not-found.error';
import type { PowerOfAttorneyGeneratorEntity } from '@module/customer/documents-to-be-generated/module/power-of-attorney/domain/schema/entity/power-of-attorney-generator-analysis-result/power-of-attorney-generator.entity';
import type { PowerOfAttorneyGeneratorId } from '@module/customer/documents-to-be-generated/module/power-of-attorney/domain/schema/entity/power-of-attorney-generator-analysis-result/value-object/power-of-attorney-generator-id/power-of-attorney-generator-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class PowerOfAttorneyGeneratorQueryRepositoryGateway {
  public abstract findOneByIdOrFail(
    id: PowerOfAttorneyGeneratorId,
    err: ConstructorType<NotFoundError>,
  ): Promise<PowerOfAttorneyGeneratorEntity>;
}
