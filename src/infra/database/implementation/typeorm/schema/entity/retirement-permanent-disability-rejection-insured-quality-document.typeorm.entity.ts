import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-insured-quality.typeorm.entity';
import { RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality-document/enum/retirement-permanent-disability-rejection-insured-quality-document-type.enum';

@Entity({
  name: 'retirement_permanent_disability_rejection_insured_quality_doc',
})
export class RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 500 })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeEnum,
  })
  public type: RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeEnum;

  @ManyToOne(
    () => RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity,
    (entity) =>
      entity.retirementPermanentDisabilityRejectionInsuredQualityDocument,
  )
  @JoinColumn({
    name: 'retirement_permanent_disability_rejection_insured_quality_id',
  })
  public retirementPermanentDisabilityRejectionInsuredQuality?: RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity;

  protected override readonly _type =
    RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeormEntity.name;
}
