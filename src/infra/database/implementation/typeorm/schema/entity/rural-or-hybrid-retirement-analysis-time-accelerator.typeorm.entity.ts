import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { RuralOrHybridRetirementAnalysisTimeAcceleratorAnalysisTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/enum/rural-or-hybrid-retirement-analysis-time-accelerator-analysis-type.enum';
import { RuralOrHybridRetirementAnalysisTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/enum/rural-or-hybrid-retirement-analysis-time-accelerator-recognition-inss.enum';
import { RuralOrHybridRetirementAnalysisViabilityEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-time-accelerator/enum/rural-or-hybrid-retirement-analysis-viability.enum';

@Entity({ name: 'rural_or_hybrid_retirement_analysis_time_accelerator' })
export class RuralOrHybridRetirementAnalysisTimeAcceleratorTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'time_type',
    type: 'simple-enum',
    enum: RuralOrHybridRetirementAnalysisTimeAcceleratorAnalysisTypeEnum,
    nullable: true,
  })
  public timeType: RuralOrHybridRetirementAnalysisTimeAcceleratorAnalysisTypeEnum | null;

  @Column({ name: 'institution', type: 'varchar', length: 255, nullable: true })
  public institution: string | null;

  @Column({
    name: 'recognition_inss',
    type: 'simple-enum',
    enum: RuralOrHybridRetirementAnalysisTimeAcceleratorRecognitionInssEnum,
    nullable: true,
  })
  public recognitionInss: RuralOrHybridRetirementAnalysisTimeAcceleratorRecognitionInssEnum | null;

  @Column({
    name: 'affects_qualifying_period',
    type: 'boolean',
    nullable: true,
  })
  public affectsQualifyingPeriod: boolean | null;

  @Column({ name: 'technical_note', type: 'longtext', nullable: true })
  public technicalNote: string | null;

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
    name: 'grace_period',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public gracePeriod: string | null;

  @Column({
    name: 'viability',
    type: 'simple-enum',
    enum: RuralOrHybridRetirementAnalysisViabilityEnum,
    nullable: true,
  })
  public viability: RuralOrHybridRetirementAnalysisViabilityEnum | null;

  @ManyToOne(
    () => RuralOrHybridRetirementAnalysisTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementAnalysisTimeAccelerator,
  )
  @JoinColumn({ name: 'rural_or_hybrid_retirement_analysis_id' })
  public ruralOrHybridRetirementAnalysis?:
    | RuralOrHybridRetirementAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralOrHybridRetirementAnalysisTimeAcceleratorTypeormEntity.name;
}
