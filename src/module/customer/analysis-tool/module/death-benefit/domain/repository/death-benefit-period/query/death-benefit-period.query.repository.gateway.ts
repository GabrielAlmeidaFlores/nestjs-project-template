import type { NotFoundError } from '@core/error/not-found.error';
import type { ConstructorType } from '@shared/system/type/constructor.type';
import type { GetDeathBenefitPeriodQueryResult } from '@module/customer/analysis-tool/module/death-benefit/domain/repository/death-benefit-period/query/result/get-death-benefit-period.query.result';
import type { DeathBenefitPeriodId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/value-object/death-benefit-period-id.value-object';

export abstract class DeathBenefitPeriodQueryRepositoryGateway {
  public abstract findOneByDeathBenefitPeriodIdOrFail(
    id: DeathBenefitPeriodId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetDeathBenefitPeriodQueryResult>;
}
