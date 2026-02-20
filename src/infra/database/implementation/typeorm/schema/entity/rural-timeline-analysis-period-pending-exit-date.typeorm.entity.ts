import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralTimelineAnalysisCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'rural_timeline_period_pending_exit_date' })
export class RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'pending_date',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public pendingDate: Date;

  @Column({
    name: 'pending_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  public pendingAmount: string;

  @ManyToOne(
    () => RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
    (entity) => entity.ruralTimelineCnisContributionPeriodPendingExitDate,
  )
  @JoinColumn({ name: 'rural_timeline_cnis_contribution_period_id' })
  public ruralTimelineCnisContributionPeriod?:
    | RuralTimelineAnalysisCnisContributionPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity.name;
}
