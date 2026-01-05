import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RetirementPlanningRppsRemunerationCalculationId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration-calculation/value-object/retirement-planning-rpps-remuneration-calculation-id.value-object';

export class GetRetirementPlanningRppsRemunerationCalculationQueryResult extends BaseBuildableObject {
  public readonly id: RetirementPlanningRppsRemunerationCalculationId;
  public readonly totalCompetencies?: number | null;
  public readonly totalAmount?: number | null;
  public readonly averageAmount?: number | null;
  public readonly topEightyPercentCompetencies?: number | null;
  public readonly bottomTwentyPercentCompetencies?: number | null;
  public readonly topEightyPercentAverageAmount?: number | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetRetirementPlanningRppsRemunerationCalculationQueryResult.name;
}
