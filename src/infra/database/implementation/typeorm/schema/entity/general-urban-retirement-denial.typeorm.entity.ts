import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementDenialDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-document.typeorm.entity';
import { GeneralUrbanRetirementDenialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-period.typeorm.entity';
import { GeneralUrbanRetirementDenialResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-result.typeorm.entity';
import { GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-time-accelerator.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'general_urban_retirement_denial' })
export class GeneralUrbanRetirementDenialTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @Column({
    name: 'request_entry_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public requestEntryDate: Date | null;

  @Column({
    name: 'denial_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public denialDate: Date | null;

  @OneToOne(
    () => GeneralUrbanRetirementDenialResultTypeormEntity,
    (entity) => entity.generalUrbanRetirementDenial,
    { nullable: true },
  )
  @JoinColumn({ name: 'general_urban_retirement_denial_result_id' })
  public generalUrbanRetirementDenialResult?: GeneralUrbanRetirementDenialResultTypeormEntity | null;

  @OneToMany(
    () => GeneralUrbanRetirementDenialDocumentTypeormEntity,
    (entity) => entity.generalUrbanRetirementDenial,
  )
  public generalUrbanRetirementDenialDocument?: GeneralUrbanRetirementDenialDocumentTypeormEntity[];

  @OneToMany(
    () => GeneralUrbanRetirementDenialPeriodTypeormEntity,
    (entity) => entity.generalUrbanRetirementDenial,
  )
  public generalUrbanRetirementDenialPeriod?: GeneralUrbanRetirementDenialPeriodTypeormEntity[];

  @OneToMany(
    () => GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity,
    (entity) => entity.generalUrbanRetirementDenial,
  )
  public generalUrbanRetirementDenialTimeAccelerator?: GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity[];

  protected override readonly _type =
    GeneralUrbanRetirementDenialTypeormEntity.name;
}
