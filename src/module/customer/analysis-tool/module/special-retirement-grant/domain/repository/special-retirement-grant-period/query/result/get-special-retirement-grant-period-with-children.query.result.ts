import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { GetSpecialRetirementGrantPeriodObservationQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period-observation/query/result/get-special-retirement-grant-period-observation.query.result';
import type { GetSpecialRetirementGrantPeriodOverdueContributionQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period-overdue-contribution/query/result/get-special-retirement-grant-period-overdue-contribution.query.result';
import type { GetSpecialRetirementGrantPeriodPendingExitDateQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period-pending-exit-date/query/result/get-special-retirement-grant-period-pending-exit-date.query.result';
import type { GetSpecialRetirementGrantPeriodUnderMinimumQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-period-under-minimum/query/result/get-special-retirement-grant-period-under-minimum.query.result';
import type { SpecialRetirementGrantPeriodStatusEnum } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/enum/special-retirement-grant-period-status.enum';
import type { SpecialRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/value-object/special-retirement-grant-period-id/special-retirement-grant-period-id.value-object';

export class GetSpecialRetirementGrantPeriodWithChildrenQueryResult extends BaseBuildableObject {
  public readonly id: SpecialRetirementGrantPeriodId;
  public readonly sequencial: number | null;
  public readonly employmentRelationshipSource: string | null;
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly category: string | null;
  public readonly status: SpecialRetirementGrantPeriodStatusEnum | null;
  public readonly averageContributionAmount: DecimalValue | null;
  public readonly shouldConsiderPeriod: boolean;
  public readonly overdueContributions: GetSpecialRetirementGrantPeriodOverdueContributionQueryResult[];
  public readonly underMinimums: GetSpecialRetirementGrantPeriodUnderMinimumQueryResult[];
  public readonly pendingExitDates: GetSpecialRetirementGrantPeriodPendingExitDateQueryResult[];
  public readonly observations: GetSpecialRetirementGrantPeriodObservationQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  protected override readonly _type =
    GetSpecialRetirementGrantPeriodWithChildrenQueryResult.name;
}
