import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralTimelineAnalysisCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { DateTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date.transformer';

@Entity({
  name: 'rural_timeline_cnis_contribution_period_late_contribution',
})
export class RuralTimelineAnalysisCnisContributionPeriodLateContributionTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'original_contribution_date',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public originalContributionDate: Date;

  @Column({
    name: 'actual_payment_date',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public actualPaymentDate: Date;

  @Column({
    name: 'impact_analysis',
    type: 'text',
    nullable: true,
  })
  public impactAnalysis: string | null;

  @Column({
    name: 'analyzed_at',
    type: 'timestamp',
    nullable: true,
    transformer: DateTransformer,
  })
  public analyzedAt: Date | null;

  @ManyToOne(
    () => RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
    (entity) =>
      entity.ruralTimelineAnalysisCnisContributionPeriodLateContribution,
  )
  @JoinColumn({
    name: 'rural_timeline_cnis_contribution_period_id',
  })
  public ruralTimelineAnalysisCnisContributionPeriod?:
    | RuralTimelineAnalysisCnisContributionPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodLateContributionTypeormEntity.name;
}
