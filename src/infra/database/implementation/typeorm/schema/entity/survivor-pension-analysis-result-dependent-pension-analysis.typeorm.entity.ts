import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SurvivorPensionAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-result.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'spa_result_dependent_pension_analysis' })
export class SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'dependent_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public dependentName: string | null;

  @Column({
    name: 'dependency_degree',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public dependencyDegree: string | null;

  @Column({
    name: 'is_dependency_verified',
    type: 'boolean',
    nullable: true,
  })
  public isDependencyVerified: boolean | null;

  @Column({
    name: 'pension_start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public pensionStartDate: Date | null;

  @Column({
    name: 'estimated_pension_duration',
    type: 'text',
    nullable: true,
  })
  public estimatedPensionDuration: string | null;

  @ManyToOne(
    () => SurvivorPensionAnalysisResultTypeormEntity,
    (entity) => entity.dependentPensionAnalyses,
  )
  @JoinColumn({ name: 'survivor_pension_analysis_result_id' })
  public survivorPensionAnalysisResult?:
    | SurvivorPensionAnalysisResultTypeormEntity
    | undefined;

  protected override readonly _type =
    SurvivorPensionAnalysisResultDependentPensionAnalysisTypeormEntity.name;
}
