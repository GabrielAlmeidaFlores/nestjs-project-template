import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPlanningRppsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps.typeorm.entity';

@Entity({ name: 'retirement_planning_rpps_remuneration_calculation' })
export class RetirementPlanningRppsRemunerationCalculationTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'total_competencies',
    type: 'int',
    nullable: true,
  })
  public totalCompetencies?: number | null;

  @Column({
    name: 'total_amount',
    type: 'int',
    nullable: true,
  })
  public totalAmount?: number | null;

  @Column({
    name: 'average_amount',
    type: 'int',
    nullable: true,
  })
  public averageAmount?: number | null;

  @Column({
    name: 'top_eighty_percent_competencies',
    type: 'int',
    nullable: true,
  })
  public topEightyPercentCompetencies?: number | null;

  @Column({
    name: 'bottom_twenty_percent_competencies',
    type: 'int',
    nullable: true,
  })
  public bottomTwentyPercentCompetencies?: number | null;

  @Column({
    name: 'top_eighty_percent_average_amount',
    type: 'int',
    nullable: true,
  })
  public topEightyPercentAverageAmount?: number | null;

  @OneToOne(
    () => RetirementPlanningRppsTypeormEntity,
    (entity) => entity.retirementPlanningRppsRemunerationCalculation,
  )
  public retirementPlanningRpps?:
    | RetirementPlanningRppsTypeormEntity
    | undefined;

  protected override readonly _type =
    RetirementPlanningRppsRemunerationCalculationTypeormEntity.name;
}
