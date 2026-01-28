import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityAssessmentForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis.entity';

@Entity({ name: 'disability_assessment_for_bpc_analysis_benefit' })
export class DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit_number',
    type: 'varchar',
    length: 100,
  })
  public inssBenefitNumber: string;

  @ManyToOne(
    () => DisabilityAssessmentForBpcAnalysisTypeormEntity,
    (entity) => entity.disabilityAssessmentForBpcAnalysisBenefit,
  )
  @JoinColumn({ name: 'disability_assessment_for_bpc_analysis_id' })
  public disabilityAssessmentForBpcAnalysis:
    | DisabilityAssessmentForBpcAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    DisabilityAssessmentForBpcAnalysisBenefitTypeormEntity.name;
}
