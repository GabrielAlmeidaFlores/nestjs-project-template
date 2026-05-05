import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementReviewPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-period.typeorm.entity';

@Entity({ name: 'general_urban_retirement_review_period_document' })
export class GeneralUrbanRetirementReviewPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'document',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public document: string;

  @ManyToOne(() => GeneralUrbanRetirementReviewPeriodTypeormEntity, {
    nullable: true,
  })
  @JoinColumn({ name: 'general_urban_retirement_review_period_id' })
  public generalUrbanRetirementReviewPeriod?: GeneralUrbanRetirementReviewPeriodTypeormEntity | null;

  protected override readonly _type =
    GeneralUrbanRetirementReviewPeriodDocumentTypeormEntity.name;
}
