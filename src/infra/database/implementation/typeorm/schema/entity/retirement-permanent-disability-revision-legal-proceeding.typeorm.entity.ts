import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPermanentDisabilityRevisionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision.typeorm.entity';

@Entity({ name: 'retirement_permanent_disability_revision_legal_proceeding' })
export class RetirementPermanentDisabilityRevisionLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'legal_proceeding_number', type: 'varchar', length: 100 })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => RetirementPermanentDisabilityRevisionTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRevisionLegalProceeding,
  )
  @JoinColumn({ name: 'retirement_permanent_disability_revision_id' })
  public retirementPermanentDisabilityRevision:
    | RetirementPermanentDisabilityRevisionTypeormEntity
    | undefined;

  protected override readonly _type =
    RetirementPermanentDisabilityRevisionLegalProceedingTypeormEntity.name;
}
