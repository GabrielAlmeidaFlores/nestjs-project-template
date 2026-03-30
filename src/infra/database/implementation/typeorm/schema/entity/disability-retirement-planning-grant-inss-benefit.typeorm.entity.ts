import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant.typeorm.entity';

@Entity({ name: 'disability_retirement_planning_grant_inss_benefit' })
export class DisabilityRetirementPlanningGrantInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit',
    type: 'varchar',
    length: 100,
  })
  public inssBenefit: string;

  @ManyToOne(
    () => DisabilityRetirementPlanningGrantTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningGrantInssBenefit,
    { nullable: true },
  )
  @JoinColumn({ name: 'disability_retirement_planning_grant_id' })
  public disabilityRetirementPlanningGrant?: DisabilityRetirementPlanningGrantTypeormEntity | null;

  protected override readonly _type =
    DisabilityRetirementPlanningGrantInssBenefitTypeormEntity.name;
}
