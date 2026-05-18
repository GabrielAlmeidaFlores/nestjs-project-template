import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialRetirementRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-rejection-work-period.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'special_retirement_rejection_work_period_earnings_history' })
export class SpecialRetirementRejectionWorkPeriodEarningsHistoryTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'competence',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public competence: Date | null;

  @Column({
    name: 'remuneration',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  public remuneration: string | null;

  @Column({
    name: 'indicators',
    type: 'longtext',
    nullable: true,
  })
  public indicators: string | null;

  @Column({
    name: 'payment_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public paymentDate: Date | null;

  @Column({
    name: 'contribution',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  public contribution: string | null;

  @Column({
    name: 'contribution_salary',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  public contributionSalary: string | null;

  @Column({
    name: 'competence_below_the_minimum',
    type: 'boolean',
    nullable: true,
  })
  public competenceBelowTheMinimum: boolean | null;

  @ManyToOne(
    () => SpecialRetirementRejectionWorkPeriodTypeormEntity,
    (entity) => entity.specialRetirementRejectionWorkPeriodEarningsHistory,
    { nullable: true },
  )
  @JoinColumn({ name: 'special_retirement_rejection_work_period_id' })
  public specialRetirementRejectionWorkPeriod?: SpecialRetirementRejectionWorkPeriodTypeormEntity | null;

  protected override readonly _type =
    SpecialRetirementRejectionWorkPeriodEarningsHistoryTypeormEntity.name;
}
