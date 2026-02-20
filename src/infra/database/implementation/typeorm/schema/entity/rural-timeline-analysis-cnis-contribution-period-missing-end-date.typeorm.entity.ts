import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralTimelineAnalysisCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({
  name: 'rural_timeline_cnis_contribution_period_missing_end_date',
})
export class RuralTimelineAnalysisCnisContributionPeriodMissingEndDateTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'missing_end_date',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public missingEndDate: Date;

  @Column({
    name: 'actual_remuneration_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  public actualRemunerationAmount: string;

  @ManyToOne(
    () => RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
    (entity) =>
      entity.ruralTimelineAnalysisCnisContributionPeriodMissingEndDate,
  )
  @JoinColumn({
    name: 'rural_timeline_cnis_contribution_period_id',
  })
  public ruralTimelineAnalysisCnisContributionPeriod?:
    | RuralTimelineAnalysisCnisContributionPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodMissingEndDateTypeormEntity.name;
}
