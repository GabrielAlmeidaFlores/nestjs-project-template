import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RetirementPlanningRppsRemunerationCalculationId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration-calculation/value-object/retirement-planning-rpps-remuneration-calculation-id.value-object';

export class GetRetirementPlanningRppsRemunerationCalculationQueryResult extends BaseBuildableObject {
  public readonly id: RetirementPlanningRppsRemunerationCalculationId;
  public readonly totalCompetencies: number;
  public readonly totalAmount: number;
  public readonly averageAmount: number;
  public readonly topEightyPercentCompetencies: number;
  public readonly bottomTwentyPercentCompetencies: number;
  public readonly topEightyPercentAverageAmount: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetRetirementPlanningRppsRemunerationCalculationQueryResult.name;
}
