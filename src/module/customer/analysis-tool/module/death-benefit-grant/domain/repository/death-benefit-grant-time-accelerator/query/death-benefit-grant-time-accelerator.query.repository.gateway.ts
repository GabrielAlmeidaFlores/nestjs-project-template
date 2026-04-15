import type { NotFoundError } from '@core/error/not-found.error';
import type { GetDeathBenefitGrantTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-time-accelerator/query/result/get-death-benefit-grant-time-accelerator.query.result';
import type { DeathBenefitGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/value-object/death-benefit-grant-time-accelerator-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class DeathBenefitGrantTimeAcceleratorQueryRepositoryGateway {
  public abstract findOneByDeathBenefitGrantTimeAcceleratorIdOrFail(
    id: DeathBenefitGrantTimeAcceleratorId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetDeathBenefitGrantTimeAcceleratorQueryResult>;
}
