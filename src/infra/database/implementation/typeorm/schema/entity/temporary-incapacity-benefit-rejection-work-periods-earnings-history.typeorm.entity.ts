import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-work-periods.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({
  name: 'temp_incapacity_benefit_rejection_work_periods_earnings_history',
})
export class TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'competence',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public competence: Date | null;

  @Column({ name: 'remuneration', type: 'longtext', nullable: true })
  public remuneration: string | null;

  @Column({ name: 'indicators', type: 'longtext', nullable: true })
  public indicators: string | null;

  @Column({
    name: 'payment_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public paymentDate: Date | null;

  @Column({ name: 'contribution', type: 'longtext', nullable: true })
  public contribution: string | null;

  @Column({ name: 'contribution_salary', type: 'longtext', nullable: true })
  public contributionSalary: string | null;

  @Column({
    name: 'competence_below_the_minimum',
    type: 'boolean',
    nullable: true,
  })
  public competenceBelowTheMinimum: boolean | null;

  @ManyToOne(
    () => TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormEntity,
    (entity) => entity.earningsHistory,
  )
  @JoinColumn({
    name: 'temporary_incapacity_benefit_rejection_work_periods_id',
  })
  public temporaryIncapacityBenefitRejectionWorkPeriods?: TemporaryIncapacityBenefitRejectionWorkPeriodsTypeormEntity;

  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionWorkPeriodsEarningsHistoryTypeormEntity.name;
}
