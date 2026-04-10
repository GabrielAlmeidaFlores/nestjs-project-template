import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-deceased-benefit-dependents-document.typeorm.entity';
import { SurvivorPensionAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'spa_deceased_benefit_dependents' })
export class SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'dependent_full_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public dependentFullName: string | null;

  @Column({
    name: 'dependency_classification_level',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public dependencyClassificationLevel: string | null;

  @Column({ name: 'type', type: 'varchar', length: 255, nullable: true })
  public type: string | null;

  @Column({ name: 'gender', type: 'varchar', length: 50, nullable: true })
  public gender: string | null;

  @Column({
    name: 'date_of_birth',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public dateOfBirth: Date | null;

  @Column({
    name: 'has_disability_or_invalidity',
    type: 'boolean',
    nullable: true,
  })
  public hasDisabilityOrInvalidity: boolean | null;

  @Column({
    name: 'union_commencement_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public unionCommencementDate: Date | null;

  @ManyToOne(
    () => SurvivorPensionAnalysisTypeormEntity,
    (entity) => entity.deceasedBenefitDependents,
  )
  @JoinColumn({ name: 'survivor_pension_analysis_id' })
  public survivorPensionAnalysis?:
    | SurvivorPensionAnalysisTypeormEntity
    | undefined;

  @OneToMany(
    () => SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormEntity,
    (entity) => entity.deceasedBenefitDependents,
  )
  public documents?:
    | SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    SurvivorPensionAnalysisDeceasedBenefitDependentsTypeormEntity.name;
}
