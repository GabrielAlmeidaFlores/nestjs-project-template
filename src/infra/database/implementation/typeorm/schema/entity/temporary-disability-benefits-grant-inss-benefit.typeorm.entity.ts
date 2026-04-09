import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant.typeorm.entity';

@Entity({ name: 'temporary_disability_benefits_grant_inss_benefit' })
export class TemporaryDisabilityBenefitsGrantInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit',
    type: 'varchar',
    length: 100,
  })
  public inssBenefit: string;

  @ManyToOne(
    () => TemporaryDisabilityBenefitsGrantTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsGrantInssBenefit,
    { nullable: true },
  )
  @JoinColumn({ name: 'temporary_disability_benefits_grant_id' })
  public temporaryDisabilityBenefitsGrant?: TemporaryDisabilityBenefitsGrantTypeormEntity | null;

  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantInssBenefitTypeormEntity.name;
}
