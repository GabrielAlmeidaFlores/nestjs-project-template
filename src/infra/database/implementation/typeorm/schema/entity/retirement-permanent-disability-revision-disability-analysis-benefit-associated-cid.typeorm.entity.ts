import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit.typeorm.entity';

@Entity({
  name: 'retirement_perm_dis_rev_dis_analysis_benefit_associated_cid',
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
    name: 'retirement_per_dis_rev_dis_analysis_benefit_id',
  })
  public retirementPerDisRevDisAnalysisBenefit?:
    | RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity
    | undefined;

  protected override readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidTypeormEntity.name;
}
