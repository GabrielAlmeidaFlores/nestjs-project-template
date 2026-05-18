import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPermanentDisabilityRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-period.typeorm.entity';

@Entity({ name: 'retirement_permanent_disability_rejection_period_document' })
export class RetirementPermanentDisabilityRejectionPeriodDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 500 })
  public document: string;

  @ManyToOne(
    () => RetirementPermanentDisabilityRejectionPeriodTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRejectionPeriodDocument,
    { nullable: true },
  )
  @JoinColumn({ name: 'retirement_permanent_disability_rejection_period_id' })
  public retirementPermanentDisabilityRejectionPeriod?: RetirementPermanentDisabilityRejectionPeriodTypeormEntity | null;

  protected override readonly _type =
    RetirementPermanentDisabilityRejectionPeriodDocumentTypeormEntity.name;
}
