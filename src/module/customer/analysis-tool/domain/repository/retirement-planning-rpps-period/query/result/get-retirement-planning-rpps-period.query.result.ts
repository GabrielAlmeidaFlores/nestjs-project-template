import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetRetirementPlanningRppsPeriodDisabilityQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period-disability/query/result/get-retirement-planning-rpps-period-disability.query.result';
import type { GetRetirementPlanningRppsPeriodSpecialTimeQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period-special-time/query/result/get-retirement-planning-rpps-period-special-time.query.result';
import type { RetirementPlanningPeriodServiceTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/enum/retirement-planning-period-service-type.enum';
import type { RetirementPlanningRppsPeriodId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/value-object/retirement-planning-rpps-period-id.value-object';

export class GetRetirementPlanningRppsPeriodQueryResult extends BaseBuildableObject {
  public readonly id: RetirementPlanningRppsPeriodId;
  public readonly startDate: Date;
  public readonly endDate: Date;
  public readonly jobPosition: string;
  public readonly career: string;
  public readonly serviceType: RetirementPlanningPeriodServiceTypeEnum;
  public readonly department: string;
  public readonly specialTimePeriod: GetRetirementPlanningRppsPeriodSpecialTimeQueryResult | null;
  public readonly disabilityPeriod: GetRetirementPlanningRppsPeriodDisabilityQueryResult | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetRetirementPlanningRppsPeriodQueryResult.name;
}
