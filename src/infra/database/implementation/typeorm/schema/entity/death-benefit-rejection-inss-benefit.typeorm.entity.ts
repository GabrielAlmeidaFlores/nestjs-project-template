import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection.typeorm.entity';

@Entity({ name: 'death_benefit_rejection_inss_benefit' })
export class DeathBenefitRejectionInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'inss_benefit', type: 'varchar', length: 255 })
  public inssBenefit: string;

  @ManyToOne(
    () => DeathBenefitRejectionTypeormEntity,
    (entity) => entity.deathBenefitRejectionInssBenefit,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_rejection_id' })
  public deathBenefitRejection?: DeathBenefitRejectionTypeormEntity | null;

  protected override readonly _type =
    DeathBenefitRejectionInssBenefitTypeormEntity.name;
}
