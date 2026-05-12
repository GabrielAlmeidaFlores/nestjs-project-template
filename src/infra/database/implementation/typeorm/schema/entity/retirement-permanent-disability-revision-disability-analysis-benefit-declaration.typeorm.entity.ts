import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit.typeorm.entity';

@Entity({
  name: 'retirement_per_dis_rev_dis_analysis_benefit_decl',
})
export class RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'file_name', type: 'varchar', length: 500 })
  public fileName: string;

  @ManyToOne(
    () =>
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity,
    (entity) =>
      entity.retirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclaration,
  )
  @JoinColumn({
    name: 'retirement_per_dis_rev_dis_analysis_benefit_id',
  })
  public retirementPermanentDisabilityRevisionDisabilityAnalysisBenefit?:
    | RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity
    | undefined;

  protected override readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationTypeormEntity.name;
}
