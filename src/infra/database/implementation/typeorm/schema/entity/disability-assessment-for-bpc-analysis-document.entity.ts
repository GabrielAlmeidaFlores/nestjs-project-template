import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityAssessmentForBpcAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-assessment-for-bpc-analysis.entity';
import { DisabilityAssessmentForBpcAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-document/enum/disability-assessment-for-bpc-analysis-document-type.enum';

@Entity({ name: 'disability_assessment_for_bpc_analysis_document' })
export class DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar' })
  public document: string;

  @Column({
    name: 'type',
    type: 'simple-enum',
    enum: DisabilityAssessmentForBpcAnalysisDocumentTypeEnum,
  })
  public type: DisabilityAssessmentForBpcAnalysisDocumentTypeEnum;

  @ManyToOne(() => DisabilityAssessmentForBpcAnalysisTypeormEntity)
  @JoinColumn({ name: 'disability_assessment_for_bpc_analysis_id' })
  public disabilityAssessmentForBpcAnalysis?:
    | DisabilityAssessmentForBpcAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    DisabilityAssessmentForBpcAnalysisDocumentTypeormEntity.name;
}
