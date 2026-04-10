import type { NotFoundError } from '@core/error/not-found.error';
import type { ConstructorType } from '@shared/system/type/constructor.type';
import type { GetDeathBenefitGrantPeriodQueryResult } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-period/query/result/get-death-benefit-grant-period.query.result';
import type { DeathBenefitGrantPeriodId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-period/value-object/death-benefit-grant-period-id.value-object';

export abstract class DeathBenefitGrantPeriodQueryRepositoryGateway {
  public abstract findOneByDeathBenefitGrantPeriodIdOrFail(
    id: DeathBenefitGrantPeriodId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetDeathBenefitGrantPeriodQueryResult>;
}
