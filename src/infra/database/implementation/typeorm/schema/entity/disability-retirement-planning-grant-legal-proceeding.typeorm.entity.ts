import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant.typeorm.entity';

@Entity({ name: 'disability_retirement_planning_grant_legal_proceeding' })
export class DisabilityRetirementPlanningGrantLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 100,
  })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => DisabilityRetirementPlanningGrantTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningGrantLegalProceeding,
    { nullable: true },
  )
  @JoinColumn({ name: 'disability_retirement_planning_grant_id' })
  public disabilityRetirementPlanningGrant?: DisabilityRetirementPlanningGrantTypeormEntity | null;

  protected override readonly _type =
    DisabilityRetirementPlanningGrantLegalProceedingTypeormEntity.name;
}
