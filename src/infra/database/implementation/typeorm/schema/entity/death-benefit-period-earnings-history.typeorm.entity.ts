import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { DeathBenefitPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-period.typeorm.entity';

@Entity({ name: 'death_benefit_period_earnings_history' })
export class DeathBenefitPeriodEarningsHistoryTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'competence', type: 'date', nullable: true, transformer: DateOnlyTransformer })
  public competence: Date | null;

  @Column({ name: 'remuneration', type: 'longtext', nullable: true })
  public remuneration: string | null;

  @Column({ name: 'indicators', type: 'varchar', length: 255, nullable: true })
  public indicators: string | null;

  @Column({ name: 'payment_date', type: 'date', nullable: true, transformer: DateOnlyTransformer })
  public paymentDate: Date | null;

  @Column({ name: 'contribution', type: 'varchar', length: 255, nullable: true })
  public contribution: string | null;

  @Column({ name: 'contribution_salary', type: 'varchar', length: 255, nullable: true })
  public contributionSalary: string | null;

  @Column({ name: 'analysis', type: 'longtext', nullable: true })
  public analysis: string | null;

  @Column({ name: 'competence_below_the_minimum', type: 'boolean', nullable: true })
  public competenceBelowTheMinimum: boolean | null;

  @ManyToOne(
    () => DeathBenefitPeriodTypeormEntity,
    (entity) => entity.deathBenefitPeriodEarningsHistory,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_period_id' })
  public deathBenefitPeriod?: DeathBenefitPeriodTypeormEntity | null;

  protected override readonly _type = DeathBenefitPeriodEarningsHistoryTypeormEntity.name;
}
