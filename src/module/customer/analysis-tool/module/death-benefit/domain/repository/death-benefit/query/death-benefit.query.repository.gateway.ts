import type { NotFoundError } from '@core/error/not-found.error';
import type { ConstructorType } from '@shared/system/type/constructor.type';
import type { GetDeathBenefitWithRelationsQueryResult } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit/query/result/get-death-benefit-with-relations.query.result';
import type { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';

export abstract class DeathBenefitQueryRepositoryGateway {
  public abstract findOneByDeathBenefitIdOrFailWithRelations(
    id: DeathBenefitId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetDeathBenefitWithRelationsQueryResult>;
}
