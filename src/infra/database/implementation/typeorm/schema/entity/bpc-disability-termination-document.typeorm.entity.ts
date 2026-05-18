import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { BpcDisabilityTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-termination.typeorm.entity';
import { BpcDisabilityTerminationDocumentTypeEnum } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-document/enum/bpc-disability-termination-document-type.enum';

@Entity({ name: 'bpc_disability_termination_document' })
export class BpcDisabilityTerminationDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar' })
  public document: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  public name: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: BpcDisabilityTerminationDocumentTypeEnum,
  })
  public type: BpcDisabilityTerminationDocumentTypeEnum;

  @ManyToOne(() => BpcDisabilityTerminationTypeormEntity)
  @JoinColumn({ name: 'bpc_disability_termination_id' })
  public bpcDisabilityTermination?:
    | BpcDisabilityTerminationTypeormEntity
    | undefined;

  protected override readonly _type =
    BpcDisabilityTerminationDocumentTypeormEntity.name;
}
