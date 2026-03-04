import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialCategoryRetirementAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-category-retirement-analysis-result.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'special_category_retirement_analysis_result_rule_item' })
export class SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'retirement_modality_name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  public retirementModalityName: string;

  @Column({
    name: 'is_requirement_met',
    type: 'boolean',
    nullable: false,
  })
  public isRequirementMet: boolean;

  @Column({
    name: 'projected_retirement_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public projectedRetirementDate: Date | null;

  @Column({
    name: 'estimated_rmi_amount',
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: true,
  })
  public estimatedRmiAmount: number | null;

  @Column({
    name: 'is_best_financial_option',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  public isBestFinancialOption: boolean;

  @Column({
    name: 'rule_detailed_explanation_text',
    type: 'text',
    nullable: true,
  })
  public ruleDetailedExplanationText: string | null;

  @ManyToOne(
    () => SpecialCategoryRetirementAnalysisResultTypeormEntity,
    (entity) => entity.ruleItems,
  )
  @JoinColumn({ name: 'special_category_retirement_analysis_result_id' })
  public analysisResult?: SpecialCategoryRetirementAnalysisResultTypeormEntity | undefined;

  protected override readonly _type = SpecialCategoryRetirementAnalysisResultRuleItemTypeormEntity.name;
}
