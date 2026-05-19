import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AccidentAssistanceGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-grant/accident-assistance-grant.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { AccidentAssistanceGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-document/enum/accident-assistance-grant-document-type.enum';

@Entity({ name: 'accident_assistance_grant_document' })
export class AccidentAssistanceGrantDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'file_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public fileName: string | null;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: AccidentAssistanceGrantDocumentTypeEnum,
    nullable: true,
  })
  public type: AccidentAssistanceGrantDocumentTypeEnum | null;

  @ManyToOne(
    () => AccidentAssistanceGrantTypeormEntity,
    (entity) => entity.accidentAssistanceGrantDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'accident_assistance_grant_id' })
  public accidentAssistanceGrant?: AccidentAssistanceGrantTypeormEntity | null;

  protected override readonly _type =
    AccidentAssistanceGrantDocumentTypeormEntity.name;
}
