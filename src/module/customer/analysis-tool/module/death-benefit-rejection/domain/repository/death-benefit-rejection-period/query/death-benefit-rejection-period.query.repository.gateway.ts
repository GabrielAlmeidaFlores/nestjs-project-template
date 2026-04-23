import type { NotFoundError } from '@core/error/not-found.error';
import type { GetDeathBenefitRejectionPeriodQueryResult } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-period/query/result/get-death-benefit-rejection-period.query.result';
import type { DeathBenefitRejectionPeriodId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/value-object/death-benefit-rejection-period-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class DeathBenefitRejectionPeriodQueryRepositoryGateway {
  public abstract findOneByDeathBenefitRejectionPeriodIdOrFail(
    id: DeathBenefitRejectionPeriodId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetDeathBenefitRejectionPeriodQueryResult>;
}
