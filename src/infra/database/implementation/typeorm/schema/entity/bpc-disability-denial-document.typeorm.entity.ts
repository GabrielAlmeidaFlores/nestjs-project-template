import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcDisabilityDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial.typeorm.entity';
import { BpcDisabilityDenialDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-document/enum/bpc-disability-denial-document-type.enum';

@Entity({ name: 'bpc_disability_denial_document' })
export class BpcDisabilityDenialDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar' })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: BpcDisabilityDenialDocumentTypeEnum,
  })
  public type: BpcDisabilityDenialDocumentTypeEnum;

  @ManyToOne(() => BpcDisabilityDenialTypeormEntity)
  @JoinColumn({ name: 'bpc_disability_denial_id' })
  public bpcDisabilityDenial?: BpcDisabilityDenialTypeormEntity | undefined;

  protected override readonly _type =
    BpcDisabilityDenialDocumentTypeormEntity.name;
}
