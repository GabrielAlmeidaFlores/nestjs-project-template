import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPermanentDisabilityRevisionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision.typeorm.entity';

@Entity({ name: 'retirement_permanent_disability_revision_inss_benefit' })
export class RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'inss_benefit_number', type: 'varchar', length: 100 })
  public inssBenefitNumber: string;

  @ManyToOne(
    () => RetirementPermanentDisabilityRevisionTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRevisionInssBenefit,
  )
  @JoinColumn({ name: 'retirement_permanent_disability_revision_id' })
  public retirementPermanentDisabilityRevision:
    | RetirementPermanentDisabilityRevisionTypeormEntity
    | undefined;

  protected override readonly _type =
    RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity.name;
}
