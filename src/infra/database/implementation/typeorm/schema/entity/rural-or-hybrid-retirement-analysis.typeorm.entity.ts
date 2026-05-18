import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralOrHybridRetirementAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-document.typeorm.entity';
import { RuralOrHybridRetirementAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-period.typeorm.entity';
import { RuralOrHybridRetirementAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-result.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator.typeorm.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-work-period.typeorm.entity';
import { RuralOrHybridRetirementAnalysisActivityTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/enum/rural-or-hybrid-retirement-analysis-activity-type.enum';
import { RuralOrHybridRetirementAnalysisRequestedBenefitEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/enum/rural-or-hybrid-retirement-analysis-requested-benefit.enum';

@Entity({ name: 'rural_or_hybrid_retirement_analysis' })
export class RuralOrHybridRetirementAnalysisTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @Column({
    name: 'activity_type',
    type: 'simple-enum',
    enum: RuralOrHybridRetirementAnalysisActivityTypeEnum,
    nullable: true,
  })
  public activityType: RuralOrHybridRetirementAnalysisActivityTypeEnum | null;

  @Column({
    name: 'requested_benefit',
    type: 'simple-enum',
    enum: RuralOrHybridRetirementAnalysisRequestedBenefitEnum,
    nullable: true,
  })
  public requestedBenefit: RuralOrHybridRetirementAnalysisRequestedBenefitEnum | null;

  @OneToOne(
    () => RuralOrHybridRetirementAnalysisResultTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementAnalysis,
    { nullable: true },
  )
  @JoinColumn({ name: 'rural_or_hybrid_retirement_analysis_result_id' })
  public ruralOrHybridRetirementAnalysisResult?:
    | RuralOrHybridRetirementAnalysisResultTypeormEntity
    | null
    | undefined;

  @OneToMany(
    () => RuralOrHybridRetirementAnalysisDocumentTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementAnalysis,
  )
  public ruralOrHybridRetirementAnalysisDocument?:
    | RuralOrHybridRetirementAnalysisDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RuralOrHybridRetirementAnalysisPeriodTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementAnalysis,
  )
  public ruralOrHybridRetirementAnalysisPeriod?:
    | RuralOrHybridRetirementAnalysisPeriodTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RuralOrHybridRetirementAnalysisTestimonialWitnessTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementAnalysis,
  )
  public ruralOrHybridRetirementAnalysisTestimonialWitness?:
    | RuralOrHybridRetirementAnalysisTestimonialWitnessTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementAnalysis,
  )
  public ruralOrHybridRetirementAnalysisWorkPeriod?:
    | RuralOrHybridRetirementAnalysisWorkPeriodTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RuralOrHybridRetirementAnalysisTimeAcceleratorTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementAnalysis,
  )
  public ruralOrHybridRetirementAnalysisTimeAccelerator?:
    | RuralOrHybridRetirementAnalysisTimeAcceleratorTypeormEntity[]
    | undefined;

  protected override readonly _type =
    RuralOrHybridRetirementAnalysisTypeormEntity.name;
}
