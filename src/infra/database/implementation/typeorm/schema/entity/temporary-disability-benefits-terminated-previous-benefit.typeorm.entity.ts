import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-disability-analysis.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-previous-benefit-document.typeorm.entity';

@Entity({ name: 'temporary_disability_benefits_terminated_previous_benefit' })
export class TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'benefit_number',
    type: 'varchar',
    length: 100,
  })
  public benefitNumber: string;

  @ManyToOne(
    () => TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsTerminatedPreviousBenefit,
    { nullable: true },
  )
  @JoinColumn({
    name: 'temporary_disability_benefits_terminated_disability_analysis_id',
  })
  public temporaryDisabilityBenefitsTerminatedDisabilityAnalysis?: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity | null;

  @OneToMany(
    () =>
      TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsTerminatedPreviousBenefit,
  )
  public temporaryDisabilityBenefitsTerminatedPreviousBenefitDocument?:
    | TemporaryDisabilityBenefitsTerminatedPreviousBenefitDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity.name;
}
