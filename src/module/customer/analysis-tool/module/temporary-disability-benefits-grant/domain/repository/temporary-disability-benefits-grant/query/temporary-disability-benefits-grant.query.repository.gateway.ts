import type { NotFoundError } from '@core/error/not-found.error';
import type { GetTemporaryDisabilityBenefitsGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/repository/temporary-disability-benefits-grant/query/result/get-temporary-disability-benefits-grant-with-relations.query.result';
import type { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class TemporaryDisabilityBenefitsGrantQueryRepositoryGateway {
  public abstract findOneByTemporaryDisabilityBenefitsGrantIdOrFailWithRelations(
    id: TemporaryDisabilityBenefitsGrantId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetTemporaryDisabilityBenefitsGrantWithRelationsQueryResult>;
}
