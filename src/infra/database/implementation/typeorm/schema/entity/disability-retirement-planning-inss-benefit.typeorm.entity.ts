import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning.typeorm.entity';

@Entity({ name: 'disability_retirement_planning_inss_benefit' })
export class DisabilityRetirementPlanningInssBenefitTypeormEntity extends BaseTypeormEntity {
  protected override readonly _type =
    DisabilityRetirementPlanningInssBenefitTypeormEntity.name;

  @Column({ name: 'benefit_number', type: 'varchar', length: 100 })
  public benefitNumber: string;

  @ManyToOne(
    () => DisabilityRetirementPlanningTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningInssBenefit,
  )
  @JoinColumn({ name: 'disability_retirement_planning_id' })
  public disabilityRetirementPlanning?: DisabilityRetirementPlanningTypeormEntity;
}
