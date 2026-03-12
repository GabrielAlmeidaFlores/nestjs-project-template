import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-result-conversion-item.typeorm.entity';
import { SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-result-rule-item.typeorm.entity';
import { SpecialCategoryRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis.typeorm.entity';

@Entity({ name: 'special_category_retirement_analysis_result' })
export class SpecialCategoryRetirementAnalysisResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'simplified_analysis_summary_text',
    type: 'text',
    nullable: true,
  })
  public simplifiedAnalysisSummaryText: string | null;

  @Column({
    name: 'full_analysis_conclusion_text',
    type: 'text',
    nullable: true,
  })
  public fullAnalysisConclusionText: string | null;

  @Column({
    name: 'administrative_procedure_analysis',
    type: 'longtext',
    nullable: true,
  })
  public administrativeProcedureAnalysis: string | null;

  @OneToOne(
    () => SpecialCategoryRetirementAnalysisTypeormEntity,
    (entity) => entity.analysisResult,
  )
  @JoinColumn({ name: 'special_category_retirement_analysis_id' })
  public specialCategoryRetirementAnalysis?:
    | SpecialCategoryRetirementAnalysisTypeormEntity
    | undefined;

  @OneToMany(
    () => SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity,
    (entity) => entity.specialCategoryRetirementAnalysisResult,
  )
  public conversionItems?:
    | SpecialCategoryRetirementAnalysisResultConversionItemTypeormEntity[]
    | undefined;

  @OneToMany(
    () => SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity,
    (entity) => entity.specialCategoryRetirementAnalysisResult,
  )
  public ruleItems?:
    | SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity[]
    | undefined;

  protected override readonly _type =
    SpecialCategoryRetirementAnalysisResultTypeormEntity.name;
}
