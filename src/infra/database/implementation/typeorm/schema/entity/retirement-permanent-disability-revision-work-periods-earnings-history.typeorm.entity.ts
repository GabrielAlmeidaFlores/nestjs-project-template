import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-work-periods.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({
  name: 'ret_per_dis_rev_work_periods_earnings_history',
})
export class RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'competence',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
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
    transformer: DateOnlyTransformer,
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

  @Column({
    name: 'competence_below_the_minimum',
    type: 'boolean',
    nullable: true,
  })
  public competenceBelowTheMinimum: boolean | null;

  @ManyToOne(
    () => RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity,
    (entity) =>
      entity.retirementPermanentDisabilityRevisionWorkPeriodsEarningsHistory,
    { nullable: true },
  )
  @JoinColumn({
    name: 'retirement_permanent_disability_revision_work_periods_id',
  })
  public retirementPermanentDisabilityRevisionWorkPeriods?: RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity | null;

  protected override readonly _type =
    RetirementPermanentDisabilityRevisionWorkPeriodsEarningsHistoryTypeormEntity.name;
}
