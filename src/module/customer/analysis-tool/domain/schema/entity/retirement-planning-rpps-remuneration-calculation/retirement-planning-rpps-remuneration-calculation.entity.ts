import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPlanningRppsRemunerationCalculationId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration-calculation/value-object/retirement-planning-rpps-remuneration-calculation-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RetirementPlanningRppsRemunerationCalculationEntityPropsInterface } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-remuneration-calculation/retirement-planning-rpps-remuneration-calculation.entity.props.interface';

export class RetirementPlanningRppsRemunerationCalculationEntity extends BaseEntity<RetirementPlanningRppsRemunerationCalculationId> {
  @Description('Total number of competencies')
  public readonly totalCompetencies: number;

  @Description('Total amount of remunerations')
  public readonly totalAmount: number;

  @Description('Average amount by number of competencies')
  public readonly averageAmount: number;

  @Description('Number of competencies in the top 80% by value')
  public readonly topEightyPercentCompetencies: number;

  @Description('Remaining competencies (bottom 20%)')
  public readonly bottomTwentyPercentCompetencies: number;

  @Description('Average amount of the top 80% highest values')
  public readonly topEightyPercentAverageAmount: number;

  protected readonly _type =
    RetirementPlanningRppsRemunerationCalculationEntity.name;

  public constructor(
    props: RetirementPlanningRppsRemunerationCalculationEntityPropsInterface,
  ) {
    super(RetirementPlanningRppsRemunerationCalculationId, props);
    this.totalCompetencies = props.totalCompetencies;
    this.totalAmount = props.totalAmount;
    this.averageAmount = props.averageAmount;
    this.topEightyPercentCompetencies = props.topEightyPercentCompetencies;
    this.bottomTwentyPercentCompetencies =
      props.bottomTwentyPercentCompetencies;
    this.topEightyPercentAverageAmount = props.topEightyPercentAverageAmount;
  }
}
