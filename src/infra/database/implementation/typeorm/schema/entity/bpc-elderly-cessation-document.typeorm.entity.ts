import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcElderlyCessationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-cessation.typeorm.entity';
import { BpcElderlyCessationDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-document/enum/bpc-elderly-cessation-document-type.enum';

@Entity({ name: 'bpc_elderly_cessation_document' })
export class BpcElderlyCessationDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar' })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: BpcElderlyCessationDocumentTypeEnum,
  })
  public type: BpcElderlyCessationDocumentTypeEnum;

  @ManyToOne(() => BpcElderlyCessationTypeormEntity)
  @JoinColumn({ name: 'bpc_elderly_cessation_id' })
  public bpcElderlyCessation?: BpcElderlyCessationTypeormEntity | undefined;

  protected override readonly _type =
    BpcElderlyCessationDocumentTypeormEntity.name;
}
