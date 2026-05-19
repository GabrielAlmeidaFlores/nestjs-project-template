import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document-analysis.typeorm.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-work-period-document.typeorm.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-work-period-earnings-history.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { RuralOrHybridRetirementAnalysisWorkPeriodJobTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period/enum/rural-or-hybrid-retirement-analysis-work-period-job-type.enum';

@Entity({ name: 'rural_or_hybrid_retirement_analysis_work_period' })
export class RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'bond_origin', type: 'varchar', length: 255, nullable: true })
  public bondOrigin: string | null;

  @Column({
    name: 'start_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public startDate: Date | null;

  @Column({
    name: 'end_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public endDate: Date | null;

  @Column({
    name: 'category',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public category: string | null;

  @Column({
    name: 'competence_below_the_minimum',
    type: 'boolean',
    nullable: true,
  })
  public competenceBelowTheMinimum: boolean | null;

  @Column({ name: 'pendency_reason', type: 'longtext', nullable: true })
  public pendencyReason: string | null;

  @Column({ name: 'period_consideration', type: 'longtext', nullable: true })
  public periodConsideration: string | null;

  @Column({
    name: 'contribution_average',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public contributionAverage: string | null;

  @Column({ name: 'status', type: 'varchar', length: 255, nullable: true })
  public status: string | null;

  @Column({
    name: 'grace_period',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public gracePeriod: string | null;

  @Column({
    name: 'job_type',
    type: 'simple-enum',
    enum: RuralOrHybridRetirementAnalysisWorkPeriodJobTypeEnum,
    nullable: true,
  })
  public jobType: RuralOrHybridRetirementAnalysisWorkPeriodJobTypeEnum | null;

  @Column({ name: 'activity_description', type: 'longtext', nullable: true })
  public activityDescription: string | null;

  @ManyToOne(
    () => RuralOrHybridRetirementAnalysisTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementAnalysisWorkPeriod,
  )
  @JoinColumn({ name: 'rural_or_hybrid_retirement_analysis_id' })
  public ruralOrHybridRetirementAnalysis?:
    | RuralOrHybridRetirementAnalysisTypeormEntity
    | undefined;

  @OneToMany(
    () => RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementAnalysisWorkPeriod,
  )
  public ruralOrHybridRetirementAnalysisWorkPeriodDocument?:
    | RuralOrHybridRetirementAnalysisWorkPeriodDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () =>
      RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementAnalysisWorkPeriod,
  )
  public ruralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysis?:
    | RuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementAnalysisWorkPeriod,
  )
  public ruralOrHybridRetirementAnalysisWorkPeriodEarningsHistory?:
    | RuralOrHybridRetirementAnalysisWorkPeriodEarningsHistoryTypeormEntity[]
    | undefined;

  protected override readonly _type =
    RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity.name;
}
