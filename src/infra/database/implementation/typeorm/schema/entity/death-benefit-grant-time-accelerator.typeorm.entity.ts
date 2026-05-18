import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { DeathBenefitGrantTimeAcceleratorRecognitionInssEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-recognition-inss.enum';
import { DeathBenefitGrantTimeAcceleratorRecognitionJudicialEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-recognition-judicial.enum';
import { DeathBenefitGrantTimeAcceleratorTypeEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-type.enum';
import { DeathBenefitGrantTimeAcceleratorViabilityEnum } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/enum/death-benefit-grant-time-accelerator-viability.enum';

@Entity({ name: 'death_benefit_grant_time_accelerator' })
export class DeathBenefitGrantTimeAcceleratorTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: DeathBenefitGrantTimeAcceleratorTypeEnum,
  })
  public type: DeathBenefitGrantTimeAcceleratorTypeEnum;

  @Column({
    name: 'recognition_inss',
    type: 'simple-enum',
    enum: DeathBenefitGrantTimeAcceleratorRecognitionInssEnum,
  })
  public recognitionInss: DeathBenefitGrantTimeAcceleratorRecognitionInssEnum;

  @Column({
    name: 'recognition_judicial',
    type: 'simple-enum',
    enum: DeathBenefitGrantTimeAcceleratorRecognitionJudicialEnum,
  })
  public recognitionJudicial: DeathBenefitGrantTimeAcceleratorRecognitionJudicialEnum;

  @Column({
    name: 'viability',
    type: 'simple-enum',
    enum: DeathBenefitGrantTimeAcceleratorViabilityEnum,
  })
  public viability: DeathBenefitGrantTimeAcceleratorViabilityEnum;

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
    () => DeathBenefitGrantTypeormEntity,
    (entity) => entity.deathBenefitGrantTimeAccelerator,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_grant_id' })
  public deathBenefitGrant?: DeathBenefitGrantTypeormEntity | null;

  protected override readonly _type =
    DeathBenefitGrantTimeAcceleratorTypeormEntity.name;
}
