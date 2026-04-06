import { SpecialRetirementGrantPeriodOverdueContributionId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-overdue-contribution/value-object/special-retirement-grant-period-overdue-contribution-id/special-retirement-grant-period-overdue-contribution-id.value-object';
import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GetSpecialRetirementGrantPeriodOverdueContributionQueryResult extends BaseBuildableObject {
  public readonly id: SpecialRetirementGrantPeriodOverdueContributionId;
  public readonly overdueDate: Date;
  public readonly paymentDate: Date | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetSpecialRetirementGrantPeriodOverdueContributionQueryResult.name;
}
