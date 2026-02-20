import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period-under-minimum.typeorm.entity';
import { RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period-pending-exit-date.typeorm.entity';
import { RuralTimelineAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis.typeorm.entity';
import { RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-cnis-contribution-period-overdue-contribution.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { ContributionAdjustmentIntentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/contribution-adjustment-intent-type.enum';
import { RuralTimelineAnalysisCnisContributionPeriodStatusEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/rural-timeline-analysis-cnis-contribution-period-status.enum';

@Entity({ name: 'rural_timeline_cnis_contribution_period' })
export class RuralTimelineAnalysisCnisContributionPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'employment_relationship_source',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public employmentRelationshipSource?: string | null;

  @Column({
    name: 'start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public startDate?: Date | null;

  @Column({
    name: 'end_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public endDate?: Date | null;

  @Column({
    name: 'category',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public category?: string | null;

  @Column({
    name: 'qualifying_period',
    type: 'int',
    nullable: true,
  })
  public qualifyingPeriod?: number | null;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public status?: RuralTimelineAnalysisCnisContributionPeriodStatusEnum | null;

  @Column({
    name: 'average_contribution_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  public averageContributionAmount?: string | null;

  @Column({
    name: 'contribution_adjustment_intent',
    type: 'varchar',
    length: 50,
  })
  public contributionAdjustmentIntent: ContributionAdjustmentIntentTypeEnum;

  @Column({
    name: 'external_supplementation_intent',
    type: 'boolean',
  })
  public externalSupplementationIntent: boolean;

  @Column({
    name: 'cnis_document',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public cnisDocument?: string | null;

  @Column({
    name: 'impact_analysis',
    type: 'text',
    nullable: true,
  })
  public impactAnalysis?: string | null;

  @ManyToOne(
    () => RuralTimelineAnalysisTypeormEntity,
    (entity) => entity.ruralTimelineCnisContributionPeriod,
  )
  @JoinColumn({ name: 'rural_timeline_id' })
  public ruralTimeline?: RuralTimelineAnalysisTypeormEntity | undefined;

  @OneToMany(
    () => RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormEntity,
    (entity) => entity.ruralTimelineCnisContributionPeriod,
  )
  public ruralTimelineCnisContributionPeriodUnderMinimum?:
    | RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity,
    (entity) => entity.ruralTimelineCnisContributionPeriod,
  )
  public ruralTimelineCnisContributionPeriodPendingExitDate?:
    | RuralTimelineAnalysisPeriodPendingExitDateTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity,
    (entity) => entity.ruralTimelineCnisContributionPeriod,
  )
  public ruralTimelineCnisContributionPeriodOverdueContribution?:
    | RuralTimelineCnisContributionPeriodOverdueContributionTypeormEntity[]
    | undefined;

  protected override readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodTypeormEntity.name;
}
