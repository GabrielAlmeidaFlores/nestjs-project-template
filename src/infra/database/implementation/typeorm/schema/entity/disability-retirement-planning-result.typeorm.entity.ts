import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning.typeorm.entity';

@Entity({ name: 'disability_retirement_planning_result' })
export class DisabilityRetirementPlanningResultTypeormEntity extends BaseTypeormEntity {
  protected override readonly _type =
    DisabilityRetirementPlanningResultTypeormEntity.name;

  @Column({
    name: 'disability_retirement_planning_complete_analysis',
    type: 'longtext',
    nullable: true,
  })
  public disabilityRetirementPlanningCompleteAnalysis: string | null;

  @Column({
    name: 'disability_retirement_planning_simplified_analysis',
    type: 'longtext',
    nullable: true,
  })
  public disabilityRetirementPlanningSimplifiedAnalysis: string | null;

  @Column({
    name: 'disability_retirement_planning_complete_analysis_download',
    type: 'longtext',
    nullable: true,
  })
  public disabilityRetirementPlanningCompleteAnalysisDownload: string | null;

  @OneToOne(
    () => DisabilityRetirementPlanningTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningResult,
  )
  @JoinColumn({ name: 'disability_retirement_planning_id' })
  public disabilityRetirementPlanning?: DisabilityRetirementPlanningTypeormEntity;
}
