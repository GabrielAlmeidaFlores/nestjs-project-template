import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementReviewTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-review.typeorm.entity';
import { CryptographyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/cryptography.transformer';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'general_urban_retirement_review_result' })
export class GeneralUrbanRetirementReviewResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'client_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public clientName: string | null;

  @Column({
    name: 'client_federal_document',
    type: 'varchar',
    length: 50,
    transformer: CryptographyTransformer,
    nullable: true,
  })
  public clientFederalDocument: string | null;

  @Column({
    name: 'client_birth_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public clientBirthDate: Date | null;

  @Column({
    name: 'client_last_affiliation_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public clientLastAffiliationDate: Date | null;

  @OneToOne(
    () => GeneralUrbanRetirementReviewTypeormEntity,
    (entity) => entity.generalUrbanRetirementReviewResult,
  )
  public generalUrbanRetirementReview?:
    | GeneralUrbanRetirementReviewTypeormEntity
    | undefined;

  @Column({
    name: 'compare_cnis_ctps',
    type: 'longtext',
    nullable: true,
  })
  public compareCnisCtps: string | null;

  @Column({
    name: 'compare_cnis_ctps_raw',
    type: 'longtext',
    nullable: true,
  })
  public compareCnisCtpsRaw: string | null;

  @Column({
    name: 'benefit_award_letter_analysis',
    type: 'longtext',
    nullable: true,
  })
  public benefitAwardLetterAnalysis: string | null;

  @Column({
    name: 'benefit_award_letter_analysis_raw',
    type: 'longtext',
    nullable: true,
  })
  public benefitAwardLetterAnalysisRaw: string | null;

  @Column({
    name: 'first_analysis',
    type: 'longtext',
    nullable: true,
  })
  public firstAnalysis: string | null;

  @Column({
    name: 'general_urban_retirement_review_complete_analysis',
    type: 'longtext',
    nullable: true,
  })
  public generalUrbanRetirementReviewCompleteAnalysis: string | null;

  @Column({
    name: 'general_urban_retirement_review_simplified_analysis',
    type: 'longtext',
    nullable: true,
  })
  public generalUrbanRetirementReviewSimplifiedAnalysis: string | null;

  @Column({
    name: 'general_urban_retirement_review_complete_analysis_download',
    type: 'longtext',
    nullable: true,
  })
  public generalUrbanRetirementReviewCompleteAnalysisDownload: string | null;

  protected override readonly _type =
    GeneralUrbanRetirementReviewResultTypeormEntity.name;
}
