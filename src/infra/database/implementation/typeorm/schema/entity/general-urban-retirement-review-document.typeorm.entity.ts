import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementReviewTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review.typeorm.entity';
import { GeneralUrbanRetirementReviewDocumentTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-document/enum/general-urban-retirement-review-document-type.enum';

@Entity({ name: 'general_urban_retirement_review_document' })
export class GeneralUrbanRetirementReviewDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255 })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: GeneralUrbanRetirementReviewDocumentTypeEnum,
  })
  public type: GeneralUrbanRetirementReviewDocumentTypeEnum;

  @ManyToOne(
    () => GeneralUrbanRetirementReviewTypeormEntity,
    (entity) => entity.generalUrbanRetirementReviewDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'general_urban_retirement_review_id' })
  public generalUrbanRetirementReview?: GeneralUrbanRetirementReviewTypeormEntity | null;

  protected override readonly _type =
    GeneralUrbanRetirementReviewDocumentTypeormEntity.name;
}
