import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { InsuranceQualityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-document.typeorm.entity';
import { InsuranceQualityAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-inss-benefit.typeorm.entity';
import { InsuranceQualityAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-legal-proceeding.typeorm.entity';
import { InsuranceQualityAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-result.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'insurance_quality_analysis' })
export class InsuranceQualityAnalysisTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_benefit_number',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public analysisBenefitNumber: string | null;

  @Column({
    name: 'analysis_benefit_type',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisBenefitType: string | null;

  @Column({
    name: 'analysis_benefit_concession_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public analysisBenefitConcessionDate: Date | null;

  @Column({
    name: 'analysis_benefit_cessation_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public analysisBenefitCessationDate: Date | null;

  @Column({
    name: 'analysis_has_previous_benefit',
    type: 'boolean',
    nullable: true,
  })
  public analysisHasPreviousBenefit: boolean | null;

  @Column({
    name: 'analysis_previous_benefit_details',
    type: 'text',
    nullable: true,
  })
  public analysisPreviousBenefitDetails: string | null;

  @Column({
    name: 'analysis_contribution_situation',
    type: 'text',
    nullable: true,
  })
  public analysisContributionSituation: string | null;

  @Column({
    name: 'analysis_has_rural_activity',
    type: 'boolean',
    nullable: true,
  })
  public analysisHasRuralActivity: boolean | null;

  @Column({
    name: 'analysis_rural_activity_details',
    type: 'text',
    nullable: true,
  })
  public analysisRuralActivityDetails: string | null;

  @Column({
    name: 'analysis_is_work_accident_or_serious_illness',
    type: 'boolean',
    nullable: true,
  })
  public analysisIsWorkAccidentOrSeriousIllness: boolean | null;

  @Column({
    name: 'analysis_is_serious_illness_art151',
    type: 'boolean',
    nullable: true,
  })
  public analysisIsSeriousIllnessArt151: boolean | null;

  @Column({
    name: 'analysis_serious_illnesses',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisSeriousIllnesses: string | null;

  @Column({
    name: 'analysis_other_serious_illness',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  public analysisOtherSeriousIllness: string | null;

  @Column({
    name: 'analysis_disease_start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public analysisDiseaseStartDate: Date | null;

  @Column({
    name: 'analysis_rural_start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public analysisRuralStartDate: Date | null;

  @Column({
    name: 'analysis_rural_end_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public analysisRuralEndDate: Date | null;

  @Column({
    name: 'analysis_had_involuntary_unemployment',
    type: 'boolean',
    nullable: true,
  })
  public analysisHadInvoluntaryUnemployment: boolean | null;

  @Column({
    name: 'analysis_intends_to_prove_by_testimony',
    type: 'boolean',
    nullable: true,
  })
  public analysisIntendsToProveByTestimony: boolean | null;

  @OneToOne(
    () => InsuranceQualityAnalysisResultTypeormEntity,
    (entity) => entity.insuranceQualityAnalysis,
    { nullable: true },
  )
  @JoinColumn({ name: 'insurance_quality_analysis_result_id' })
  public insuranceQualityAnalysisResult?:
    | InsuranceQualityAnalysisResultTypeormEntity
    | undefined;

  @OneToOne(
    () => AnalysisToolRecordTypeormEntity,
    (entity) => entity.insuranceQualityAnalysis,
    { nullable: true },
  )
  public analysisToolRecord?: AnalysisToolRecordTypeormEntity | undefined;

  @OneToMany(
    () => InsuranceQualityAnalysisLegalProceedingTypeormEntity,
    (entity) => entity.insuranceQualityAnalysis,
  )
  public insuranceQualityAnalysisLegalProceeding:
    | InsuranceQualityAnalysisLegalProceedingTypeormEntity[]
    | undefined;

  @OneToMany(
    () => InsuranceQualityAnalysisDocumentTypeormEntity,
    (entity) => entity.insuranceQualityAnalysis,
  )
  public insuranceQualityAnalysisDocument:
    | InsuranceQualityAnalysisDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => InsuranceQualityAnalysisInssBenefitTypeormEntity,
    (entity) => entity.insuranceQualityAnalysis,
  )
  public insuranceQualityAnalysisInssBenefit:
    | InsuranceQualityAnalysisInssBenefitTypeormEntity[]
    | undefined;

  protected override readonly _type =
    InsuranceQualityAnalysisTypeormEntity.name;
}
