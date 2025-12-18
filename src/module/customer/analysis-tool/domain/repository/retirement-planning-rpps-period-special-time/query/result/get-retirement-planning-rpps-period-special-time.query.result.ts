import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetRetirementPlanningRppsPeriodDocumentQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period-document/query/result/get-retirement-planning-rpps-period-document.query.result';
import type { RetirementPlanningPeriodSpecialTimeTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period/enum/retirement-planning-period-special-time-type.enum';
import type { RetirementPlanningRppsPeriodSpecialTimeId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-special-time/value-object/retirement-planning-rpps-period-special-time-id.value-object';

export class GetRetirementPlanningRppsPeriodSpecialTimeQueryResult extends BaseBuildableObject {
  public readonly id: RetirementPlanningRppsPeriodSpecialTimeId;
  public readonly type: RetirementPlanningPeriodSpecialTimeTypeEnum;
  public readonly startDate: Date;
  public readonly endDate: Date;
  public readonly documents: GetRetirementPlanningRppsPeriodDocumentQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetRetirementPlanningRppsPeriodSpecialTimeQueryResult.name;
}
