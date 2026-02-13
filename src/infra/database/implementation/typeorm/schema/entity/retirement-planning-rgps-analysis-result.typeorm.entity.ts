import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';
import { AnalysisTypeEnum } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-analysis-result/enum/analysis-type.enum';

@Entity({ name: 'retirement_planning_rgps_analysis_result' })
export class RetirementPlanningRgpsAnalysisResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_type',
    type: 'simple-enum',
    enum: AnalysisTypeEnum,
    nullable: true,
  })
  public analysisType: AnalysisTypeEnum | null;

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
