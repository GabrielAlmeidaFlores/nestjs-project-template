import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AccidentAssistanceTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { AccidentAssistanceTerminatedDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-document/enum/accident-assistance-terminated-document-type.enum';

@Entity({ name: 'accident_assistance_terminated_document' })
export class AccidentAssistanceTerminatedDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar' })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: AccidentAssistanceTerminatedDocumentTypeEnum,
  })
  public type: AccidentAssistanceTerminatedDocumentTypeEnum;

  @ManyToOne(() => AccidentAssistanceTerminatedTypeormEntity)
  @JoinColumn({ name: 'accident_assistance_terminated_id' })
  public accidentAssistanceTerminated?:
    | AccidentAssistanceTerminatedTypeormEntity
    | undefined;

  protected override readonly _type =
    AccidentAssistanceTerminatedDocumentTypeormEntity.name;
}
