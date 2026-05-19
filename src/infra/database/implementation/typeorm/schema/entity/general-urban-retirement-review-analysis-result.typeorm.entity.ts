import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementReviewTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review.typeorm.entity';
import { AnalysisTypeEnum } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-analysis-result/enum/analysis-type.enum';

@Entity({ name: 'general_urban_retirement_review_analysis_result' })
export class GeneralUrbanRetirementReviewAnalysisResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_type',
    type: 'simple-enum',
    enum: AnalysisTypeEnum,
    nullable: true,
  })
  public analysisType: AnalysisTypeEnum | null;

  @Column({ name: 'response', type: 'longtext' })
  public response: string;

  @ManyToOne(
    () => GeneralUrbanRetirementReviewTypeormEntity,
    (entity) => entity.generalUrbanRetirementReviewAnalysisResult,
    { nullable: true },
  )
  @JoinColumn({ name: 'general_urban_retirement_review_id' })
  public generalUrbanRetirementReview?: GeneralUrbanRetirementReviewTypeormEntity | null;

  protected override readonly _type =
    GeneralUrbanRetirementReviewAnalysisResultTypeormEntity.name;
}
