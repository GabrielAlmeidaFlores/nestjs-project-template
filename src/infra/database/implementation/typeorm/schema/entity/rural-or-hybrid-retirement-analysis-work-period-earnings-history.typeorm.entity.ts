import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-work-period.typeorm.entity';
import { DateTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date.transformer';

@Entity({
  name: 'rural_or_hybrid_retirement_analysis_work_period_earnings_hist',
})
export class RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'competence', type: 'varchar', length: 255, nullable: true })
  public competence: string | null;

  @Column({
    name: 'remuneration',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public remuneration: string | null;

  @Column({ name: 'indicators', type: 'longtext', nullable: true })
  public indicators: string | null;

  @Column({
    name: 'payment_date',
    type: 'timestamp',
    transformer: DateTransformer,
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

  @Column({ name: 'competence_below_minimum', type: 'boolean', nullable: true })
  public competenceBelowMinimum: boolean | null;

  @ManyToOne(
    () => RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementAnalysisWorkPeriodEarningsHistory,
  )
  @JoinColumn({ name: 'rural_or_hybrid_retirement_analysis_work_period_id' })
  public ruralOrHybridRetirementAnalysisWorkPeriod?:
    | RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryTypeormEntity.name;
}
