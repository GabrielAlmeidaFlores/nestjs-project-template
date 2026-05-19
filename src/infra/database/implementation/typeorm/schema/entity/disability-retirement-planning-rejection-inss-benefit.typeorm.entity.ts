import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection.typeorm.entity';

@Entity({ name: 'disability_retirement_planning_rejection_inss_benefit' })
export class DisabilityRetirementPlanningRejectionInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit',
    type: 'varchar',
    length: 100,
  })
  public inssBenefit: string;

  @ManyToOne(
    () => DisabilityRetirementPlanningRejectionTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningRejectionInssBenefit,
    { nullable: true },
  )
  @JoinColumn({ name: 'disability_retirement_planning_rejection_id' })
  public disabilityRetirementPlanningRejection?: DisabilityRetirementPlanningRejectionTypeormEntity | null;

  protected override readonly _type =
    DisabilityRetirementPlanningRejectionInssBenefitTypeormEntity.name;
}
