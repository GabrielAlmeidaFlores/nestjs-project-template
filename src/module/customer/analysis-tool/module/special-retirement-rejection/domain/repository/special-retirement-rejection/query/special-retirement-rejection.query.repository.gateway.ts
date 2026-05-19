import type { NotFoundError } from '@core/error/not-found.error';
import type { GetSpecialRetirementRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/repository/special-retirement-rejection/query/result/get-special-retirement-rejection-with-relations.query.result';
import type { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class SpecialRetirementRejectionQueryRepositoryGateway {
  public abstract findOneBySpecialRetirementRejectionIdOrFailWithRelations(
    specialRetirementRejectionId: SpecialRetirementRejectionId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetSpecialRetirementRejectionWithRelationsQueryResult>;
}
