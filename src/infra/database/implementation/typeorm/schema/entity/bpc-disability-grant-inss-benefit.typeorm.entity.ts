import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcDisabilityGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant.typeorm.entity';

@Entity({ name: 'bpc_disability_grant_inss_benefit' })
export class BpcDisabilityGrantInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit_number',
    type: 'varchar',
    length: 100,
  })
  public inssBenefitNumber: string;

  @ManyToOne(
    () => BpcDisabilityGrantTypeormEntity,
    (entity) => entity.BpcDisabilityGrantInssBenefit,
  )
  @JoinColumn({ name: '_bpc_disability_grant_id' })
  public BpcDisabilityGrant: BpcDisabilityGrantTypeormEntity | undefined;

  protected override readonly _type =
    BpcDisabilityGrantInssBenefitTypeormEntity.name;
}
