import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-result-dependent-pension-analysis.typeorm.entity';
import { SurvivorPensionAnalysisResultRetirementRuleTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-result-retirement-rule.typeorm.entity';
import { SurvivorPensionAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis.typeorm.entity';

@Entity({ name: 'survivor_pension_analysis_result' })
export class SurvivorPensionAnalysisResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'is_insured_status_confirmed',
    type: 'boolean',
    nullable: true,
  })
  public isInsuredStatusConfirmed: boolean | null;

  @Column({ name: 'insured_status_summary', type: 'text', nullable: true })
  public insuredStatusSummary: string | null;

  @Column({
    name: 'is_retirement_right_confirmed',
    type: 'boolean',
    nullable: true,
  })
  public isRetirementRightConfirmed: boolean | null;

  @Column({ name: 'retirement_right_summary', type: 'text', nullable: true })
  public retirementRightSummary: string | null;

  @Column({ name: 'complete_analysis', type: 'text', nullable: true })
  public completeAnalysis: string | null;

  @Column({ name: 'simplified_analysis', type: 'text', nullable: true })
  public simplifiedAnalysis: string | null;

  @OneToOne(
    () => SurvivorPensionAnalysisTypeormEntity,
    (entity) => entity.result,
    { nullable: true },
  )
  @JoinColumn({ name: 'survivor_pension_analysis_id' })
  public survivorPensionAnalysis?:
    | SurvivorPensionAnalysisTypeormEntity
    | undefined;

  @OneToMany(
    () => SurvivorPensionAnalysisResultRetirementRuleTypeormEntity,
    (entity) => entity.survivorPensionAnalysisResult,
  )
  public retirementRules?:
    | SurvivorPensionAnalysisResultRetirementRuleTypeormEntity[]
    | undefined;

  @OneToMany(
    () => SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity,
    (entity) => entity.survivorPensionAnalysisResult,
  )
  public dependentPensionAnalyses?:
    | SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity[]
    | undefined;

  protected override readonly _type =
    SurvivorPensionAnalysisResultTypeormEntity.name;
}
