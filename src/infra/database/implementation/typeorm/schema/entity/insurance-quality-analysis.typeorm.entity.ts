import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { InsuranceQualityAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-inss-benefit.typeorm.entity';
import { InsuranceQualityAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-legal-proceeding.typeorm.entity';
import { InsuranceQualityAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/insurance-quality-analysis-result.typeorm.entity';
import { DateTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date.transformer';

@Entity({ name: 'insurance_quality_analysis' })
export class InsuranceQualityAnalysisTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'cnis_document',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public cnisDocument: string | null;

  @Column({
    name: 'rural_document',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public ruralDocument: string | null;

  @Column({
    name: 'complementary_document',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public complementaryDocument: string | null;

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
    transformer: DateTransformer,
  })
  public analysisBenefitConcessionDate: Date | null;

  @Column({
    name: 'analysis_benefit_cessation_date',
    type: 'date',
    nullable: true,
    transformer: DateTransformer,
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
    () => InsuranceQualityAnalysisInssBenefitTypeormEntity,
    (entity) => entity.insuranceQualityAnalysis,
  )
  public insuranceQualityAnalysisInssBenefit:
    | InsuranceQualityAnalysisInssBenefitTypeormEntity[]
    | undefined;

  protected override readonly _type =
    InsuranceQualityAnalysisTypeormEntity.name;
}
