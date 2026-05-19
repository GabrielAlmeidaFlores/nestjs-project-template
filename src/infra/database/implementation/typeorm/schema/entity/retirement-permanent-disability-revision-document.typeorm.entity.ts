import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPermanentDisabilityRevisionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision.typeorm.entity';
import { RetirementPermanentDisabilityRevisionDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-document/enum/retirement-permanent-disability-revision-document-type.enum';

@Entity({ name: 'retirement_permanent_disability_revision_document' })
export class RetirementPermanentDisabilityRevisionDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar' })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: RetirementPermanentDisabilityRevisionDocumentTypeEnum,
  })
  public type: RetirementPermanentDisabilityRevisionDocumentTypeEnum;

  @ManyToOne(() => RetirementPermanentDisabilityRevisionTypeormEntity)
  @JoinColumn({ name: 'retirement_permanent_disability_revision_id' })
  public retirementPermanentDisabilityRevision?:
    | RetirementPermanentDisabilityRevisionTypeormEntity
    | undefined;

  protected override readonly _type =
    RetirementPermanentDisabilityRevisionDocumentTypeormEntity.name;
}
