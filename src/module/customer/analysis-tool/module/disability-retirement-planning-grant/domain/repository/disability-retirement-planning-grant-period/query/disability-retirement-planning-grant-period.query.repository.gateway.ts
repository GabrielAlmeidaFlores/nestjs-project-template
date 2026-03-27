import type { NotFoundError } from '@core/error/not-found.error';
import type { GetDisabilityRetirementPlanningGrantPeriodQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-period/query/result/get-disability-retirement-planning-grant-period.query.result';
import type { DisabilityRetirementPlanningGrantPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/value-object/disability-retirement-planning-grant-period-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class DisabilityRetirementPlanningGrantPeriodQueryRepositoryGateway {
  public abstract findOneByDisabilityRetirementPlanningGrantPeriodIdOrFail(
    id: DisabilityRetirementPlanningGrantPeriodId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetDisabilityRetirementPlanningGrantPeriodQueryResult>;
}
