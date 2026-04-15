import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document-analysis.typeorm.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-work-period-document.typeorm.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-work-period-earnings-history.typeorm.entity';
import { RuralOrHybridRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { RuralOrHybridRetirementRejectionWorkPeriodJobTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period/enum/rural-or-hybrid-retirement-rejection-work-period-job-type.enum';

@Entity({ name: 'rural_or_hybrid_retirement_rejection_work_period' })
export class RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity extends BaseTypeormEntity {
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
    enum: RuralOrHybridRetirementRejectionWorkPeriodJobTypeEnum,
    nullable: true,
  })
  public jobType: RuralOrHybridRetirementRejectionWorkPeriodJobTypeEnum | null;

  @Column({ name: 'activity_description', type: 'longtext', nullable: true })
  public activityDescription: string | null;

  @ManyToOne(
    () => RuralOrHybridRetirementRejectionTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementRejectionWorkPeriod,
  )
  @JoinColumn({ name: 'rural_or_hybrid_retirement_rejection_id' })
  public ruralOrHybridRetirementRejection?:
    | RuralOrHybridRetirementRejectionTypeormEntity
    | undefined;

  @OneToMany(
    () => RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementRejectionWorkPeriod,
  )
  public ruralOrHybridRetirementRejectionWorkPeriodDocument?:
    | RuralOrHybridRetirementRejectionWorkPeriodDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () =>
      RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementRejectionWorkPeriod,
  )
  public ruralOrHybridRetirementRejectionWorkPeriodDocumentAnalysis?:
    | RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisTypeormEntity[]
    | undefined;

  @OneToMany(
    () =>
      RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementRejectionWorkPeriod,
  )
  public ruralOrHybridRetirementRejectionWorkPeriodEarningsHistory?:
    | RuralOrHybridRetirementRejectionWorkPeriodEarningsHistoryTypeormEntity[]
    | undefined;

  protected override readonly _type =
    RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity.name;
}
