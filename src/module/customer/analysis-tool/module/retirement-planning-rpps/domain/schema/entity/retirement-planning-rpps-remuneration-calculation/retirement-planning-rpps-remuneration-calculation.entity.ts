import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RetirementPlanningRppsRemunerationCalculationId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-remuneration-calculation/value-object/retirement-planning-rpps-remuneration-calculation-id.value-object';
import { Description } from '@shared/system/decorator/property/description/description.decorator';

import type { RetirementPlanningRppsRemunerationCalculationEntityPropsInterface } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-remuneration-calculation/retirement-planning-rpps-remuneration-calculation.entity.props.interface';

export class RetirementPlanningRppsRemunerationCalculationEntity extends BaseEntity<RetirementPlanningRppsRemunerationCalculationId> {
  @Description('Total number of competencies')
  public readonly totalCompetencies: number | null;

  @Description('Total amount of remunerations')
  public readonly totalAmount: number | null;

  @Description('Average amount by number of competencies')
  public readonly averageAmount: number | null;

  @Description('Number of competencies in the top 80% by value')
  public readonly topEightyPercentCompetencies: number | null;

  @Description('Remaining competencies (bottom 20%)')
  public readonly bottomTwentyPercentCompetencies: number | null;

  @Description('Average amount of the top 80% highest values')
  public readonly topEightyPercentAverageAmount: number | null;

  protected readonly _type =
    RetirementPlanningRppsRemunerationCalculationEntity.name;

  public constructor(
    props: RetirementPlanningRppsRemunerationCalculationEntityPropsInterface,
  ) {
    super(RetirementPlanningRppsRemunerationCalculationId, props);
    this.totalCompetencies = props.totalCompetencies ?? null;
    this.totalAmount = props.totalAmount ?? null;
    this.averageAmount = props.averageAmount ?? null;
    this.topEightyPercentCompetencies =
      props.topEightyPercentCompetencies ?? null;
    this.bottomTwentyPercentCompetencies =
      props.bottomTwentyPercentCompetencies ?? null;
    this.topEightyPercentAverageAmount =
      props.topEightyPercentAverageAmount ?? null;
  }
}
