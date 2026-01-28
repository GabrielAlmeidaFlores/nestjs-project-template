import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityAssessmentForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis.entity';

@Entity({ name: 'disability_assessment_for_bpc_analysis_legal_proceeding' })
export class DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'legal_proceeding_number',
    type: 'varchar',
    length: 100,
  })
  public legalProceedingNumber: string;

  @ManyToOne(
    () => DisabilityAssessmentForBpcAnalysisTypeormEntity,
    (entity) => entity.disabilityAssessmentForBpcAnalysisLegalProceeding,
  )
  @JoinColumn({ name: 'disability_assessment_for_bpc_analysis_id' })
  public disabilityAssessmentForBpcAnalysis:
    | DisabilityAssessmentForBpcAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    DisabilityAssessmentForBpcAnalysisLegalProceedingTypeormEntity.name;
}
