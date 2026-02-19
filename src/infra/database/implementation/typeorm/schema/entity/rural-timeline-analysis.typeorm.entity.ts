import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralTimelineAnalysisCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period.typeorm.entity';
import { RuralTimelineAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-document.typeorm.entity';
import { RuralTimelineAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-inss-benefit.typeorm.entity';
import { RuralTimelineAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-legal-proceeding.typeorm.entity';
import { RuralTimelineAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period.typeorm.entity';
import { RuralTimelineAnalysisWorkRegimeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/enum/rural-timeline-work-regime.enum';

@Entity({ name: 'rural_timeline' })
export class RuralTimelineAnalysisTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'rural_timeline_complete_analysis',
    type: 'text',
    nullable: true,
  })
  public ruralTimelineCompleteAnalysis?: string | null;

  @Column({
    name: 'rural_timeline_simplified_analysis',
    type: 'text',
    nullable: true,
  })
  public ruralTimelineSimplifiedAnalysis?: string | null;

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
  public workRegime: RuralTimelineAnalysisWorkRegimeEnum;

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.ruralTimeline,
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | undefined;

  @OneToMany(
    () => RuralTimelineAnalysisDocumentTypeormEntity,
    (entity) => entity.ruralTimeline,
  )
  public ruralTimelineDocument?:
    | RuralTimelineAnalysisDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RuralTimelineAnalysisPeriodTypeormEntity,
    (entity) => entity.ruralTimeline,
  )
  public ruralTimelinePeriod?:
    | RuralTimelineAnalysisPeriodTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
    (entity) => entity.ruralTimeline,
  )
  public ruralTimelineCnisContributionPeriod?:
    | RuralTimelineAnalysisCnisContributionPeriodTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RuralTimelineAnalysisInssBenefitTypeormEntity,
    (entity) => entity.ruralTimeline,
  )
  public inssBenefits?:
    | RuralTimelineAnalysisInssBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RuralTimelineAnalysisLegalProceedingTypeormEntity,
    (entity) => entity.ruralTimeline,
  )
  public legalProceedings?:
    | RuralTimelineAnalysisLegalProceedingTypeormEntity[]
    | undefined;

  protected override readonly _type = RuralTimelineAnalysisTypeormEntity.name;
}
