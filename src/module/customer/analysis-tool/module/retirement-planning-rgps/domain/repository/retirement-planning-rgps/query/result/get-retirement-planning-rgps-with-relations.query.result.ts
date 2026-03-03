import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import type { RetirementPlanningRgpsInssBenefitEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-benefit/retirement-planning-rgps-inss-benefit.entity';
import type { RetirementPlanningRgpsLegalProceedingEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-legal-proceeding/retirement-planning-rgps-legal-proceeding.entity';
import type { RetirementPlanningRgpsPeriodEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/retirement-planning-rgps-period.entity';
import type { RetirementPlanningRgpsResultEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-result/retirement-planning-rgps-result.entity';

export class GetRetirementPlanningRgpsWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: RetirementPlanningRgpsId;
  public readonly cnisDocument: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  public readonly retirementPlanningRgpsBenefit:
    | RetirementPlanningRgpsInssBenefitEntity[]
    | null;
  public readonly retirementPlanningRgpsResult: RetirementPlanningRgpsResultEntity | null;
  public readonly retirementPlanningRgpsLegalProceeding:
    | RetirementPlanningRgpsLegalProceedingEntity[]
    | null;
  public readonly retirementPlanningRgpsPeriod:
    | RetirementPlanningRgpsPeriodEntity[]
    | null;

  protected override readonly _type =
    GetRetirementPlanningRgpsWithRelationsQueryResult.name;
}
