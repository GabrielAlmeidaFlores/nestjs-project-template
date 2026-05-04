import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

import type { MaternityPayRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-work-period.typeorm.entity';

@Entity({ name: 'maternity_pay_rejection_work_period_earnings_history' })
export class MaternityPayRejectionWorkPeriodEarningsHistoryTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'competence',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public competence: Date | null;

  @Column({
    name: 'remuneration',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public remuneration: string | null;

  @Column({ name: 'indicators', type: 'varchar', length: 255, nullable: true })
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
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public competenceBelowTheMinimum: string | null;

  @ManyToOne(
    'MaternityPayRejectionWorkPeriodTypeormEntity',
    'maternityPayRejectionWorkPeriodEarningsHistory',
    { eager: false },
  )
  @JoinColumn({ name: 'maternity_pay_rejection_work_period_id' })
  public maternityPayRejectionWorkPeriod?: MaternityPayRejectionWorkPeriodTypeormEntity;

  protected override readonly _type =
    MaternityPayRejectionWorkPeriodEarningsHistoryTypeormEntity.name;
}
