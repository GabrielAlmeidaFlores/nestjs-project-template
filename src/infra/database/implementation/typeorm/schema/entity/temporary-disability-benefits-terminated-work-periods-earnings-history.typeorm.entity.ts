import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-work-periods.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({
  name: 'temp_disability_benefits_terminated_work_periods_earnings_hist',
})
export class TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryTypeormEntity extends BaseTypeormEntity {
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
    () => TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity,
    (entity) => entity.earningsHistory,
  )
  @JoinColumn({
    name: 'temporary_disability_benefits_terminated_work_periods_id',
  })
  public temporaryDisabilityBenefitsTerminatedWorkPeriods?: TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity;

  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedWorkPeriodsEarningsHistoryTypeormEntity.name;
}
