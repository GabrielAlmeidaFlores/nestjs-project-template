import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementReviewTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review.typeorm.entity';

@Entity({ name: 'general_urban_retirement_review_special_period' })
export class GeneralUrbanRetirementReviewSpecialPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'response', type: 'longtext' })
  public response: string;

  @ManyToOne(
    () => GeneralUrbanRetirementReviewTypeormEntity,
    (entity) => entity.specialTimePeriods,
    { nullable: true },
  )
  @JoinColumn({ name: 'general_urban_retirement_review_id' })
  public generalUrbanRetirementReview?: GeneralUrbanRetirementReviewTypeormEntity | null;

  protected override readonly _type =
    GeneralUrbanRetirementReviewSpecialPeriodTypeormEntity.name;
}
