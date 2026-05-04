import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementReviewTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { ReasonPendencyEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/enum/reason-pendency.enum';

@Entity({ name: 'general_urban_retirement_review_period' })
export class GeneralUrbanRetirementReviewPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'period_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public periodName: string | null;

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
    name: 'category',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public category: string | null;

  @Column({
    name: 'is_pendency',
    type: 'boolean',
    nullable: true,
  })
  public isPendency: boolean | null;

  @Column({
    name: 'reason_pendency',
    type: 'simple-enum',
    enum: ReasonPendencyEnum,
    nullable: true,
  })
  public reasonPendency: ReasonPendencyEnum | null;

  @Column({
    name: 'competence_below_the_minimum',
    type: 'boolean',
    nullable: true,
  })
  public competenceBelowTheMinimum: boolean | null;

  @Column({
    name: 'contribution_average',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  public contributionAverage: string | null;

  @Column({
    name: 'type_of_contribution',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public typeOfContribution: string | null;

  @ManyToOne(
    () => GeneralUrbanRetirementReviewTypeormEntity,
    (entity) => entity.generalUrbanRetirementReviewPeriod,
    { nullable: true },
  )
  @JoinColumn({ name: 'general_urban_retirement_review_id' })
  public generalUrbanRetirementReview?: GeneralUrbanRetirementReviewTypeormEntity | null;

  @Column({
    name: 'status',
    type: 'boolean',
    nullable: true,
  })
  public status: boolean | null;

  protected override readonly _type =
    GeneralUrbanRetirementReviewPeriodTypeormEntity.name;
}
