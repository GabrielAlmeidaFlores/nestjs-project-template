import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection.typeorm.entity';

@Entity({ name: 'disability_retirement_planning_rejection_result' })
export class DisabilityRetirementPlanningRejectionResultTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'inss_decision_analysis', type: 'longtext', nullable: true })
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

  @Column({ name: 'simplified_analysis', type: 'longtext', nullable: true })
  public simplifiedAnalysis: string | null;

  @OneToOne(
    () => DisabilityRetirementPlanningRejectionTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningRejectionResult,
  )
  public disabilityRetirementPlanningRejection?: DisabilityRetirementPlanningRejectionTypeormEntity;

  protected override readonly _type =
    DisabilityRetirementPlanningRejectionResultTypeormEntity.name;
}
