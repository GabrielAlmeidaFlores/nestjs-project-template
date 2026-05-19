import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcDisabilityGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant.typeorm.entity';

@Entity({ name: 'bpc_disability_grant_legal_proceeding' })
export class BpcDisabilityGrantLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 100,
  })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => BpcDisabilityGrantTypeormEntity,
    (entity) => entity.BpcDisabilityGrantLegalProceeding,
  )
  @JoinColumn({ name: '_bpc_disability_grant_id' })
  public BpcDisabilityGrant: BpcDisabilityGrantTypeormEntity | undefined;

  protected override readonly _type =
    BpcDisabilityGrantLegalProceedingTypeormEntity.name;
}
