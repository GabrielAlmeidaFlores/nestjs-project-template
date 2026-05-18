import type { NotFoundError } from '@core/error/not-found.error';
import type { GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/repository/temporary-disability-benefits-terminated/query/result/get-temporary-disability-benefits-terminated-with-relations.query.result';
import type { TemporaryDisabilityBenefitsTerminatedId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated/value-object/temporary-disability-benefits-terminated-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class TemporaryDisabilityBenefitsTerminatedQueryRepositoryGateway {
  public abstract findOneByTemporaryDisabilityBenefitsTerminatedIdOrFailWithRelations(
    id: TemporaryDisabilityBenefitsTerminatedId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetTemporaryDisabilityBenefitsTerminatedWithRelationsQueryResult>;
}
