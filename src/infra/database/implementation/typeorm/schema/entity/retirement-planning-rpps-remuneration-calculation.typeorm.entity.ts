import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPlanningRppsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps.typeorm.entity';

@Entity({ name: 'retirement_planning_rpps_remuneration_calculation' })
export class RetirementPlanningRppsRemunerationCalculationTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'total_competencies',
    type: 'int',
    nullable: false,
  })
  public totalCompetencies: number;

  @Column({
    name: 'total_amount',
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: false,
  })
  public totalAmount: string;

  @Column({
    name: 'average_amount',
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: false,
  })
  public averageAmount: string;

  @Column({
    name: 'top_eighty_percent_competencies',
    type: 'int',
    nullable: false,
  })
  public topEightyPercentCompetencies: number;

  @Column({
    name: 'bottom_twenty_percent_competencies',
    type: 'int',
    nullable: false,
  })
  public bottomTwentyPercentCompetencies: number;

  @Column({
    name: 'top_eighty_percent_average_amount',
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: false,
  })
  public topEightyPercentAverageAmount: string;

  @OneToOne(
    () => RetirementPlanningRppsTypeormEntity,
    (entity) => entity.retirementPlanningRppsRemunerationCalculation,
    { nullable: true },
  )
  public retirementPlanningRpps?:
    | RetirementPlanningRppsTypeormEntity
    | undefined;

  protected override readonly _type =
    RetirementPlanningRppsRemunerationCalculationTypeormEntity.name;
}
