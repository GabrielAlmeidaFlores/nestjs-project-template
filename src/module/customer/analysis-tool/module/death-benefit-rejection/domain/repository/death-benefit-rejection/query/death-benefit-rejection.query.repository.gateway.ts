import type { NotFoundError } from '@core/error/not-found.error';
import type { GetDeathBenefitRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection/query/result/get-death-benefit-rejection-with-relations.query.result';
import type { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class DeathBenefitRejectionQueryRepositoryGateway {
  public abstract findOneByDeathBenefitRejectionIdOrFailWithRelations(
    id: DeathBenefitRejectionId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetDeathBenefitRejectionWithRelationsQueryResult>;
}
