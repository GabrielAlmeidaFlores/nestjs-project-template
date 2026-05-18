import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { ElderlyBpcRejectionFamiliarGroupTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection-familiar-group.typeorm.entity';
import { ElderlyBpcRejectionFamiliarGroupDocumentTypeEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-familiar-group-document/enum/elderly-bpc-rejection-familiar-group-document-type.enum';

@Entity({ name: 'elderly_bpc_rejection_familiar_group_document' })
export class ElderlyBpcRejectionFamiliarGroupDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'document',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  public document: string | null;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: ElderlyBpcRejectionFamiliarGroupDocumentTypeEnum,
    nullable: true,
  })
  public type: ElderlyBpcRejectionFamiliarGroupDocumentTypeEnum | null;

  @ManyToOne(
    () => ElderlyBpcRejectionFamiliarGroupTypeormEntity,
    (entity) => entity.elderlyBpcRejectionFamiliarGroupDocument,
  )
  @JoinColumn({ name: 'elderly_bpc_rejection_familiar_group_id' })
  public elderlyBpcRejectionFamiliarGroup?:
    | ElderlyBpcRejectionFamiliarGroupTypeormEntity
    | undefined;

  protected override readonly _type =
    ElderlyBpcRejectionFamiliarGroupDocumentTypeormEntity.name;
}
