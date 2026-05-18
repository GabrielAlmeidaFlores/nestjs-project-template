import type { NotFoundError } from '@core/error/not-found.error';
import type { GetDeathBenefitRejectionTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-time-accelerator/query/result/get-death-benefit-rejection-time-accelerator.query.result';
import type { DeathBenefitRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/value-object/death-benefit-rejection-time-accelerator-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class DeathBenefitRejectionTimeAcceleratorQueryRepositoryGateway {
  public abstract findOneByDeathBenefitRejectionTimeAcceleratorIdOrFail(
    id: DeathBenefitRejectionTimeAcceleratorId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetDeathBenefitRejectionTimeAcceleratorQueryResult>;
}
