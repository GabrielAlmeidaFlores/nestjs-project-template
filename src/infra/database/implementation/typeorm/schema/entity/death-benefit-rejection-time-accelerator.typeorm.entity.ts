import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { DeathBenefitRejectionTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-recognition-inss.enum';
import { DeathBenefitRejectionTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-recognition-judicial.enum';
import { DeathBenefitRejectionTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-type.enum';
import { DeathBenefitRejectionTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/enum/death-benefit-rejection-time-accelerator-viability.enum';

@Entity({ name: 'death_benefit_rejection_time_accelerator' })
export class DeathBenefitRejectionTimeAcceleratorTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: DeathBenefitRejectionTimeAcceleratorTypeEnum,
  })
  public type: DeathBenefitRejectionTimeAcceleratorTypeEnum;

  @Column({
    name: 'recognition_inss',
    type: 'simple-enum',
    enum: DeathBenefitRejectionTimeAcceleratorRecognitionInssEnum,
  })
  public recognitionInss: DeathBenefitRejectionTimeAcceleratorRecognitionInssEnum;

  @Column({
    name: 'recognition_judicial',
    type: 'simple-enum',
    enum: DeathBenefitRejectionTimeAcceleratorRecognitionJudicialEnum,
  })
  public recognitionJudicial: DeathBenefitRejectionTimeAcceleratorRecognitionJudicialEnum;

  @Column({
    name: 'viability',
    type: 'simple-enum',
    enum: DeathBenefitRejectionTimeAcceleratorViabilityEnum,
  })
  public viability: DeathBenefitRejectionTimeAcceleratorViabilityEnum;

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
    () => DeathBenefitRejectionTypeormEntity,
    (entity) => entity.deathBenefitRejectionTimeAccelerator,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_rejection_id' })
  public deathBenefitRejection?: DeathBenefitRejectionTypeormEntity | null;

  protected override readonly _type =
    DeathBenefitRejectionTimeAcceleratorTypeormEntity.name;
}
