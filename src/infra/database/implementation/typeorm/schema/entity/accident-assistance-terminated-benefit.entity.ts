import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { AccidentAssistanceTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated.entity';

@Entity({ name: 'accident_assistance_terminated_benefit' })
export class AccidentAssistanceTerminatedBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit_number',
    type: 'varchar',
    length: 100,
  })
  public inssBenefitNumber: string;

  @Column({
    name: 'dib',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public dib: Date | null;

  @Column({
    name: 'dcb',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public dcb: Date | null;

  @ManyToOne(
    () => AccidentAssistanceTerminatedTypeormEntity,
    (entity) => entity.accidentAssistanceTerminatedBenefit,
  )
  @JoinColumn({ name: 'accident_assistance_terminated_id' })
  public accidentAssistanceTerminated?:
    | AccidentAssistanceTerminatedTypeormEntity
    | undefined;

  protected override readonly _type =
    AccidentAssistanceTerminatedBenefitTypeormEntity.name;
}
