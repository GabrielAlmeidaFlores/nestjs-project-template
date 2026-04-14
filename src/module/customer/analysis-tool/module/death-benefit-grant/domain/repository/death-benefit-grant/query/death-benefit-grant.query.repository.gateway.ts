import type { NotFoundError } from '@core/error/not-found.error';
import type { GetDeathBenefitGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant/query/result/get-death-benefit-grant-with-relations.query.result';
import type { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class DeathBenefitGrantQueryRepositoryGateway {
  public abstract findOneByDeathBenefitGrantIdOrFailWithRelations(
    id: DeathBenefitGrantId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetDeathBenefitGrantWithRelationsQueryResult>;
}
