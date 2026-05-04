import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AccidentAssistanceTerminatedPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-period.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

@Entity({ name: 'accident_assistance_terminated_period_document' })
export class AccidentAssistanceTerminatedPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'document',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public document: string | null;

  @ManyToOne(
    () => AccidentAssistanceTerminatedPeriodTypeormEntity,
    (entity) => entity.accidentAssistanceTerminatedPeriodDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'accident_assistance_terminated_period_id' })
  public accidentAssistanceTerminatedPeriod?: AccidentAssistanceTerminatedPeriodTypeormEntity | null;

  protected override readonly _type =
    AccidentAssistanceTerminatedPeriodDocumentTypeormEntity.name;
}
