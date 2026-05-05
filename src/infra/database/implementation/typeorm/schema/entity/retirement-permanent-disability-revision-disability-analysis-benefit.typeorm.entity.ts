import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

import { RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity } from './retirement-permanent-disability-revision-disability-analysis.typeorm.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidTypeormEntity } from './retirement-permanent-disability-revision-disability-analysis-benefit-associated-cid.typeorm.entity';

@Entity({
  name: 'retirement_permanent_disability_revision_disability_analysis_benefit',
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
    () =>
      RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity,
    (entity) =>
      entity.retirementPermanentDisabilityRevisionDisabilityAnalysisBenefit,
  )
  @JoinColumn({
    name: 'retirement_permanent_disability_revision_disability_analysis_id',
  })
  public retirementPermanentDisabilityRevisionDisabilityAnalysis?: RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity | undefined;

  @OneToMany(
    () =>
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidTypeormEntity,
    (entity) =>
      entity.retirementPermanentDisabilityRevisionDisabilityAnalysisBenefit,
  )
  public retirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCid?: RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitAssociatedCidTypeormEntity[] | undefined;

  protected override readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity.name;
}
