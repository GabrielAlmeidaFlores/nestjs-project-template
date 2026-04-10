import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant.typeorm.entity';

@Entity({ name: 'death_benefit_inss_benefit' })
export class DeathBenefitGrantInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'inss_benefit', type: 'varchar', length: 255 })
  public inssBenefit: string;

  @ManyToOne(
    () => DeathBenefitGrantTypeormEntity,
    (entity) => entity.deathBenefitGrantInssBenefit,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_id' })
  public deathBenefitGrant?: DeathBenefitGrantTypeormEntity | null;

  protected override readonly _type =
    DeathBenefitGrantInssBenefitTypeormEntity.name;
}
