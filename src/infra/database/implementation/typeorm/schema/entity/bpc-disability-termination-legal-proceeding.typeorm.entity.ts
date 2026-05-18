import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcDisabilityTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination.typeorm.entity';

@Entity({ name: 'bpc_disability_termination_legal_proceeding' })
export class BpcDisabilityTerminationLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 100,
  })
  public legalProceedingNumber: string;

  @ManyToOne(() => BpcDisabilityTerminationTypeormEntity)
  @JoinColumn({ name: 'bpc_disability_termination_id' })
  public bpcDisabilityTermination?:
    | BpcDisabilityTerminationTypeormEntity
    | undefined;

  protected override readonly _type =
    BpcDisabilityTerminationLegalProceedingTypeormEntity.name;
}
