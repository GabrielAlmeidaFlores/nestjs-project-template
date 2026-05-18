import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { ElderlyBpcRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection.typeorm.entity';
import { ElderlyBpcRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-document/enum/elderly-bpc-rejection-document-type.enum';

@Entity({ name: 'elderly_bpc_rejection_document' })
export class ElderlyBpcRejectionDocumentTypeormEntity extends BaseTypeormEntity {
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
    enum: ElderlyBpcRejectionDocumentTypeEnum,
    nullable: true,
  })
  public type: ElderlyBpcRejectionDocumentTypeEnum | null;

  @ManyToOne(
    () => ElderlyBpcRejectionTypeormEntity,
    (entity) => entity.elderlyBpcRejectionDocument,
  )
  @JoinColumn({ name: 'elderly_bpc_rejection_id' })
  public elderlyBpcRejection?: ElderlyBpcRejectionTypeormEntity | undefined;

  protected override readonly _type =
    ElderlyBpcRejectionDocumentTypeormEntity.name;
}
