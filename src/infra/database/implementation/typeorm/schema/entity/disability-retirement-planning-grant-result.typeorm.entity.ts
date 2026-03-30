import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant.typeorm.entity';

@Entity({ name: 'disability_retirement_planning_grant_result' })
export class DisabilityRetirementPlanningGrantResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'complete_analysis',
    type: 'longtext',
    nullable: true,
  })
  public disabilityRetirementPlanningGrantCompleteAnalysis: string | null;

  @Column({
    name: 'simplified_analysis',
    type: 'longtext',
    nullable: true,
  })
  public disabilityRetirementPlanningGrantSimplifiedAnalysis: string | null;

  @Column({
    name: 'first_analysis',
    type: 'longtext',
    nullable: true,
  })
  public disabilityRetirementPlanningGrantFirstAnalysis: string | null;

  @Column({
    name: 'complete_analysis_download',
    type: 'longtext',
    nullable: true,
  })
  public disabilityRetirementPlanningGrantCompleteAnalysisDownload:
    | string
    | null;

  @OneToOne(
    () => DisabilityRetirementPlanningGrantTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningGrantResult,
  )
  public disabilityRetirementPlanningGrant?:
    | DisabilityRetirementPlanningGrantTypeormEntity
    | undefined;

  protected override readonly _type =
    DisabilityRetirementPlanningGrantResultTypeormEntity.name;
}
