import type { NotFoundError } from '@core/error/not-found.error';
import type { GetDisabilityRetirementPlanningGrantDisabilityPeriodQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-disability-period/query/result/get-disability-retirement-planning-grant-disability-period.query.result';
import type { DisabilityRetirementPlanningGrantDisabilityPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/value-object/disability-retirement-planning-grant-disability-period-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class DisabilityRetirementPlanningGrantDisabilityPeriodQueryRepositoryGateway {
  public abstract findOneByDisabilityRetirementPlanningGrantDisabilityPeriodIdOrFail(
    id: DisabilityRetirementPlanningGrantDisabilityPeriodId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetDisabilityRetirementPlanningGrantDisabilityPeriodQueryResult>;
}
