import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPlanningRppsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps.typeorm.entity';

@Entity({ name: 'retirement_planning_rpps_result' })
export class RetirementPlanningRppsResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'retirement_planning_rpps_complete_analysis',
    type: 'longtext',
    nullable: true,
  })
  public retirementPlanningRppsCompleteAnalysis: string | null;

  @Column({
    name: 'retirement_planning_rpps_simplified_analysis',
    type: 'longtext',
    nullable: true,
  })
  public retirementPlanningRppsSimplifiedAnalysis: string | null;

  @OneToOne(
    () => RetirementPlanningRppsTypeormEntity,
    (entity) => entity.retirementPlanningRppsResult,
    { nullable: false },
  )
  public retirementPlanningRpps?:
    | RetirementPlanningRppsTypeormEntity
    | undefined;

  protected override readonly _type =
    RetirementPlanningRppsResultTypeormEntity.name;
}
