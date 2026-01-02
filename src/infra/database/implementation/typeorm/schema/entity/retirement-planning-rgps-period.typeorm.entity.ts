import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';

@Entity({ name: 'retirement_planning_rgps_period' })
export class RetirementPlanningRgpsPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'period_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public periodName: string | null;

  @Column({
    name: 'period_start',
    type: 'date',
    nullable: true,
  })
  public periodStart: Date | null;

  @Column({
    name: 'period_end',
    type: 'date',
    nullable: true,
  })
  public periodEnd: Date | null;

  @Column({
    name: 'category',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public category: string | null;

  @Column({
    name: 'is_pendency',
    type: 'boolean',
    nullable: true,
  })
  public isPendency: boolean | null;

  @Column({
    name: 'reason_pendency',
    type: 'longtext',
    nullable: true,
  })
  public reasonPendency: string | null;

  @Column({
    name: 'competence_below_the_minimum',
    type: 'boolean',
    nullable: true,
  })
  public competenceBelowTheMinimum: boolean | null;

  @Column({
    name: 'contribution_average',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  public contributionAverage: number | null;

  @Column({
    name: 'type_of_contribution',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public typeOfContribution: string | null;

  @ManyToOne(
    () => RetirementPlanningRgpsTypeormEntity,
    (entity) => entity.retirementPlanningRgpsPeriod,
    { nullable: true },
  )
  @JoinColumn({ name: 'retirement_planning_rgps_id' })
  public retirementPlanningRgps?: RetirementPlanningRgpsTypeormEntity | null;

  @Column({
    name: 'status',
    type: 'boolean',
    nullable: true,
  })
  public status: boolean | null;

  protected override readonly _type =
    RetirementPlanningRgpsPeriodTypeormEntity.name;
}
