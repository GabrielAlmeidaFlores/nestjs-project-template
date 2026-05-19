import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementReviewAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-analysis-result.typeorm.entity';
import { GeneralUrbanRetirementReviewDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-document.typeorm.entity';
import { GeneralUrbanRetirementReviewInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-inss-benefit.typeorm.entity';
import { GeneralUrbanRetirementReviewLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-legal-proceeding.typeorm.entity';
import { GeneralUrbanRetirementReviewPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-period.typeorm.entity';
import { GeneralUrbanRetirementReviewResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-result.typeorm.entity';
import { GeneralUrbanRetirementReviewSpecialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-special-period.typeorm.entity';
import { GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review-time-accelerator.typeorm.entity';

@Entity({ name: 'general_urban_retirement_review' })
export class GeneralUrbanRetirementReviewTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'cnis_document',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public cnisDocument: string | null;

  @Column({
    name: 'benefit_award_letter_document',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public benefitAwardLetterDocument: string | null;

  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @Column({
    name: 'category',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public category: string | null;

  @Column({
    name: 'my_inss_password',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  public myInssPassword: string | null;

  @OneToOne(
    () => GeneralUrbanRetirementReviewResultTypeormEntity,
    (entity) => entity.generalUrbanRetirementReview,
    { nullable: true },
  )
  @JoinColumn({ name: 'general_urban_retirement_review_result_id' })
  public generalUrbanRetirementReviewResult?:
    | GeneralUrbanRetirementReviewResultTypeormEntity
    | undefined;

  @OneToMany(
    () => GeneralUrbanRetirementReviewInssBenefitTypeormEntity,
    (entity) => entity.generalUrbanRetirementReview,
  )
  public generalUrbanRetirementReviewBenefit?:
    | GeneralUrbanRetirementReviewInssBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => GeneralUrbanRetirementReviewLegalProceedingTypeormEntity,
    (entity) => entity.generalUrbanRetirementReview,
  )
  public generalUrbanRetirementReviewLegalProceeding?:
    | GeneralUrbanRetirementReviewLegalProceedingTypeormEntity[]
    | undefined;

  @OneToMany(
    () => GeneralUrbanRetirementReviewPeriodTypeormEntity,
    (entity) => entity.generalUrbanRetirementReview,
  )
  public generalUrbanRetirementReviewPeriod?:
    | GeneralUrbanRetirementReviewPeriodTypeormEntity[]
    | undefined;

  @OneToMany(
    () => GeneralUrbanRetirementReviewAnalysisResultTypeormEntity,
    (entity) => entity.generalUrbanRetirementReview,
  )
  public generalUrbanRetirementReviewAnalysisResult?:
    | GeneralUrbanRetirementReviewAnalysisResultTypeormEntity[]
    | undefined;

  @OneToMany(
    () => GeneralUrbanRetirementReviewDocumentTypeormEntity,
    (entity) => entity.generalUrbanRetirementReview,
  )
  public generalUrbanRetirementReviewDocument?:
    | GeneralUrbanRetirementReviewDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity,
    (entity) => entity.generalUrbanRetirementReview,
  )
  public timeAccelerators?:
    | GeneralUrbanRetirementReviewTimeAcceleratorTypeormEntity[]
    | undefined;

  @OneToMany(
    () => GeneralUrbanRetirementReviewSpecialPeriodTypeormEntity,
    (entity) => entity.generalUrbanRetirementReview,
  )
  public specialTimePeriods?:
    | GeneralUrbanRetirementReviewSpecialPeriodTypeormEntity[]
    | undefined;

  protected override readonly _type =
    GeneralUrbanRetirementReviewTypeormEntity.name;
}
