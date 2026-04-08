import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-work-periods.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({
  name: 'temp_disability_benefits_grant_work_periods_earnings_history',
})
export class TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormEntity extends BaseTypeormEntity {
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
    () => TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity,
    (entity) =>
      entity.temporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistory,
    { nullable: true },
  )
  @JoinColumn({ name: 'temporary_disability_benefits_grant_work_periods_id' })
  public temporaryDisabilityBenefitsGrantWorkPeriods?: TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity | null;

  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantWorkPeriodsEarningsHistoryTypeormEntity.name;
}
