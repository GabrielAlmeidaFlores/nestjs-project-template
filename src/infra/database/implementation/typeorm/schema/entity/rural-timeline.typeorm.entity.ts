import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralTimelineCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-cnis-contribution-period.typeorm.entity';
import { RuralTimelineDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-document.typeorm.entity';
import { RuralTimelinePeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-period.typeorm.entity';
import { RuralTimelineWorkRegimeEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/enum/rural-timeline-work-regime.enum';

@Entity({ name: 'rural_timeline' })
export class RuralTimelineTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'rural_timeline_analysis',
    type: 'text',
    nullable: true,
  })
  public ruralTimelineAnalysis?: string | null;

  @Column({
    name: 'rural_timeline_period_document_analysis',
    type: 'text',
    nullable: true,
  })
  public ruralTimelinePeriodDocumentAnalysis?: string | null;

  @Column({
    name: 'work_regime',
    type: 'varchar',
    length: 50,
  })
  public workRegime: RuralTimelineWorkRegimeEnum;

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.ruralTimeline,
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | undefined;

  @OneToMany(
    () => RuralTimelineDocumentTypeormEntity,
    (entity) => entity.ruralTimeline,
  )
  public ruralTimelineDocument?:
    | RuralTimelineDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RuralTimelinePeriodTypeormEntity,
    (entity) => entity.ruralTimeline,
  )
  public ruralTimelinePeriod?: RuralTimelinePeriodTypeormEntity[] | undefined;

  @OneToMany(
    () => RuralTimelineCnisContributionPeriodTypeormEntity,
    (entity) => entity.ruralTimeline,
  )
  public ruralTimelineCnisContributionPeriod?:
    | RuralTimelineCnisContributionPeriodTypeormEntity[]
    | undefined;

  protected override readonly _type = RuralTimelineTypeormEntity.name;
}
