import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPermanentDisabilityRejectionIncapacityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-incapacity.typeorm.entity';
import { RetirementPermanentDisabilityRejectionIncapacityDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-document/enum/retirement-permanent-disability-rejection-incapacity-document-type.enum';

@Entity({
  name: 'retirement_permanent_disability_rejection_incapacity_document',
})
export class RetirementPermanentDisabilityRejectionIncapacityDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 500 })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: RetirementPermanentDisabilityRejectionIncapacityDocumentTypeEnum,
  })
  public type: RetirementPermanentDisabilityRejectionIncapacityDocumentTypeEnum;

  @ManyToOne(
    () => RetirementPermanentDisabilityRejectionIncapacityTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRejectionIncapacityDocument,
  )
  public retirementPermanentDisabilityRejectionIncapacity?: RetirementPermanentDisabilityRejectionIncapacityTypeormEntity;

  protected override readonly _type =
    RetirementPermanentDisabilityRejectionIncapacityDocumentTypeormEntity.name;
}
