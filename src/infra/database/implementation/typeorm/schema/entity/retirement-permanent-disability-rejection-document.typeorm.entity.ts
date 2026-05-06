import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPermanentDisabilityRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection.typeorm.entity';
import { RetirementPermanentDisabilityRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-document/enum/retirement-permanent-disability-rejection-document-type.enum';

@Entity({ name: 'retirement_permanent_disability_rejection_document' })
export class RetirementPermanentDisabilityRejectionDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 500 })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: RetirementPermanentDisabilityRejectionDocumentTypeEnum,
  })
  public type: RetirementPermanentDisabilityRejectionDocumentTypeEnum;

  @ManyToOne(
    () => RetirementPermanentDisabilityRejectionTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRejectionDocument,
  )
  public retirementPermanentDisabilityRejection?: RetirementPermanentDisabilityRejectionTypeormEntity;

  protected override readonly _type =
    RetirementPermanentDisabilityRejectionDocumentTypeormEntity.name;
}
