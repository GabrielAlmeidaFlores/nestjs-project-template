import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementReviewTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'general_urban_retirement_review_time_accelerator' })
export class GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity extends BaseTypeormEntity {
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

  @Column({ name: 'time_gained', type: 'varchar', length: 100, nullable: true })
  public timeGained: string | null;

  @Column({ name: 'viability', type: 'varchar', length: 50, nullable: true })
  public viability: string | null;

  @Column({ name: 'technical_note', type: 'longtext', nullable: true })
  public technicalNote: string | null;

  @ManyToOne(
    () => GeneralUrbanRetirementReviewTypeormEntity,
    (entity) => entity.timeAccelerators,
    { nullable: true },
  )
  @JoinColumn({ name: 'general_urban_retirement_review_id' })
  public generalUrbanRetirementReview?: GeneralUrbanRetirementReviewTypeormEntity | null;

  protected override readonly _type =
    GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity.name;
}
