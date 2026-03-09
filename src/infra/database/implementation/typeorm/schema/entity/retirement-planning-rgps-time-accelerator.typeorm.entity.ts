import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'retirement_planning_rgps_time_accelerator' })
export class RetirementPlanningRgpsTimeAcceleratorTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'time_type', type: 'varchar', length: 100 })
  public timeType: string;

  @Column({ name: 'recognition_inss', type: 'varchar', length: 255 })
  public recognitionInss: string;

  @Column({ name: 'recognition_judicial', type: 'varchar', length: 255 })
  public recognitionJudicial: string;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: true })
  public name: string | null;

  @Column({ name: 'institution', type: 'varchar', length: 255, nullable: true })
  public institution: string | null;

  @Column({
    name: 'period_start',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public periodStart: Date | null;

  @Column({
    name: 'period_end',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public periodEnd: Date | null;

  @Column({
    name: 'affects_qualifying_period',
    type: 'boolean',
    nullable: true,
  })
  public affectsQualifyingPeriod: boolean | null;

  @Column({ name: 'viability', type: 'varchar', length: 50, nullable: true })
  public viability: string | null;

  @Column({ name: 'technical_note', type: 'longtext', nullable: true })
  public technicalNote: string | null;

  @ManyToOne(
    () => RetirementPlanningRgpsTypeormEntity,
    (entity) => entity.timeAccelerators,
    { nullable: true },
  )
  @JoinColumn({ name: 'retirement_planning_rgps_id' })
  public retirementPlanningRgps?: RetirementPlanningRgpsTypeormEntity | null;

  protected override readonly _type =
    RetirementPlanningRgpsTimeAcceleratorTypeormEntity.name;
}
