import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralTimelineAnalysisCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'rural_timeline_cnis_contribution_period_adjustment' })
export class RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'technical_observation', type: 'text' })
  public technicalObservation: string;

  @Column({ name: 'contribution_time_gained_years', type: 'int' })
  public contributionTimeGainedYears: number;

  @Column({ name: 'contribution_time_gained_months', type: 'int' })
  public contributionTimeGainedMonths: number;

  @Column({ name: 'contribution_time_gained_days', type: 'int' })
  public contributionTimeGainedDays: number;

  @Column({
    name: 'conventional_period_start_date',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public conventionalPeriodStartDate: Date;

  @Column({
    name: 'conventional_period_end_date',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public conventionalPeriodEndDate: Date;

  @ManyToOne(
    () => RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
  )
  @JoinColumn({ name: 'rural_timeline_cnis_contribution_period_id' })
  public ruralTimelineCnisContributionPeriod?:
    | RuralTimelineAnalysisCnisContributionPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodAdjustmentTypeormEntity.name;
}
