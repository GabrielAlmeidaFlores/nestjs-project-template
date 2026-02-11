import type { NotFoundError } from '@core/error/not-found.error';
import type { FullOpinionGeneratorEntity } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/schema/entity/full-opinion-generator-analysis-result/full-opinion-generator.entity';
import type { FullOpinionGeneratorId } from '@module/customer/documents-to-be-generated/module/full-opinion/domain/schema/entity/full-opinion-generator-analysis-result/value-object/full-opinion-generator-id/full-opinion-generator-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class FullOpinionGeneratorQueryRepositoryGateway {
  public abstract findOneByIdOrFail(
    id: FullOpinionGeneratorId,
    err: ConstructorType<NotFoundError>,
  ): Promise<FullOpinionGeneratorEntity>;
}
