import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AccidentAssistanceTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'accident_assistance_terminated_legal_proceeding' })
export class AccidentAssistanceTerminatedLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 100,
  })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => AccidentAssistanceTerminatedTypeormEntity,
    (entity) => entity.accidentAssistanceTerminatedLegalProceeding,
  )
  @JoinColumn({ name: 'accident_assistance_terminated_id' })
  public accidentAssistanceTerminated?:
    | AccidentAssistanceTerminatedTypeormEntity
    | undefined;

  protected override readonly _type =
    AccidentAssistanceTerminatedLegalProceedingTypeormEntity.name;
}
