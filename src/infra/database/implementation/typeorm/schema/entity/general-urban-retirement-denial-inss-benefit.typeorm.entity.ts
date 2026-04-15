import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial.typeorm.entity';

@Entity({ name: 'general_urban_retirement_denial_inss_benefit' })
export class GeneralUrbanRetirementDenialInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit',
    type: 'varchar',
    length: 100,
  })
  public inssBenefit: string;

  @ManyToOne(
    () => GeneralUrbanRetirementDenialTypeormEntity,
    (entity) => entity.generalUrbanRetirementDenialInssBenefit,
    { nullable: true },
  )
  @JoinColumn({ name: 'general_urban_retirement_denial_id' })
  public generalUrbanRetirementDenial?: GeneralUrbanRetirementDenialTypeormEntity | null;

  protected override readonly _type =
    GeneralUrbanRetirementDenialInssBenefitTypeormEntity.name;
}
