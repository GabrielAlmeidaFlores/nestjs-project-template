import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcElderlyCessationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation.typeorm.entity';

@Entity({ name: 'bpc_elderly_cessation_legal_proceeding' })
export class BpcElderlyCessationLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 100,
  })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => BpcElderlyCessationTypeormEntity,
    (entity) => entity.bpcElderlyCessationLegalProceeding,
  )
  @JoinColumn({ name: 'bpc_elderly_cessation_id' })
  public bpcElderlyCessation: BpcElderlyCessationTypeormEntity | undefined;

  protected override readonly _type =
    BpcElderlyCessationLegalProceedingTypeormEntity.name;
}
