import type { NotFoundError } from '@core/error/not-found.error';
import type { AdministrativeRequestGeneratorEntity } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/schema/entity/administrative-request-generator-analysis-result/administrative-request-generator.entity';
import type { AdministrativeRequestGeneratorId } from '@module/customer/documents-to-be-generated/module/administrative-request/domain/schema/entity/administrative-request-generator-analysis-result/value-object/administrative-request-generator-id/administrative-request-generator-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class AdministrativeRequestGeneratorQueryRepositoryGateway {
  public abstract findOneByIdOrFail(
    id: AdministrativeRequestGeneratorId,
    err: ConstructorType<NotFoundError>,
  ): Promise<AdministrativeRequestGeneratorEntity>;
}
