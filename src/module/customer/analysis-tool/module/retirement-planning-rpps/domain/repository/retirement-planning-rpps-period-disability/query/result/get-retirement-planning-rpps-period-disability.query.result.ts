import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetCidTenQueryResult } from '@module/customer/analysis-tool/domain/repository/cid-ten/query/result/get-cid-ten.query.result';
import type { GetRetirementPlanningRppsPeriodDocumentQueryResult } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps-period-document/query/result/get-retirement-planning-rpps-period-document.query.result';
import type { RetirementPlanningDisabilityCategoryEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-category.enum';
import type { RetirementPlanningDisabilityDegreeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-degree-enum';
import type { RetirementPlanningDisabilityTimeTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/enum/retirement-planning-disability-time-type.enum';
import type { RetirementPlanningRppsPeriodDisabilityId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-period-disability/value-object/retirement-planning-rpps-period-disability-id.value-object';

export class GetRetirementPlanningRppsPeriodDisabilityQueryResult extends BaseBuildableObject {
  public readonly id: RetirementPlanningRppsPeriodDisabilityId;
  public readonly type: RetirementPlanningDisabilityTimeTypeEnum;
  public readonly degree: RetirementPlanningDisabilityDegreeEnum;
  public readonly startDate: Date;
  public readonly endDate: Date;
  public readonly category: RetirementPlanningDisabilityCategoryEnum;
  public readonly description: string;
  public readonly dailyImpact: string;
  public readonly cid: GetCidTenQueryResult;
  public readonly documents: GetRetirementPlanningRppsPeriodDocumentQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetRetirementPlanningRppsPeriodDisabilityQueryResult.name;
}
