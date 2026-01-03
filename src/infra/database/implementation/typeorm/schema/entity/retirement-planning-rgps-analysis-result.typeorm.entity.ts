import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';

@Entity({ name: 'retirement_planning_rgps_analysis_result' })
export class RetirementPlanningRgpsAnalysisResultTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'analysis_type', type: 'varchar', length: 64 })
  public analysisType: string;

  @Column({ name: 'response', type: 'longtext' })
  public response: string;

  @ManyToOne(
    () => RetirementPlanningRgpsTypeormEntity,
    (entity) => entity.retirementPlanningRgpsPeriod,
    { nullable: true },
  )
  @JoinColumn({ name: 'retirement_planning_rgps_id' })
  public retirementPlanningRgps?: RetirementPlanningRgpsTypeormEntity | null;

  protected override readonly _type =
    RetirementPlanningRgpsAnalysisResultTypeormEntity.name;
}
