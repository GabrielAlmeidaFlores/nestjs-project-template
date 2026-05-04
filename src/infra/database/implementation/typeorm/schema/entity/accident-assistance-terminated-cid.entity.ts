import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AccidentAssistanceTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'accident_assistance_terminated_cid' })
export class AccidentAssistanceTerminatedCidTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'name', type: 'varchar', length: 20 })
  public name: string;

  @ManyToOne(
    () => AccidentAssistanceTerminatedTypeormEntity,
    (entity) => entity.accidentAssistanceTerminatedCid,
  )
  @JoinColumn({ name: 'accident_assistance_terminated_id' })
  public accidentAssistanceTerminated?:
    | AccidentAssistanceTerminatedTypeormEntity
    | undefined;

  protected override readonly _type =
    AccidentAssistanceTerminatedCidTypeormEntity.name;
}
