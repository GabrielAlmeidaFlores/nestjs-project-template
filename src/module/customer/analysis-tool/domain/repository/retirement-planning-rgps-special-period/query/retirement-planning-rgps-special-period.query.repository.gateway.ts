import type { GetRetirementPlanningRgpsSpecialPeriodQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rgps-special-period/query/result/get-retirement-planning-rgps-special-period.query.result';
import type { RetirementPlanningRgpsSpecialPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rgps-special-period/value-object/retirement-planning-rgps-special-period-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class RetirementPlanningRgpsSpecialPeriodQueryRepositoryGateway {
  public abstract findOneByRetirementPlanningRgpsSpecialPeriodIdOrFail(
    id: RetirementPlanningRgpsSpecialPeriodId,
    err: ConstructorType<Error>,
  ): Promise<GetRetirementPlanningRgpsSpecialPeriodQueryResult>;
}
