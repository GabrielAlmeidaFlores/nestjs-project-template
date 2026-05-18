import type { NotFoundError } from '@core/error/not-found.error';
import type { GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/repository/temporary-incapacity-benefit-rejection/query/result/get-temporary-incapacity-benefit-rejection-with-relations.query.result';
import type { TemporaryIncapacityBenefitRejectionId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection/value-object/temporary-incapacity-benefit-rejection-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class TemporaryIncapacityBenefitRejectionQueryRepositoryGateway {
  public abstract findOneByTemporaryIncapacityBenefitRejectionIdOrFailWithRelations(
    id: TemporaryIncapacityBenefitRejectionId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetTemporaryIncapacityBenefitRejectionWithRelationsQueryResult>;
}
