import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralTimelineCnisContributionPeriodUnderMinimumTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-cnis-contribution-period-under-minimum.typeorm.entity';
import { RuralTimelineTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline.typeorm.entity';
import { ContributionAdjustmentIntentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period/enum/contribution-adjustment-intent-type.enum';
import { RuralTimelineCnisContributionPeriodStatusEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-cnis-contribution-period/enum/rural-timeline-cnis-contribution-period-status.enum';

@Entity({ name: 'rural_timeline_cnis_contribution_period' })
export class RuralTimelineCnisContributionPeriodTypeormEntity extends BaseTypeormEntity {
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
  })
  public startDate?: Date | null;

  @Column({
    name: 'end_date',
    type: 'date',
    nullable: true,
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
  public status?: RuralTimelineCnisContributionPeriodStatusEnum | null;

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

  @ManyToOne(
    () => RuralTimelineTypeormEntity,
    (entity) => entity.ruralTimelineCnisContributionPeriod,
  )
  @JoinColumn({ name: 'rural_timeline_id' })
  public ruralTimeline?: RuralTimelineTypeormEntity | undefined;

  @OneToMany(
    () => RuralTimelineCnisContributionPeriodUnderMinimumTypeormEntity,
    (entity) => entity.ruralTimelineCnisContributionPeriod,
  )
  public ruralTimelineCnisContributionPeriodUnderMinimum?:
    | RuralTimelineCnisContributionPeriodUnderMinimumTypeormEntity[]
    | undefined;

  protected override readonly _type =
    RuralTimelineCnisContributionPeriodTypeormEntity.name;
}
