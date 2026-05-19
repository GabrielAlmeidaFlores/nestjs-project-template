import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit-associated-cid.typeorm.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit-declaration.typeorm.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-disability-analysis.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({
  name: 'retirement_per_dis_rev_dis_analysis_benefit',
})
export class RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'has_previous_benefit', type: 'boolean' })
  public hasPreviousBenefit: boolean;

  @Column({
    name: 'benefit_number',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  public benefitNumber: string | null;

  @Column({
    name: 'benefit_start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public benefitStartDate: Date | null;

  @Column({
    name: 'benefit_end_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public benefitEndDate: Date | null;

  @ManyToOne(
    () => RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity,
    (entity) =>
      entity.retirementPermanentDisabilityRevisionDisabilityAnalysisBenefit,
  )
  @JoinColumn({
    name: 'retirement_permanent_disability_revision_disability_analysis_id',
  })
  public retirementPermanentDisabilityRevisionDisabilityAnalysis?:
    | RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity
    | undefined;

  @OneToMany(
    () =>
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidTypeormEntity,
    (entity) => entity.retirementPerDisRevDisAnalysisBenefit,
  )
  public retirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCid?:
    | RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidTypeormEntity[]
    | undefined;

  @OneToMany(
    () =>
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationTypeormEntity,
    (entity) => entity.retirementPerDisRevDisAnalysisBenefit,
  )
  public retirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclaration?:
    | RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitDeclarationTypeormEntity[]
    | undefined;

  protected override readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity.name;
}
