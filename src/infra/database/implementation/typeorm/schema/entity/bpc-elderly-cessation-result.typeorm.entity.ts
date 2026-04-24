import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcElderlyCessationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation.typeorm.entity';

@Entity({ name: 'bpc_elderly_cessation_result' })
export class BpcElderlyCessationResultTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'inss_decision_analysis', type: 'text', nullable: true })
  public inssDecisionAnalysis: string | null;

  @Column({ name: 'first_analysis', type: 'longtext', nullable: true })
  public firstAnalysis: string | null;

  @Column({ name: 'complete_analysis', type: 'longtext', nullable: true })
  public completeAnalysis: string | null;

  @Column({
    name: 'complete_analysis_download',
    type: 'longtext',
    nullable: true,
  })
  public completeAnalysisDownload: string | null;

  @Column({ name: 'simplified_analysis', type: 'text', nullable: true })
  public simplifiedAnalysis: string | null;

  @Column({ name: 'applicable_rules', type: 'longtext', nullable: true })
  public applicableRules: string | null;

  @Column({ name: 'benefit_summaries', type: 'longtext', nullable: true })
  public benefitSummaries: string | null;

  @Column({ name: 'analysis_detailed_text', type: 'longtext', nullable: true })
  public analysisDetailedText: string | null;

  @Column({ name: 'diagnosis', type: 'text', nullable: true })
  public diagnosis: string | null;

  @Column({
    name: 'total_household_income',
    type: 'decimal',
    precision: 14,
    scale: 2,
    nullable: true,
  })
  public totalHouseholdIncome: number | null;

  @Column({
    name: 'per_capita_income',
    type: 'decimal',
    precision: 14,
    scale: 2,
    nullable: true,
  })
  public perCapitaIncome: number | null;

  @Column({ name: 'legal_requirements_met', type: 'text', nullable: true })
  public legalRequirementsMet: string | null;

  @Column({
    name: 'per_capita_income_below_quarter_minimum_wage',
    type: 'text',
    nullable: true,
  })
  public perCapitaIncomeBelowQuarterMinimumWage: string | null;

  @Column({ name: 'age_equal_or_above_65_years', type: 'text', nullable: true })
  public ageEqualOrAbove65Years: string | null;

  @OneToOne(() => BpcElderlyCessationTypeormEntity)
  @JoinColumn({ name: 'bpc_elderly_cessation_id' })
  public bpcElderlyCessation?: BpcElderlyCessationTypeormEntity | undefined;

  protected override readonly _type =
    BpcElderlyCessationResultTypeormEntity.name;
}
