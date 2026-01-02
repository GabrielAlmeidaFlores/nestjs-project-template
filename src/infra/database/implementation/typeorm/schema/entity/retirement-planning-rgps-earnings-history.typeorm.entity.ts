import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPlanningRgpsPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-period.typeorm.entity';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';

@Entity({ name: 'retirement_planning_rgps_earnings_history' })
export class RetirementPlanningRgpsEarningsHistoryTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'competence',
    type: 'date',
    nullable: true,
  })
  public competence: Date | null;

  @Column({
    name: 'remuneration',
    type: 'longtext',
    nullable: true,
  })
  public remuneration: string | null;

  @Column({
    name: 'indicators',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public indicators: string | null;

  @Column({
    name: 'payment_date',
    type: 'date',
    nullable: true,
  })
  public paymentDate: Date | null;

  @Column({
    name: 'contribution',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public contribution: string | null;

  @Column({
    name: 'contribution_salary',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public contributionSalary: string | null;

  @ManyToOne(() => RetirementPlanningRgpsPeriodTypeormEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'retirement_planning_rgps_period_id' })
  public retirementPlanningRgpsPeriod?: RetirementPlanningRgpsPeriodTypeormEntity | null;

  @ManyToOne(() => RetirementPlanningRgpsTypeormEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'retirement_planning_rgps_id' })
  public retirementPlanningRgps?: RetirementPlanningRgpsTypeormEntity | null;

  protected override readonly _type =
    RetirementPlanningRgpsEarningsHistoryTypeormEntity.name;
}
