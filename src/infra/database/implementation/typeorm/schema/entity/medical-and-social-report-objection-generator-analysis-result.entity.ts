import { Column, Entity, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/medical-and-social-report-objection-generator-analysis.entity';

@Entity({
  name: 'medical_and_social_report_objection_generator_analysis_result',
})
export class MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'medical_and_social_report_objection_generator_complete_analysis',
    type: 'longtext',
    nullable: true,
  })
  public medicalAndSocialReportObjectionGeneratorCompleteAnalysis:
    | string
    | null;

  @Column({
    name: 'medical_and_social_report_objection_generator_simplified_analysis',
    type: 'text',
    nullable: true,
  })
  public medicalAndSocialReportObjectionGeneratorSimplifiedAnalysis:
    | string
    | null;

  @OneToOne(
    () => MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity,
    (entity) => entity.medicalAndSocialReportObjectionGeneratorAnalysisResult,
  )
  public medicalAndSocialReportObjectionGeneratorAnalysis?:
    | MedicalAndSocialReportObjectionGeneratorAnalysisTypeormEntity
    | undefined;

  protected override readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisResultTypeormEntity.name;
}
