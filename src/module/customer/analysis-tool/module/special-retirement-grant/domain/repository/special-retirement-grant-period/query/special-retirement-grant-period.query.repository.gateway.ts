import type { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import type { SpecialRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/value-object/special-retirement-grant-period-id/special-retirement-grant-period-id.value-object';
import type { GetSpecialRetirementGrantPeriodWithChildrenQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period/query/result/get-special-retirement-grant-period-with-children.query.result';

export abstract class SpecialRetirementGrantPeriodQueryRepositoryGateway {
  public abstract listIdsBySpecialRetirementGrantId(
    specialRetirementGrantId: SpecialRetirementGrantId,
  ): Promise<SpecialRetirementGrantPeriodId[]>;

  public abstract listPeriodsWithChildrenBySpecialRetirementGrantId(
    specialRetirementGrantId: SpecialRetirementGrantId,
  ): Promise<GetSpecialRetirementGrantPeriodWithChildrenQueryResult[]>;
}
