import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcDisabilityGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant.typeorm.entity';
import { BpcDisabilityGrantDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-document/enum/bpc-disability-grant-document-type.enum';

@Entity({ name: 'bpc_disability_grant_document' })
export class BpcDisabilityGrantDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar' })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: BpcDisabilityGrantDocumentTypeEnum,
  })
  public type: BpcDisabilityGrantDocumentTypeEnum;

  @ManyToOne(() => BpcDisabilityGrantTypeormEntity)
  @JoinColumn({ name: '_bpc_disability_grant_id' })
  public BpcDisabilityGrant?: BpcDisabilityGrantTypeormEntity | undefined;

  protected override readonly _type =
    BpcDisabilityGrantDocumentTypeormEntity.name;
}
