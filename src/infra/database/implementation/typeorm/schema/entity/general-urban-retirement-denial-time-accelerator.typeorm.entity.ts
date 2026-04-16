import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { GeneralUrbanRetirementDenialTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-recognition-inss.enum';
import { GeneralUrbanRetirementDenialTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-recognition-judicial.enum';
import { GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-type.enum';
import { GeneralUrbanRetirementDenialTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/enum/general-urban-retirement-denial-time-accelerator-viability.enum';

@Entity({ name: 'general_urban_retirement_denial_time_accelerator' })
export class GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum,
  })
  public type: GeneralUrbanRetirementDenialTimeAcceleratorTypeEnum;

  @Column({
    name: 'recognition_inss',
    type: 'simple-enum',
    enum: GeneralUrbanRetirementDenialTimeAcceleratorRecognitionInssEnum,
  })
  public recognitionInss: GeneralUrbanRetirementDenialTimeAcceleratorRecognitionInssEnum;

  @Column({
    name: 'recognition_judicial',
    type: 'simple-enum',
    enum: GeneralUrbanRetirementDenialTimeAcceleratorRecognitionJudicialEnum,
  })
  public recognitionJudicial: GeneralUrbanRetirementDenialTimeAcceleratorRecognitionJudicialEnum;

  @Column({
    name: 'viability',
    type: 'simple-enum',
    enum: GeneralUrbanRetirementDenialTimeAcceleratorViabilityEnum,
  })
  public viability: GeneralUrbanRetirementDenialTimeAcceleratorViabilityEnum;

  @Column({
    name: 'technical_note',
    type: 'longtext',
    nullable: true,
  })
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
    name: 'institution',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public institution: string | null;

  @Column({
    name: 'affects_qualifying_period',
    type: 'boolean',
  })
  public affectsQualifyingPeriod: boolean;

  @ManyToOne(
    () => GeneralUrbanRetirementDenialTypeormEntity,
    (entity) => entity.generalUrbanRetirementDenialTimeAccelerator,
    { nullable: true },
  )
  @JoinColumn({ name: 'general_urban_retirement_denial_id' })
  public generalUrbanRetirementDenial?: GeneralUrbanRetirementDenialTypeormEntity | null;

  protected override readonly _type =
    GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity.name;
}
