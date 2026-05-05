import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity } from './retirement-permanent-disability-revision-disability-analysis-benefit.typeorm.entity';

@Entity({
  name: 'retirement_permanent_disability_revision_disability_analysis_benefit_associated_cid',
})
export class RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'cid', type: 'varchar', length: 20 })
  public cid: string;

  @ManyToOne(
    () =>
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity,
    (entity) =>
      entity.retirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCid,
  )
  @JoinColumn({
    name: 'retirement_permanent_disability_revision_disability_analysis_benefit_id',
  })
  public retirementPermanentDisabilityRevisionDisabilityAnalysisBenefit?: RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity | undefined;

  protected override readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidTypeormEntity.name;
}
