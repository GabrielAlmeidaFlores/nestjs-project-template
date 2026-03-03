import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { ReasonPendencyEnum } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/enum/reason-pendency.enum';

@Entity({ name: 'retirement_planning_rgps_period' })
export class RetirementPlanningRgpsPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'sequencial',
    type: 'int',
    nullable: true,
  })
  public sequencial: number | null;

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
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public periodStart: Date | null;

  @Column({
    name: 'period_end',
    type: 'date',
    transformer: DateOnlyTransformer,
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
    type: 'simple-enum',
    enum: ReasonPendencyEnum,
    nullable: true,
  })
  public reasonPendency: ReasonPendencyEnum | null;

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
  public contributionAverage: string | null;

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

  @Column({
    name: 'valid_contribution_time',
    type: 'text',
    nullable: true,
  })
  public validContributionTime: string | null;

  protected override readonly _type =
    RetirementPlanningRgpsPeriodTypeormEntity.name;
}
