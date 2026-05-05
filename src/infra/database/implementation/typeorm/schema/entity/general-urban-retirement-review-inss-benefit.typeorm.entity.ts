import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementReviewTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review.typeorm.entity';

@Entity({ name: 'general_urban_retirement_review_inss_benefit' })
export class GeneralUrbanRetirementReviewInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit_number',
    type: 'varchar',
    length: 100,
  })
  public inssBenefitNumber: string;

  @ManyToOne(
    () => GeneralUrbanRetirementReviewTypeormEntity,
    (entity) => entity.generalUrbanRetirementReviewBenefit,
  )
  @JoinColumn({ name: 'general_urban_retirement_review_id' })
  public generalUrbanRetirementReview:
    | GeneralUrbanRetirementReviewTypeormEntity
    | undefined;

  protected override readonly _type =
    GeneralUrbanRetirementReviewInssBenefitTypeormEntity.name;
}
