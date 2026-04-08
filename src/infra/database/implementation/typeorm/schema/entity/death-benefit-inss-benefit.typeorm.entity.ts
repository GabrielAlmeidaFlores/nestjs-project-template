import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit.typeorm.entity';

@Entity({ name: 'death_benefit_inss_benefit' })
export class DeathBenefitInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'inss_benefit', type: 'varchar', length: 255 })
  public inssBenefit: string;

  @ManyToOne(
    () => DeathBenefitTypeormEntity,
    (entity) => entity.deathBenefitInssBenefit,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_id' })
  public deathBenefit?: DeathBenefitTypeormEntity | null;

  protected override readonly _type = DeathBenefitInssBenefitTypeormEntity.name;
}
