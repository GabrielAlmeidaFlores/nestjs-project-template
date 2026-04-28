import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementReviewPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-period.typeorm.entity';
import { GeneralUrbanRetirementReviewTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'general_urban_retirement_review_period_earnings_history' })
export class GeneralUrbanRetirementReviewEarningsHistoryTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'competence',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public competence: Date | null;

  @Column({
    name: 'remuneration',
    type: 'longtext',
    nullable: true,
  })
  public remuneration: string | null;

  @Column({
    name: 'indicators',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public indicators: string | null;

  @Column({
    name: 'payment_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public paymentDate: Date | null;

  @Column({
    name: 'contribution',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public contribution: string | null;

  @Column({
    name: 'contribution_salary',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public contributionSalary: string | null;

  @Column({
    name: 'analysis',
    type: 'longtext',
    nullable: true,
  })
  public analysis: string | null;

  @ManyToOne(() => GeneralUrbanRetirementReviewPeriodTypeormEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'general_urban_retirement_review_period_id' })
  public generalUrbanRetirementReviewPeriod?: GeneralUrbanRetirementReviewPeriodTypeormEntity | null;

  @ManyToOne(() => GeneralUrbanRetirementReviewTypeormEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'general_urban_retirement_review_id' })
  public generalUrbanRetirementReview?: GeneralUrbanRetirementReviewTypeormEntity | null;

  @Column({
    name: 'competence_below_the_minimum',
    type: 'boolean',
    nullable: true,
  })
  public competenceBelowTheMinimum: boolean | null;

  protected override readonly _type =
    GeneralUrbanRetirementReviewEarningsHistoryTypeormEntity.name;
}

export {
  GeneralUrbanRetirementReviewEarningsHistoryTypeormEntity as GeneralUrbanRetirementReviewPeriodEarningsHistoryTypeormEntity,
};
