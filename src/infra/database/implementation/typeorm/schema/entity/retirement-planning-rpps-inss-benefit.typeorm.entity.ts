import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPlanningRppsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps.typeorm.entity';

@Entity({ name: 'retirement_planning_rpps_inss_benefit' })
export class RetirementPlanningRppsInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit_number',
    type: 'varchar',
    length: 100,
  })
  public inssBenefitNumber: string;

  @ManyToOne(
    () => RetirementPlanningRppsTypeormEntity,
    (entity) => entity.retirementPlanningRppsInssBenefit,
  )
  public retirementPlanningRpps:
    | RetirementPlanningRppsTypeormEntity
    | undefined;

  protected override readonly _type =
    RetirementPlanningRppsInssBenefitTypeormEntity.name;
}
