import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcElderlyCessationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation.typeorm.entity';

@Entity({ name: 'bpc_elderly_cessation_inss_benefit' })
export class BpcElderlyCessationInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit_number',
    type: 'varchar',
    length: 100,
  })
  public inssBenefitNumber: string;

  @ManyToOne(
    () => BpcElderlyCessationTypeormEntity,
    (entity) => entity.bpcElderlyCessationInssBenefit,
  )
  @JoinColumn({ name: 'bpc_elderly_cessation_id' })
  public bpcElderlyCessation: BpcElderlyCessationTypeormEntity | undefined;

  protected override readonly _type =
    BpcElderlyCessationInssBenefitTypeormEntity.name;
}
