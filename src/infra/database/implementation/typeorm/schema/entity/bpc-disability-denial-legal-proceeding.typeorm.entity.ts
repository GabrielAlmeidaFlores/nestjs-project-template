import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcDisabilityDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial.typeorm.entity';

@Entity({ name: 'bpc_disability_denial_legal_proceeding' })
export class BpcDisabilityDenialLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 100,
  })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => BpcDisabilityDenialTypeormEntity,
    (entity) => entity.bpcDisabilityDenialLegalProceeding,
  )
  @JoinColumn({ name: 'bpc_disability_denial_id' })
  public bpcDisabilityDenial: BpcDisabilityDenialTypeormEntity | undefined;

  protected override readonly _type =
    BpcDisabilityDenialLegalProceedingTypeormEntity.name;
}
