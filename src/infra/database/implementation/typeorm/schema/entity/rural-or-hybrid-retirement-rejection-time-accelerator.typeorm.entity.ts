import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralOrHybridRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/enum/rural-or-hybrid-retirement-rejection-time-accelerator-analysis-type.enum';
import { RuralOrHybridRetirementRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/enum/rural-or-hybrid-retirement-rejection-time-accelerator-recognition-inss.enum';
import { RuralOrHybridRetirementRejectionViabilityEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator/enum/rural-or-hybrid-retirement-rejection-viability.enum';

@Entity({ name: 'rural_or_hybrid_retirement_rejection_time_accelerator' })
export class RuralOrHybridRetirementRejectionTimeAcceleratorTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'time_type', type: 'simple-enum', enum: RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum, nullable: true })
  public timeType: RuralOrHybridRetirementRejectionTimeAcceleratorAnalysisTypeEnum | null;

  @Column({ name: 'institution', type: 'varchar', length: 255, nullable: true })
  public institution: string | null;

  @Column({ name: 'recognition_inss', type: 'simple-enum', enum: RuralOrHybridRetirementRejectionTimeAcceleratorRecognitionInssEnum, nullable: true })
  public recognitionInss: RuralOrHybridRetirementRejectionTimeAcceleratorRecognitionInssEnum | null;

  @Column({ name: 'affects_qualifying_period', type: 'boolean', nullable: true })
  public affectsQualifyingPeriod: boolean | null;

  @Column({ name: 'technical_note', type: 'longtext', nullable: true })
  public technicalNote: string | null;

  @Column({ name: 'start_date', type: 'date', transformer: DateOnlyTransformer, nullable: true })
  public startDate: Date | null;

  @Column({ name: 'end_date', type: 'date', transformer: DateOnlyTransformer, nullable: true })
  public endDate: Date | null;

  @Column({ name: 'grace_period', type: 'varchar', length: 255, nullable: true })
  public gracePeriod: string | null;

  @Column({ name: 'viability', type: 'simple-enum', enum: RuralOrHybridRetirementRejectionViabilityEnum, nullable: true })
  public viability: RuralOrHybridRetirementRejectionViabilityEnum | null;

  @ManyToOne(
    () => RuralOrHybridRetirementRejectionTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementRejectionTimeAccelerator,
  )
  @JoinColumn({ name: 'rural_or_hybrid_retirement_rejection_id' })
  public ruralOrHybridRetirementRejection?:
    | RuralOrHybridRetirementRejectionTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralOrHybridRetirementRejectionTimeAcceleratorTypeormEntity.name;
}
