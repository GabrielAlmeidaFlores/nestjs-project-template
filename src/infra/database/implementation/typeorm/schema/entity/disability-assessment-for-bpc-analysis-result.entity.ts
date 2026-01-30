import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityAssessmentForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis.entity';

@Entity({ name: 'disability_assessment_for_bpc_analysis_result' })
export class DisabilityAssessmentForBpcAnalysisResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'disability_assessment_for_bpc_complete_analysis',
    type: 'longtext',
    nullable: true,
  })
  public disabilityAssessmentForBpcCompleteAnalysis: string | null;

  @Column({
    name: 'disability_assessment_for_bpc_simplified_analysis',
    type: 'text',
    nullable: true,
  })
  public disabilityAssessmentForBpcSimplifiedAnalysis: string | null;

  @OneToOne(
    () => DisabilityAssessmentForBpcAnalysisTypeormEntity,
    (entity) => entity.disabilityAssessmentForBpcAnalysisResult,
  )
  public disabilityAssessmentForBpcAnalysis?:
    | DisabilityAssessmentForBpcAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    DisabilityAssessmentForBpcAnalysisResultTypeormEntity.name;
}
