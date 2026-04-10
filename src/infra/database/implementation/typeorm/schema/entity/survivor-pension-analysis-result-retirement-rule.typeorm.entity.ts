import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SurvivorPensionAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-result.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'spa_result_retirement_rule' })
export class SurvivorPensionAnalysisResultRetirementRuleTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'rule_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public ruleName: string | null;

  @Column({
    name: 'is_requirement_met',
    type: 'boolean',
    nullable: true,
  })
  public isRequirementMet: boolean | null;

  @Column({
    name: 'entitlement_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public entitlementDate: Date | null;

  @Column({
    name: 'estimated_rmi',
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: true,
  })
  public estimatedRmi: string | null;

  @Column({
    name: 'is_best_rmi',
    type: 'boolean',
    nullable: true,
  })
  public isBestRmi: boolean | null;

  @Column({
    name: 'is_highest_claim_value',
    type: 'boolean',
    nullable: true,
  })
  public isHighestClaimValue: boolean | null;

  @Column({
    name: 'detailed_analysis',
    type: 'text',
    nullable: true,
  })
  public detailedAnalysis: string | null;

  @ManyToOne(
    () => SurvivorPensionAnalysisResultTypeormEntity,
    (entity) => entity.retirementRules,
  )
  @JoinColumn({ name: 'survivor_pension_analysis_result_id' })
  public survivorPensionAnalysisResult?:
    | SurvivorPensionAnalysisResultTypeormEntity
    | undefined;

  protected override readonly _type =
    SurvivorPensionAnalysisResultRetirementRuleTypeormEntity.name;
}
