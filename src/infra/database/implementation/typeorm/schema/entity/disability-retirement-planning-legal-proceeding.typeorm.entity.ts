import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning.typeorm.entity';

@Entity({ name: 'disability_retirement_planning_legal_proceeding' })
export class DisabilityRetirementPlanningLegalProceedingTypeormEntity extends BaseTypeormEntity {
  protected override readonly _type =
    DisabilityRetirementPlanningLegalProceedingTypeormEntity.name;

  @Column({ name: 'legal_proceeding_number', type: 'varchar', length: 100 })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => DisabilityRetirementPlanningTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningLegalProceeding,
  )
  @JoinColumn({ name: 'disability_retirement_planning_id' })
  public disabilityRetirementPlanning?: DisabilityRetirementPlanningTypeormEntity;
}
