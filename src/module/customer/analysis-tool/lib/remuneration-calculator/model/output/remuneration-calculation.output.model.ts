import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class RemunerationCalculationOutputModel extends BaseBuildableObject {
  public readonly totalCompetencies: number;
  public readonly totalAmount: number;
  public readonly totalUpdatedAmount: number;
  public readonly averageAmount: number;
  public readonly averageUpdatedAmount: number;
  public readonly topEightyPercentCompetencies: number;
  public readonly bottomTwentyPercentCompetencies: number;
  public readonly topEightyPercentAverageAmount: number;
  public readonly topEightyPercentAverageUpdatedAmount: number;

  protected override readonly _type = RemunerationCalculationOutputModel.name;
}
