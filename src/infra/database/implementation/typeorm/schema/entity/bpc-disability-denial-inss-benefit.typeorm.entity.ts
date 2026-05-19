import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcDisabilityDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial.typeorm.entity';

@Entity({ name: 'bpc_disability_denial_inss_benefit' })
export class BpcDisabilityDenialInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit_number',
    type: 'varchar',
    length: 100,
  })
  public inssBenefitNumber: string;

  @ManyToOne(
    () => BpcDisabilityDenialTypeormEntity,
    (entity) => entity.bpcDisabilityDenialInssBenefit,
  )
  @JoinColumn({ name: 'bpc_disability_denial_id' })
  public bpcDisabilityDenial: BpcDisabilityDenialTypeormEntity | undefined;

  protected override readonly _type =
    BpcDisabilityDenialInssBenefitTypeormEntity.name;
}
