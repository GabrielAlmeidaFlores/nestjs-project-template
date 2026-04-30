import type { NotFoundError } from '@core/error/not-found.error';
import type { GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/repository/temporary-incapacity-benefit-termination/query/result/get-temporary-incapacity-benefit-termination-with-relations.query.result';
import type { TemporaryIncapacityBenefitTerminationId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination/value-object/temporary-incapacity-benefit-termination-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class TemporaryIncapacityBenefitTerminationQueryRepositoryGateway {
  public abstract findOneByTemporaryIncapacityBenefitTerminationIdOrFailWithRelations(
    id: TemporaryIncapacityBenefitTerminationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetTemporaryIncapacityBenefitTerminationWithRelationsQueryResult>;
}
